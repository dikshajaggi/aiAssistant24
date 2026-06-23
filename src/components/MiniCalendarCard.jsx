import { useState } from "react";
import moment from "moment";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useVisits } from "../hooks/useQueries";

const DAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const MiniCalendarCard = () => {
  const [viewMonth, setViewMonth] = useState(() => moment());
  const { data: visits = [] } = useVisits();

  // Collect all dates that have at least one appointment
  const apptDates = new Set(
    visits
      .filter((v) => v.visit_date || v.time)
      .map((v) => moment(v.visit_date || v.time).format("YYYY-MM-DD"))
  );

  // Build a fixed 42-cell (6-week) calendar grid so the card height never shifts
  const calStart = viewMonth.clone().startOf("month").startOf("week");
  const days = Array.from({ length: 42 }, (_, i) => calStart.clone().add(i, "days"));

  const today = moment();

  return (
    <div className="bg-[#fafafa] border border-gray-200 rounded-2xl p-5 shadow-sm h-full flex flex-col">

      {/* Header */}
      <div className="flex items-center justify-between mb-3 shrink-0">
        <h3 className="text-base font-semibold text-textdark">Calendar</h3>
        <div className="flex items-center gap-0.5">
          <button
            onClick={() => setViewMonth((m) => m.clone().subtract(1, "month"))}
            className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 transition"
          >
            <ChevronLeft size={14} className="text-gray-500" />
          </button>
          <span className="text-xs font-semibold text-gray-600 w-20 text-center select-none">
            {viewMonth.format("MMM YYYY")}
          </span>
          <button
            onClick={() => setViewMonth((m) => m.clone().add(1, "month"))}
            className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 transition"
          >
            <ChevronRight size={14} className="text-gray-500" />
          </button>
        </div>
      </div>

      {/* Day-of-week headers */}
      <div className="grid grid-cols-7 shrink-0 mb-1">
        {DAY_LABELS.map((d) => (
          <div key={d} className="text-center text-[10px] font-medium text-gray-400 py-1 select-none">
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid — flex-1 so it fills remaining card height */}
      <div className="grid grid-cols-7 flex-1 content-start">
        {days.map((day, i) => {
          const isToday = day.isSame(today, "day");
          const inMonth = day.isSame(viewMonth, "month");
          const hasAppt = apptDates.has(day.format("YYYY-MM-DD"));

          return (
            <div key={i} className="flex flex-col items-center py-0.5">
              <div
                className={[
                  "w-7 h-7 flex items-center justify-center rounded-full text-xs select-none",
                  isToday ? "bg-secondary1 text-white font-bold" : "",
                  !isToday && inMonth ? "text-gray-700 hover:bg-gray-100 cursor-pointer transition" : "",
                  !inMonth ? "text-gray-300" : "",
                ].join(" ")}
              >
                {day.date()}
              </div>
              {/* Appointment dot */}
              {hasAppt && (
                <span
                  className={`w-1 h-1 rounded-full mt-0.5 ${isToday ? "bg-white" : "bg-secondary1"}`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <Link
        to="/dashboard/appointments"
        className="block mt-3 text-center text-xs text-secondary1 hover:underline font-medium pt-2 border-t border-gray-100 shrink-0"
      >
        View all appointments →
      </Link>
    </div>
  );
};

export default MiniCalendarCard;
