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
      value: "1,250",
      icon: Users,
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Total Visits",
      value: "3,480",
      icon: Calendar,
      color: "bg-green-100 text-green-600"
    },
    {
      title: "Total Revenue",
      value: "₹8,75,000",
      icon: BarChart3,
      color: "bg-purple-100 text-purple-600"
    },
    {
      title: "Pending Payments",
      value: "₹45,000",
      icon: CreditCard,
      color: "bg-red-100 text-red-600"
    },
    {
      title: "Upcoming Appointments",
      value: "12 Today / 35 This Week",
      icon: Clock,
      color: "bg-yellow-100 text-yellow-600"
    },
  ];

  return (
    <div className="px-6 py-12 bg-neutral">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-extrabold text-textdark mb-10">
          Dashboard Overview
        </h2>

        {/* Responsive Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {data.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="flex flex-col justify-between bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Icon + Title */}
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-full ${card.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {card.title}
                  </h3>
                </div>

                {/* Value */}
                <p className="text-xl md:text-2xl font-extrabold text-gray-900 mt-6">
                  {card.value}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;
