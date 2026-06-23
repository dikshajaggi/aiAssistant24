import { Bell, UserCheck, AlertTriangle, ChevronRight, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useVisits } from "../hooks/useQueries";
import { useDashboard } from "../hooks/useQueries";

// Industry benchmark for dental clinic show-up rate
const INDUSTRY_SHOWUP_PCT = 70;

const KpiTile = ({ label, value, sub, valueClass = "text-textdark" }) => (
  <div className="flex flex-col items-center text-center p-3 bg-white rounded-xl border border-gray-100 flex-1 min-w-0">
    <p className={`text-2xl font-bold leading-none ${valueClass}`}>{value}</p>
    <p className="text-xs font-medium text-gray-600 mt-1.5">{label}</p>
    {sub && <p className="text-[10px] text-gray-400 mt-0.5 leading-snug">{sub}</p>}
  </div>
);

const ReminderStatusCard = () => {
  const { data: visits = [], isLoading: visitsLoading } = useVisits();
  const { data: dashData, isLoading: dashLoading } = useDashboard();

  const isLoading = visitsLoading || dashLoading;

  const totalRevenue = dashData?.cards?.total_revenue ?? 0;

  const completed = visits.filter((v) => v.status?.toLowerCase() === "completed").length;
  const cancelled  = visits.filter((v) => v.status?.toLowerCase() === "cancelled").length;
  const upcoming   = visits.filter((v) => {
    const s = v.status?.toLowerCase() ?? "";
    return !["completed", "cancelled", "confirmed"].includes(s);
  }).length;

  const trackedVisits = completed + cancelled;
  const showUpRate  = trackedVisits > 0 ? Math.round((completed / trackedVisits) * 100) : null;
  const delta       = showUpRate !== null ? showUpRate - INDUSTRY_SHOWUP_PCT : null;

  const avgRevPerVisit = completed > 0 && totalRevenue > 0
    ? Math.round(totalRevenue / completed)
    : 0;
  const revenueAtRisk = upcoming * avgRevPerVisit;

  const fmtRev = (n) =>
    n >= 100000 ? `₹${(n / 100000).toFixed(1)}L`
    : n >= 1000  ? `₹${(n / 1000).toFixed(1)}k`
    : `₹${n}`;

  const showUpColor =
    showUpRate === null        ? "text-gray-400"
    : showUpRate >= 85         ? "text-green-600"
    : showUpRate >= INDUSTRY_SHOWUP_PCT ? "text-blue-600"
    : "text-red-500";

  const deltaLabel =
    delta === null ? "no data yet"
    : delta > 0    ? `+${delta}% vs industry avg`
    : delta === 0  ? "at industry avg"
    : `${delta}% vs industry avg`;

  if (isLoading) {
    return (
      <div className="w-full bg-[#fafafa] border border-gray-200 rounded-2xl p-5 shadow-sm animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-1" />
        <div className="h-3 bg-gray-100 rounded w-2/3 mb-5" />
        <div className="flex gap-3 mb-4">
          {[...Array(3)].map((_, i) => <div key={i} className="h-20 bg-gray-100 rounded-xl flex-1" />)}
        </div>
        <div className="h-14 bg-gray-100 rounded-xl" />
      </div>
    );
  }

  return (
    <div className="w-full bg-[#fafafa] border border-gray-200 rounded-2xl p-5 shadow-sm h-full flex flex-col">

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-textdark">Reminder Impact</h3>
          <p className="text-xs text-gray-400 mt-0.5">How reminders protect your clinic revenue</p>
        </div>
        <Link
          to="/dashboard/reminders"
          className="flex items-center gap-1 text-xs text-secondary1 hover:underline font-medium shrink-0 ml-3 mt-0.5"
        >
          <Bell size={12} />
          Reminders
        </Link>
      </div>

      {/* KPI tiles */}
      <div className="flex gap-2.5 mb-4">
        <KpiTile
          label="Show-up Rate"
          value={showUpRate !== null ? `${showUpRate}%` : "—"}
          sub={deltaLabel}
          valueClass={showUpColor}
        />
        <KpiTile
          label="Completed"
          value={completed}
          sub="visits attended"
          valueClass="text-green-600"
        />
        <KpiTile
          label="No-shows"
          value={cancelled}
          sub="cancelled"
          valueClass={cancelled > 0 ? "text-red-500" : "text-gray-400"}
        />
      </div>

      {/* Insight banner — revenue at risk when there are upcoming appointments */}
      {upcoming > 0 ? (
        <div className="bg-amber-50 border border-amber-100 rounded-xl p-3.5 mb-3">
          <div className="flex items-start gap-2.5">
            <AlertTriangle size={15} className="text-amber-500 mt-0.5 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-amber-800">
                {upcoming} upcoming {upcoming === 1 ? "appointment" : "appointments"} without a reminder
              </p>
              {revenueAtRisk > 0 ? (
                <p className="text-xs text-amber-600 mt-0.5">
                  Up to{" "}
                  <span className="font-bold">{fmtRev(revenueAtRisk)}</span> in revenue
                  is at risk from no-shows — send reminders to protect it.
                </p>
              ) : (
                <p className="text-xs text-amber-600 mt-0.5">
                  Send reminders to reduce no-shows and protect your schedule.
                </p>
              )}
            </div>
          </div>
        </div>
      ) : visits.length > 0 ? (
        <div className="bg-green-50 border border-green-100 rounded-xl p-3.5 mb-3">
          <div className="flex items-center gap-2.5">
            <UserCheck size={15} className="text-green-500 shrink-0" />
            <p className="text-sm text-green-700 font-medium">
              All appointments are covered — great job!
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 border border-gray-100 rounded-xl p-3.5 mb-3 text-center text-sm text-gray-400">
          Add appointments to start tracking reminder impact.
        </div>
      )}

      {/* Show-up rate vs benchmark context */}
      {showUpRate !== null && (
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={13} className={showUpRate >= INDUSTRY_SHOWUP_PCT ? "text-green-500" : "text-red-400"} />
          <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            {/* industry benchmark marker using a two-segment bar */}
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                showUpRate >= INDUSTRY_SHOWUP_PCT ? "bg-green-500" : "bg-red-400"
              }`}
              style={{ width: `${Math.min(showUpRate, 100)}%` }}
            />
          </div>
          <span className="text-[11px] text-gray-500 shrink-0">
            {showUpRate}% <span className="text-gray-300">/ {INDUSTRY_SHOWUP_PCT}% avg</span>
          </span>
        </div>
      )}

      {/* Spacer — pushes CTA to bottom when card is stretched */}
      <div className="flex-1" />

      {/* CTA */}
      {upcoming > 0 && (
        <Link to="/dashboard/reminders">
          <button className="w-full flex items-center justify-center gap-2 bg-textdark text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-textdark/90 transition-all cursor-pointer">
            <Bell size={14} />
            Remind {upcoming} {upcoming === 1 ? "Patient" : "Patients"} Now
            <ChevronRight size={14} />
          </button>
        </Link>
      )}
    </div>
  );
};

export default ReminderStatusCard;
