import React from "react";
import { UserPlus, CalendarPlus } from "lucide-react";

const QuickActions = () => {
  const actions = [
    {
      title: "Add New Patient",
      icon: UserPlus,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Schedule Appointment",
      icon: CalendarPlus,
      color: "bg-orange-100 text-orange-600",
    },
  ];

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 shadow-sm w-full max-w-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Quick Actions
      </h3>

      <div className="space-y-3">
        {actions.map((action, idx) => {
          const Icon = action.icon;
          return (
            <div
              key={idx}
              className="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm"
            >
              {/* Icon + Title */}
              <div className="flex items-center gap-3">
                <span
                  className={`p-2 rounded-full flex items-center justify-center ${action.color}`}
                >
                  <Icon className="w-5 h-5" />
                </span>
                <p className="text-gray-700 font-medium">{action.title}</p>
              </div>

              {/* Add Button */}
              <button className="cursor-pointer px-4 py-1.5 text-sm font-medium text-gray-700 border rounded-full hover:bg-gray-100 transition">
                Add
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;
