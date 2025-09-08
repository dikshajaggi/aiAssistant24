import React from "react";
import {
  Users,
  Calendar,
  CreditCard,
  BarChart3,
  Clock,
} from "lucide-react";

const SummaryCards = () => {
const data = [
  {
    title: "Total Patients",
    value: "1250",
    icon: Users,
    bgColor: "bg-gradient-to-r from-primary/40 to-primary/60",
    color: "bg-white text-primary-600 border border-primary/40",
  },
  {
    title: "Total Visits",
    value: "3480",
    icon: Calendar,
    bgColor: "bg-gradient-to-r from-green-300 to-green-400",
    color: "bg-white text-green-600 border border-green-300",
  },
  // {
  //   title: "Total Revenue",
  //   value: "₹8,75,000",
  //   icon: BarChart3,
  //   bgColor: "bg-gradient-to-r from-purple-300 to-purple-400",
  //   color: "bg-white text-purple-600 border border-purple-300",
  // },
  {
    title: "Pending Patient Payments",
    value: "10",
    icon: CreditCard,
    bgColor: "bg-gradient-to-r from-red-300 to-red-400",
    color: "bg-white text-red-600 border border-red-300",
  },
  {
    title: "Upcoming Appointments",
    value: "12 Today / 35 This Week",
    bgColor: "bg-gradient-to-r from-yellow-300 to-yellow-400",
    icon: Clock,
    color: "bg-white text-yellow-600 border border-yellow-300",
  },
];

  return (
    <div className="pb-10 bg-neutral max-w-7xl mx-auto">
      {/* Responsive Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className={`h-[150px] flex flex-col justify-between ${card.bgColor} rounded-2xl shadow-lg p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
            >
              {/* Icon + Title */}
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-full ${card.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-800">
                  {card.value}
                </h3>
              </div>

              {/* Value */}
              <p className="text-base md:text-lg font-extrabold text-gray-900 text-left">
                {card.title}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SummaryCards;
