import { useEffect, useState } from "react";
import { X, Loader2, Clock, IndianRupee, FileText, Stethoscope } from "lucide-react";
import { specificPatientVisitData } from "../../apis";
import moment from "moment";

const STATUS_STYLES = {
  paid:    "bg-green-100 text-green-700",
  unpaid:  "bg-red-100 text-red-700",
  pending: "bg-amber-100 text-amber-700",
};

const FAKE_VISITS = (name) => [
  {
    id: "f1",
    treatment: "Routine Dental Checkup",
    visit_date: moment().subtract(14, "months").toISOString(),
    payment_status: "paid",
    amount: 500,
    notes: "No cavities detected. Advised flossing regularly.",
  },
  {
    id: "f2",
    treatment: "Scaling & Polishing",
    visit_date: moment().subtract(10, "months").toISOString(),
    payment_status: "paid",
    amount: 1200,
    notes: "Mild tartar buildup. Follow-up in 6 months.",
  },
  {
    id: "f3",
    treatment: "Root Canal Treatment – Tooth #26",
    visit_date: moment().subtract(5, "months").toISOString(),
    payment_status: "paid",
    amount: 8500,
    notes: "RCT completed in single sitting. Crown recommended.",
  },
  {
    id: "f4",
    treatment: "Dental Crown Placement",
    visit_date: moment().subtract(4, "months").toISOString(),
    payment_status: "paid",
    amount: 6000,
    notes: "Porcelain crown placed on #26.",
  },
  {
    id: "f5",
    treatment: "Teeth Whitening",
    visit_date: moment().subtract(1, "months").toISOString(),
    payment_status: "pending",
    amount: 3500,
    notes: "",
  },
];

const PatientHistoryModal = ({ isOpen, onClose, patient }) => {
  const [visits, setVisits]   = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFake, setIsFake]   = useState(false);

  useEffect(() => {
    if (!isOpen || !patient?.id) return;

    setLoading(true);
    setIsFake(false);

    specificPatientVisitData(patient.id)
      .then((res) => {
        const data = res?.data;
        const list = Array.isArray(data)
          ? data
          : Array.isArray(data?.data)
          ? data.data
          : Array.isArray(data?.visits)
          ? data.visits
          : [];

        if (list.length === 0) {
          setVisits(FAKE_VISITS(patient.name));
          setIsFake(true);
        } else {
          setVisits(list);
        }
      })
      .catch(() => {
        setVisits(FAKE_VISITS(patient.name));
        setIsFake(true);
      })
      .finally(() => setLoading(false));
  }, [isOpen, patient?.id]);

  if (!isOpen) return null;

  const totalSpent = visits.reduce((s, v) => s + (Number(v.amount) || 0), 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl max-h-[90vh] flex flex-col">

        {/* Header */}
        <div className="flex items-start justify-between px-6 pt-5 pb-4 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary1/10 flex items-center justify-center shrink-0">
              <Stethoscope size={18} className="text-secondary1" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{patient?.name}</h2>
              <p className="text-sm text-gray-400">
                {patient?.phone && <span>{patient.phone}</span>}
                {patient?.phone && patient?.email && <span className="mx-1">·</span>}
                {patient?.email && <span>{patient.email}</span>}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition cursor-pointer mt-1"
          >
            <X size={18} />
          </button>
        </div>

        {/* Stats bar */}
        {!loading && visits.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 px-6 py-4 bg-gray-50 border-b border-gray-100 shrink-0">
            <Stat label="Total Visits" value={visits.length} />
            <Stat
              label="Total Spent"
              value={`₹${totalSpent.toLocaleString("en-IN")}`}
            />
            <Stat
              label="Last Visit"
              value={moment(
                visits[visits.length - 1]?.visit_date || visits[visits.length - 1]?.time
              ).format("D MMM YYYY")}
              className="hidden sm:block"
            />
          </div>
        )}

        {/* Demo data notice */}
        {isFake && (
          <div className="mx-6 mt-4 px-3 py-2 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-700 shrink-0">
            No visit records found — showing sample history for preview.
          </div>
        )}

        {/* Timeline */}
        <div className="overflow-y-auto flex-1 px-6 py-4">
          {loading ? (
            <div className="flex items-center justify-center py-16 text-gray-400 gap-2 text-sm">
              <Loader2 size={18} className="animate-spin" /> Loading history…
            </div>
          ) : visits.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-gray-400 gap-2">
              <FileText size={32} className="text-gray-300" />
              <p className="text-sm">No treatment history available</p>
            </div>
          ) : (
            <ol className="relative border-l-2 border-gray-200 ml-3 space-y-6">
              {[...visits]
                .sort((a, b) =>
                  moment(b.visit_date || b.time).diff(moment(a.visit_date || a.time))
                )
                .map((visit, idx) => {
                  const date = visit.visit_date || visit.time;
                  const statusKey = (visit.payment_status || "pending").toLowerCase();
                  return (
                    <li key={visit.id || idx} className="ml-5">
                      {/* Dot */}
                      <span className="absolute -left-[9px] flex h-4 w-4 items-center justify-center rounded-full bg-secondary1/20 border-2 border-secondary1" />

                      <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                        {/* Row 1: treatment + date */}
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-2">
                          <p className="font-semibold text-gray-800 text-sm leading-snug">
                            {visit.treatment || "—"}
                          </p>
                          <span className="flex items-center gap-1 text-xs text-gray-400 shrink-0 sm:ml-4">
                            <Clock size={11} />
                            {date ? moment(date).format("D MMM YYYY, h:mm A") : "—"}
                          </span>
                        </div>

                        {/* Row 2: payment status + amount */}
                        <div className="flex items-center gap-3 mt-1">
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${STATUS_STYLES[statusKey] || STATUS_STYLES.pending}`}>
                            {statusKey}
                          </span>
                          {visit.amount != null && Number(visit.amount) > 0 && (
                            <span className="flex items-center gap-1 text-xs text-gray-500">
                              <IndianRupee size={11} />
                              {Number(visit.amount).toLocaleString("en-IN")}
                            </span>
                          )}
                        </div>

                        {/* Row 3: notes */}
                        {visit.notes && (
                          <p className="mt-2 text-xs text-gray-500 leading-relaxed">
                            {visit.notes}
                          </p>
                        )}
                      </div>
                    </li>
                  );
                })}
            </ol>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const Stat = ({ label, value, className = "" }) => (
  <div className={className}>
    <p className="text-xs text-gray-400">{label}</p>
    <p className="text-base font-semibold text-gray-800 mt-0.5">{value}</p>
  </div>
);

export default PatientHistoryModal;
