import moment from "moment";
import { UserPlus, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Link } from "react-router-dom";
import { usePatients } from "../hooks/useQueries";

const NewPatientsCard = () => {
  const { data: patients = [], isLoading } = usePatients();
  const now = moment();

  const count = (targetMonth) =>
    patients.filter((p) => {
      const d = p.created_at || p.appointment_date;
      return d && moment(d).isSame(targetMonth, "month");
    }).length;

  const thisMonth = count(now);
  const lastMonth = count(now.clone().subtract(1, "month"));
  const delta = thisMonth - lastMonth;
  const pct   = lastMonth > 0 ? Math.round(Math.abs(delta / lastMonth) * 100) : null;

  const up   = delta > 0;
  const flat = delta === 0;

  const TrendIcon  = up ? TrendingUp : flat ? Minus : TrendingDown;
  const trendColor = up ? "text-green-600" : flat ? "text-gray-400" : "text-red-500";
  const trendBg    = up ? "bg-green-50"   : flat ? "bg-gray-50"   : "bg-red-50";
  const trendLabel = pct !== null
    ? `${up ? "+" : flat ? "" : "-"}${pct}% vs last month`
    : `${up ? "+" : ""}${delta} vs last month`;

  // Mini bar: show last 3 months
  const months = [-2, -1, 0].map((offset) => {
    const m = now.clone().add(offset, "month");
    return { label: m.format("MMM"), count: count(m) };
  });
  const maxCount = Math.max(...months.map((m) => m.count), 1);

  return (
    <div className="w-full bg-[#fafafa] border border-gray-200 rounded-2xl p-5 shadow-sm h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-textdark">New Patients</h3>
          <p className="text-xs text-gray-400 mt-0.5">{now.format("MMMM YYYY")}</p>
        </div>
        <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
          <UserPlus size={16} className="text-blue-500" />
        </div>
      </div>

      {isLoading ? (
        <div className="animate-pulse space-y-3">
          <div className="h-10 bg-gray-100 rounded-xl" />
          <div className="h-12 bg-gray-100 rounded-xl" />
        </div>
      ) : (
        <>
          {/* Main stat + trend */}
          <div className="flex items-end justify-between mb-4">
            <div>
              <p className="text-4xl font-bold text-textdark leading-none">{thisMonth}</p>
              <p className="text-xs text-gray-400 mt-1.5">patients this month</p>
            </div>
            {(thisMonth > 0 || lastMonth > 0) && (
              <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl ${trendBg}`}>
                <TrendIcon size={13} className={trendColor} />
                <span className={`text-xs font-semibold ${trendColor}`}>{trendLabel}</span>
              </div>
            )}
          </div>

          {/* 3-month mini bar chart */}
          <div className="flex items-end gap-2 h-12">
            {months.map((m) => (
              <div key={m.label} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex items-end justify-center" style={{ height: 32 }}>
                  <div
                    className={`w-full rounded-t-md transition-all duration-500 ${
                      m.label === now.format("MMM") ? "bg-secondary1" : "bg-gray-200"
                    }`}
                    style={{ height: `${Math.max((m.count / maxCount) * 32, m.count > 0 ? 4 : 0)}px` }}
                  />
                </div>
                <span className="text-[10px] text-gray-400">{m.label}</span>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="flex-1" />
      <Link
        to="/dashboard/patients"
        className="block mt-3 text-center text-xs text-secondary1 hover:underline font-medium pt-2 border-t border-gray-100"
      >
        View all patients →
      </Link>
    </div>
  );
};

export default NewPatientsCard;
