import React from "react";
import { UserPlus, CalendarPlus } from "lucide-react";
import { Link } from "react-router-dom";

const QuickActions = () => {
  const actions = [
    {
      title: "Add New Patient",
      icon: UserPlus,
      color: "bg-blue-100 text-blue-600",
      link: "/dashboard/patients"
    },
    {
      title: "Schedule Appointment",
      icon: CalendarPlus,
      color: "bg-orange-100 text-orange-600",
      link: "/dashboard/appointments"
    },
  ];

  return (
    <div className="flex items-start flex-col bg-neutral border border-gray-200 rounded-2xl p-5 shadow-sm w-full max-w-md">
      <h3 className="text-lg font-semibold text-textdark mb-4">
        Quick Actions
      </h3>

      <div className="space-y-3">
        {actions.map((action, idx) => {
          const Icon = action.icon;
          return (
            <div
              key={idx}
              className="flex items-center justify-between bg-textdark rounded-xl p-4 shadow-sm text-white"
            >
              {/* Icon + Title */}
              <div className="flex items-center gap-3">
                <span
                  className={`p-2 rounded-full flex items-center justify-center ${action.color}`}
                >
                  <Icon className="w-5 h-5" />
                </span>
                <p className="text-white font-medium">{action.title}</p>
              </div>

              {/* Add Button */}
              <Link to = {action.link}>
                <button className="cursor-pointer px-4 py-1.5 text-sm md:text-base font-medium text-white bg-secondary border border-secondary rounded-full hover:bg-bg-secondary/70 transition">
                  Add
                </button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;
