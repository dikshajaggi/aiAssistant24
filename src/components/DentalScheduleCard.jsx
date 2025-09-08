import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";

// helper to format date in dd-mm-yyyy
const formatKey = (d) => {
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
};

export default function DentalScheduleCard() {
  // auto-update to current week
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay()); // Sunday as start

  const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek);
  const [selectedDate, setSelectedDate] = useState(formatKey(today));

  // Dummy appointments (keys are dd-mm-yyyy now)
  const appointments = {
    "08-09-2025": [
      { type: "Root Canal", time: "10:30 AM", patient: "Riya Pathak" },
      { type: "Cleaning", time: "02:00 PM", patient: "Mohit Chauhan" },
    ],
    "09-09-2025": [
      { type: "Crown Fitting", time: "09:00 AM", patient: "Sarah Kaushik" },
    ],
    "10-09-2025": [
      { type: "Consultation", time: "11:15 AM", patient: "Rohit Rana" },
    ],
  };

  // calculate week days
  const weekDates = [...Array(7)].map((_, i) => {
    const date = new Date(currentWeekStart);
    date.setDate(date.getDate() + i);
    return date;
  });

  // get appointments for selected date
  const selectedAppointments = appointments[selectedDate] || [];

  // week navigation
  const goToPrevWeek = () => {
    const newStart = new Date(currentWeekStart);
    newStart.setDate(newStart.getDate() - 7);
    setCurrentWeekStart(newStart);
    setSelectedDate(formatKey(newStart));
  };

  const goToNextWeek = () => {
    const newStart = new Date(currentWeekStart);
    newStart.setDate(newStart.getDate() + 7);
    setCurrentWeekStart(newStart);
    setSelectedDate(formatKey(newStart));
  };

  return (
    <div className="w-full max-w-md border border-gray-200 rounded-2xl p-5 shadow-sm">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-gray-800 font-semibold text-lg">
          {formatKey(weekDates[0])} – {formatKey(weekDates[6])}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={goToPrevWeek}
            className="p-1 rounded-full bg-textdark hover:bg-textdark/70"
          >
            <ChevronLeft className="w-5 h-5 text-neutral" />
          </button>
          <button
            onClick={goToNextWeek}
            className="p-1 rounded-full bg-textdark hover:bg-textdark/70"
          >
            <ChevronRight className="w-5 h-5 text-neutral" />
          </button>
        </div>
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-2 text-center">
        {weekDates.map((d) => {
            const dateKey = formatKey(d);
            const todayKey = formatKey(new Date()); // today in dd-mm-yyyy format
            const isSelected = selectedDate === dateKey;
            const isToday = todayKey === dateKey;
            return (
                <div
                key={dateKey}
                className={`relative flex flex-col items-center justify-center py-2 rounded-lg cursor-pointer transition
                ${
                    isSelected
                    ? "bg-secondary text-white font-bold"
                    : isToday
                    ? "bg-success text-white font-bold"
                    : "text-textdark hover:bg-secondary/60"
                }`}
                onClick={() => setSelectedDate(dateKey)}
                >
                <span className="text-sm">
                    {d.toLocaleDateString("en-US", { weekday: "short" }).charAt(0)}
                </span>
                <span className="text-base">{d.getDate()}</span>

                {/* Small dot under today's date */}
                {isToday && !isSelected && (
                    <span className="absolute bottom-1 w-1.5 h-1.5 bg-secondary rounded-full"></span>
                )}
                </div>
            );
        })}
      </div>

      {/* Next Appointment Card */}
      <div className="mt-4 bg-textdark text-white rounded-2xl p-4">
        {selectedAppointments.length > 0 ? (
          <>
            <h3 className="text-lg font-semibold">Upcoming Appointments</h3>
            <ul className="mt-2 space-y-2">
              {selectedAppointments.map((appt, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between bg-secondary rounded-lg p-2"
                >
                  <div>
                    <p className="font-medium">{appt.type}</p>
                    <p className="text-sm text-white font-semibold">{appt.patient}</p>
                  </div>
                  <div className="flex items-center text-sm font-bold text-white">
                    <Clock className="w-4 h-4 mr-1" />
                    {appt.time}
                  </div>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="text-white font-bold">No appointments for this day</p>
        )}
      </div>
    </div>
  );
}
