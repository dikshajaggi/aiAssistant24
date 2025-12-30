import React from "react";
import { UserPlus, CalendarPlus, ClipboardClock } from "lucide-react";
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
    <div className=" bg-[#fafafa] border border-gray-200 rounded-2xl p-4 shadow-sm w-full max-w-md h-[320px]">
      <h3 className="text-lg md:text-xl font-semibold text-textdark mb-4">
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
                <button className="cursor-pointer px-4 py-1 text-sm md:text-base font-medium text-white bg-secondary1 border border-secondary1 rounded-lg hover:bg-bg-secondary1/70 transition">
                  Add
                </button>
              </Link>
            </div>
          );
        })}
         <div className="flex items-center justify-between bg-textdark rounded-xl p-4 shadow-sm text-white">
              {/* Icon + Title */}
              <div className="flex items-center gap-3">
                <span
                  className={`p-2 rounded-full flex items-center justify-center bg-green-100 text-green-600`}
                >
                <ClipboardClock className="w-5 h-5" />
                </span>
                <p className="text-white font-medium ">Send Appointment Reminders</p>
              </div>

              {/* Add Button */}
              <Link to = "">
                <button className="cursor-pointer px-4 py-1 text-sm md:text-base font-medium text-white bg-secondary1 border border-secondary1 rounded-lg hover:bg-bg-secondary1/70 transition">
                  Send
                </button>
              </Link>
            </div>
      </div>
    </div>
  );
};

export default QuickActions;
