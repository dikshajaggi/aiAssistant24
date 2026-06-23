import { CreditCard, CheckCircle2 } from "lucide-react";
import { useVisits } from "../hooks/useQueries";

const fmt = (n) =>
  n >= 100000 ? `₹${(n / 100000).toFixed(1)}L`
  : n >= 1000  ? `₹${(n / 1000).toFixed(1)}k`
  : `₹${n.toLocaleString("en-IN")}`;

const PendingPaymentsCard = () => {
  const { data: visits = [], isLoading } = useVisits();

  const pending = visits
    .filter((v) => v.payment_status === "pending" || v.payment_status === "unpaid")
    .sort((a, b) => (b.amount || 0) - (a.amount || 0));

  const total = pending.reduce((sum, v) => sum + (v.amount || 0), 0);

  return (
    <div className="w-full bg-[#fafafa] border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col h-full min-h-[320px]">
      {/* Header */}
      <div className="flex items-start justify-between mb-4 shrink-0">
        <div>
          <h3 className="text-lg font-semibold text-textdark">Pending Payments</h3>
          <p className="text-xs text-gray-400 mt-0.5">Outstanding from patients</p>
        </div>
        {pending.length > 0 && (
          <div className="text-right shrink-0 ml-2">
            <p className="text-xl font-bold text-amber-600 leading-none">{fmt(total)}</p>
            <p className="text-[10px] text-gray-400 mt-0.5">total due</p>
          </div>
        )}
      </div>

      {/* Body */}
      {isLoading ? (
        <div className="flex-1 space-y-2.5 animate-pulse">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-14 bg-gray-100 rounded-xl" />
          ))}
        </div>
      ) : pending.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-2 text-gray-400">
          <CheckCircle2 size={30} className="text-green-400" />
          <p className="text-sm font-medium text-green-600">All payments are cleared!</p>
          <p className="text-xs text-gray-400">No outstanding dues.</p>
        </div>
      ) : (
        <>
          {/* Scrollable list fills available height */}
          <div className="flex-1 min-h-0 overflow-y-auto space-y-2 pr-0.5">
            {pending.map((v, i) => (
              <div
                key={v.id ?? i}
                className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl px-3 py-2.5"
              >
                <img
                  src={v.image || "https://via.placeholder.com/32"}
                  alt={v.name}
                  className="w-8 h-8 rounded-full object-cover shrink-0 border border-gray-200"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{v.name}</p>
                  <p className="text-xs text-gray-400 truncate">{v.treatment || "—"}</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-sm font-bold text-amber-600">
                    {v.amount ? fmt(v.amount) : "—"}
                  </p>
                  <p className="text-[10px] text-gray-400 capitalize">{v.payment_status}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-gray-400 mt-3 text-center pt-2 border-t border-gray-100 shrink-0">
            {pending.length} unpaid {pending.length === 1 ? "appointment" : "appointments"}
          </p>
        </>
      )}
    </div>
  );
};

export default PendingPaymentsCard;
