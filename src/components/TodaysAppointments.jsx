import moment from "moment";
import { CalendarPlus, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useVisits } from "../hooks/useQueries";

const statusStyle = (status) => {
  const s = status?.toLowerCase() ?? "";
  return (
    { completed: "bg-green-100 text-green-700",
      confirmed: "bg-sky-100 text-sky-700",
      scheduled: "bg-blue-100 text-blue-700",
      pending:   "bg-yellow-100 text-yellow-700",
      cancelled: "bg-red-100 text-red-700",
    }[s] ?? "bg-gray-100 text-gray-600"
  );
};

const TodaysAppointments = () => {
  const { data: visits = [], isLoading } = useVisits();

  const today = visits
    .filter((v) => {
      const d = v.visit_date || v.time;
      return d && moment(d).isSame(moment(), "day");
    })
    .sort((a, b) =>
      moment(a.visit_date || a.time).diff(moment(b.visit_date || b.time))
    );

  return (
    <div className="w-full bg-[#fafafa] border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col h-full min-h-[320px]">
      {/* Header */}
      <div className="flex items-start justify-between mb-4 shrink-0">
        <div>
          <h3 className="text-lg font-semibold text-textdark">Today's Appointments</h3>
          <p className="text-xs text-gray-400 mt-0.5">{moment().format("dddd, D MMMM YYYY")}</p>
        </div>
        <Link
          to="/dashboard/appointments"
          className="text-xs text-secondary1 hover:underline font-medium shrink-0 ml-2 mt-0.5"
        >
          View all →
        </Link>
      </div>

      {/* Body — flex-1 so it fills remaining card height */}
      {isLoading ? (
        <div className="flex-1 space-y-2.5 animate-pulse">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-14 bg-gray-100 rounded-xl" />
          ))}
        </div>
      ) : today.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-2 text-gray-400">
          <CalendarPlus size={30} className="text-gray-300" />
          <p className="text-sm">No appointments scheduled today</p>
          <Link to="/dashboard/appointments" className="text-secondary1 hover:underline text-xs font-medium">
            Schedule one →
          </Link>
        </div>
      ) : (
        <>
          {/* Scrollable list fills all available space */}
          <div className="flex-1 min-h-0 overflow-y-auto space-y-2 pr-0.5">
            {today.map((v, i) => (
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
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full capitalize ${statusStyle(v.status)}`}>
                    {v.status ?? "—"}
                  </span>
                  <span className="text-[10px] text-gray-400 flex items-center gap-0.5">
                    <Clock size={9} />
                    {moment(v.visit_date || v.time).format("h:mm A")}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-gray-400 mt-3 text-center pt-2 border-t border-gray-100 shrink-0">
            {today.length} appointment{today.length !== 1 ? "s" : ""} today
          </p>
        </>
      )}
    </div>
  );
};

export default TodaysAppointments;
