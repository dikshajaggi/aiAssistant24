import moment from "moment";
import { Clock, CalendarPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { useVisits } from "../hooks/useQueries";

const WORK_START = 9;   // 9 AM
const WORK_END   = 18;  // 6 PM
const SLOT_MINS  = 30;

const getNextSlot = (targetDay, visits) => {
  const now = moment();

  const dayVisits = visits.filter((v) => {
    const d = v.visit_date || v.time;
    return d && moment(d).isSame(targetDay, "day");
  });

  for (let h = WORK_START; h < WORK_END; h++) {
    for (const m of [0, 30]) {
      const slot = targetDay.clone().hour(h).minute(m).second(0).millisecond(0);

      // For today: skip slots that have already passed
      if (targetDay.isSame(now, "day") && slot.isSameOrBefore(now)) continue;

      // Check if any visit occupies this 30-min window
      const booked = dayVisits.some((v) => {
        const vt = moment(v.visit_date || v.time);
        return vt.isSameOrAfter(slot) && vt.isBefore(slot.clone().add(SLOT_MINS, "minutes"));
      });

      if (!booked) return slot;
    }
  }
  return null; // fully booked or past working hours
};

const SlotRow = ({ label, date, slot }) => (
  <div className="flex flex-col gap-1.5">
    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</p>
    <div className={`flex items-center gap-3 rounded-xl px-4 py-3 border ${slot ? "bg-white border-gray-100" : "bg-gray-50 border-gray-100"}`}>
      <div className={`p-2 rounded-lg shrink-0 ${slot ? "bg-sky-50 text-secondary1" : "bg-gray-100 text-gray-400"}`}>
        <Clock size={15} />
      </div>
      <div>
        <p className={`text-sm font-bold leading-none ${slot ? "text-textdark" : "text-gray-400"}`}>
          {slot ? slot.format("h:mm A") : "Fully booked"}
        </p>
        <p className="text-[10px] text-gray-400 mt-0.5">{date.format("ddd, D MMM")}</p>
      </div>
    </div>
  </div>
);

const NextAvailableSlotCard = () => {
  const { data: visits = [], isLoading } = useVisits();

  const today    = moment();
  const tomorrow = moment().add(1, "day");

  const todaySlot    = isLoading ? null : getNextSlot(today, visits);
  const tomorrowSlot = isLoading ? null : getNextSlot(tomorrow, visits);

  return (
    <div className="bg-[#fafafa] border border-gray-200 rounded-2xl p-5 shadow-sm h-full flex flex-col">

      {/* Header */}
      <div className="mb-4 shrink-0">
        <h3 className="text-base font-semibold text-textdark">Next Available Slot</h3>
        <p className="text-xs text-gray-400 mt-0.5">9 AM – 6 PM · 30-min slots</p>
      </div>

      {/* Slots */}
      {isLoading ? (
        <div className="flex flex-col gap-3 animate-pulse">
          <div className="h-3 bg-gray-100 rounded w-12" />
          <div className="h-14 bg-gray-100 rounded-xl" />
          <div className="h-3 bg-gray-100 rounded w-16" />
          <div className="h-14 bg-gray-100 rounded-xl" />
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <SlotRow label="Today"    date={today}    slot={todaySlot}    />
          <SlotRow label="Tomorrow" date={tomorrow} slot={tomorrowSlot} />
        </div>
      )}

      {/* Spacer pushes CTA to bottom */}
      <div className="flex-1" />

      <Link to="/dashboard/appointments">
        <button className="w-full mt-4 flex items-center justify-center gap-2 bg-textdark text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-textdark/90 transition cursor-pointer shrink-0">
          <CalendarPlus size={14} />
          Schedule Appointment
        </button>
      </Link>
    </div>
  );
};

export default NextAvailableSlotCard;
