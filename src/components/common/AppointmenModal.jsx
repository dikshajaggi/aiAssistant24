import { X, AlertTriangle } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import moment from "moment";
import { addVisit, getAllPatients } from "../../apis";
import { toast } from "react-toastify";
import { DateTimePicker } from "@mui/x-date-pickers";
import { formatDateWithDay } from "@/utils/formatDateWithDay";
import { useVisits } from "../../hooks/useQueries";

const PAYMENT_STATUSES = ["pending", "paid", "unpaid"];

const INITIAL_FORM = {
  patient_id: "",
  treatment: "",
  visit_date: null,
  payment_status: "pending",
  amount: "",
  notes: "",
};

const CONFLICT_WINDOW_MINS = 30;

const AppointmentModal = ({ isOpen, onClose, onSuccess, saveLabel, headingLabel, caption }) => {
  const { data: visits = [] } = useVisits();
  const [patients, setPatients] = useState([]);
  const [patientsLoading, setPatientsLoading] = useState(false);
  const [form, setForm] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);

  // Find any existing visit within CONFLICT_WINDOW_MINS of the selected time
  const conflict = useMemo(() => {
    if (!form.visit_date) return null;
    const selected = moment(form.visit_date);
    return visits.find((v) => {
      const t = v.visit_date || v.time;
      if (!t) return false;
      return Math.abs(moment(t).diff(selected, "minutes")) < CONFLICT_WINDOW_MINS;
    }) ?? null;
  }, [form.visit_date, visits]);

  useEffect(() => {
    if (!isOpen) return;
    setForm({ ...INITIAL_FORM, visit_date: moment() });
    const fetchPatients = async () => {
      setPatientsLoading(true);
      try {
        const res = await getAllPatients();
        setPatients(res.data || []);
      } catch {
        toast.error("Failed to load patient list");
      } finally {
        setPatientsLoading(false);
      }
    };
    fetchPatients();
  }, [isOpen]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e?.preventDefault();

    if (form.visit_date && moment(form.visit_date).isBefore(moment())) {
      toast.error("Appointment date must be in the future.");
      return;
    }

    if (conflict) {
      const conflictTime = moment(conflict.visit_date || conflict.time).format("h:mm A, D MMM");
      const ok = window.confirm(
        `${conflict.name || "Another patient"} already has an appointment at ${conflictTime} (within ${CONFLICT_WINDOW_MINS} minutes).\n\nSchedule anyway?`
      );
      if (!ok) return;
    }

    setLoading(true);
    try {
      await addVisit({
        patient_id: form.patient_id,
        treatment: form.treatment,
        visit_date: form.visit_date ? form.visit_date.toISOString() : null,
        payment_status: form.payment_status,
        amount: Number(form.amount),
        ...(form.notes && { notes: form.notes }),
      });
      toast.success("Appointment scheduled successfully");
      onSuccess?.();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to schedule appointment");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-999 p-4">
      <div className="bg-white/90 border border-gray-200 shadow-xl rounded-2xl w-full max-w-lg p-6 relative overflow-y-auto max-h-[90vh] transition-all">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition cursor-pointer"
        >
          <X size={18} />
        </button>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">{headingLabel}</h2>
          <p className="text-gray-500 text-sm mt-1">{caption}</p>
        </div>

        <form id="schedule-appointment-form" className="space-y-5" onSubmit={handleSubmit}>
          {/* Patient + Treatment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium">Patient</label>
              <select
                name="patient_id"
                value={form.patient_id}
                onChange={handleChange}
                required
                disabled={patientsLoading}
                className="w-full mt-2 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-secondary1 focus:outline-none disabled:bg-gray-50 disabled:text-gray-400"
              >
                <option value="">
                  {patientsLoading ? "Loading…" : "Select patient"}
                </option>
                {patients.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}{p.phone ? ` · ${p.phone}` : ""}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Treatment</label>
              <input
                type="text"
                name="treatment"
                value={form.treatment}
                onChange={handleChange}
                required
                placeholder="e.g. Root Canal, Cleaning"
                className="w-full mt-2 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-secondary1 focus:outline-none"
              />
            </div>
          </div>

          {/* Visit Date */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Visit Date</label>
            <DateTimePicker
              label="Select date & time"
              value={form.visit_date}
              onChange={(v) => setForm((prev) => ({ ...prev, visit_date: v }))}
              disablePast
              slotProps={{ textField: { fullWidth: true } }}
            />
            {form.visit_date && moment(form.visit_date).isBefore(moment()) && (
              <p className="mt-1.5 text-xs text-red-500">
                Appointment date must be in the future.
              </p>
            )}
            {form.visit_date && moment(form.visit_date).isSameOrAfter(moment()) && (
              <p className="mt-2 text-sm text-gray-500">
                {formatDateWithDay(form.visit_date)}
              </p>
            )}
            {conflict && (
              <div className="flex items-start gap-2 mt-3 px-3 py-2.5 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-700">
                <AlertTriangle size={15} className="shrink-0 mt-0.5" />
                <span>
                  <strong>{conflict.name}</strong> has an appointment at{" "}
                  {moment(conflict.visit_date || conflict.time).format("h:mm A, D MMM")}.
                  This slot may cause a double-booking.
                </span>
              </div>
            )}
          </div>

          {/* Payment Status + Amount */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium">Payment Status</label>
              <select
                name="payment_status"
                value={form.payment_status}
                onChange={handleChange}
                required
                className="w-full mt-2 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-secondary1 focus:outline-none capitalize"
              >
                {PAYMENT_STATUSES.map((s) => (
                  <option key={s} value={s} className="capitalize">
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Amount (₹)</label>
              <input
                type="number"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                required
                min="0"
                placeholder="0"
                className="w-full mt-2 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-secondary1 focus:outline-none"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-gray-700 font-medium">Notes (optional)</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Any additional notes…"
              rows={3}
              className="w-full mt-2 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-secondary1 focus:outline-none"
            />
          </div>
        </form>

        <div className="mt-8 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="flex items-center gap-2 border border-gray-400 text-gray-700 px-3 py-2 rounded-lg text-sm hover:bg-gray-50 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="schedule-appointment-form"
            disabled={loading || !form.patient_id}
            className="bg-blue-600 text-white text-sm px-5 py-2 rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Scheduling…" : saveLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentModal;
