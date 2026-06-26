import React from "react";
import { UserPlus, CalendarPlus, ClipboardClock, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const actions = [
  {
    title: "Add New Patient",
    icon: UserPlus,
    color: "bg-blue-100 text-blue-600",
    link: "/dashboard/patients",
    state: { openModal: true },
  },
  {
    title: "Schedule Appointment",
    icon: CalendarPlus,
    color: "bg-orange-100 text-orange-600",
    link: "/dashboard/appointments",
    state: { openModal: true },
  },
  {
    title: "Send Reminders",
    icon: ClipboardClock,
    color: "bg-green-100 text-green-600",
    link: "/dashboard/reminders",
  },
];

const QuickActions = () => (
  <div className="bg-[#fafafa] border border-gray-200 rounded-2xl p-5 shadow-sm h-full flex flex-col">
    <h3 className="text-base font-semibold text-textdark mb-4 shrink-0">Quick Actions</h3>
    <div className="flex flex-col gap-3">
      {actions.map((action, idx) => {
        const Icon = action.icon;
        return (
          <Link to={action.link} state={action.state} key={idx}>
            <div className="flex items-center gap-3 bg-textdark rounded-xl px-4 py-3 hover:bg-textdark/90 transition cursor-pointer">
              <span className={`p-1.5 rounded-lg shrink-0 ${action.color}`}>
                <Icon className="w-4 h-4" />
              </span>
              <p className="text-white font-medium text-sm flex-1">{action.title}</p>
              <ChevronRight size={14} className="text-white/40 shrink-0" />
            </div>
          </Link>
        );
      })}
    </div>
  </div>
);

export default QuickActions;
