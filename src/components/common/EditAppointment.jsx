import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { DateTimePicker } from "@mui/x-date-pickers";
import moment from "moment";
import { editPatientVisitData } from "../../apis";
import { formatDateWithDay } from "@/utils/formatDateWithDay";
import { toast } from "react-toastify";

const inputCls =
  "w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary1";

const Field = ({ label, className = "", children }) => (
  <div className={className}>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    {children}
  </div>
);

const PAYMENT_STATUSES = ["pending", "paid", "unpaid"];

export default function EditAppointment({ isOpen, onClose, patient: appointment, onSave }) {
  const [form, setForm] = useState({
    treatment:      appointment?.treatment      || "",
    visit_date:     appointment?.visit_date
                      ? moment(appointment.visit_date)
                      : appointment?.time
                        ? moment(appointment.time)
                        : moment(),
    payment_status: appointment?.payment_status || "pending",
    amount:         appointment?.amount         ?? "",
    notes:          appointment?.notes          || "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await editPatientVisitData(appointment.id, {
        ...form,
        visit_date: form.visit_date ? form.visit_date.toISOString() : null,
        amount: form.amount !== "" ? Number(form.amount) : undefined,
      });
      toast.success("Appointment updated successfully");
      onSave();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "Failed to update appointment");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Edit Appointment</h2>
            <p className="text-sm text-gray-400 mt-0.5">{appointment?.name}</p>
          </div>
          <button
            onClick={onClose}
            disabled={loading}
            className="text-gray-400 hover:text-gray-600 transition cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">

          <Field label="Treatment">
            <input
              name="treatment"
              value={form.treatment}
              onChange={handleChange}
              placeholder="e.g. Root Canal, Cleaning"
              className={inputCls}
            />
          </Field>

          <Field label="Visit Date & Time">
            <DateTimePicker
              value={form.visit_date}
              onChange={(v) => setForm((prev) => ({ ...prev, visit_date: v }))}
              slotProps={{ textField: { size: "small", fullWidth: true } }}
            />
            {form.visit_date && (
              <p className="mt-1 text-xs text-gray-400">{formatDateWithDay(form.visit_date)}</p>
            )}
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Payment Status">
              <select
                name="payment_status"
                value={form.payment_status}
                onChange={handleChange}
                className={inputCls}
              >
                {PAYMENT_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Amount (₹)">
              <input
                type="number"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                min="0"
                placeholder="0"
                className={inputCls}
              />
            </Field>
          </div>

          <Field label="Notes (optional)">
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows={3}
              placeholder="Any additional notes…"
              className={`${inputCls} resize-none`}
            />
          </Field>
        </div>

        {/* Footer */}
        <div className="px-6 pb-5 pt-4 border-t border-gray-100 flex flex-col sm:flex-row justify-end gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition disabled:opacity-50 cursor-pointer"
          >
            {loading ? <><Loader2 size={14} className="animate-spin" /> Saving…</> : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
