import React, { useEffect, useState } from "react";
import {
  Users,
  Calendar,
  CreditCard,
  BarChart3,
  Clock,
} from "lucide-react";

const data = [
  {
    title: "Total Patients",
    value: 1250,
    icon: Users,
    // bgColor: "bg-gradient-to-r from-primary/40 to-primary/60",
    // color: "bg-white text-primary-600 border border-primary/40",
    color: "bg-green-100 text-green-600"
  },
  {
    title: "Total Visits",
    value: 3480,
    icon: Calendar,
    // bgColor: "bg-gradient-to-r from-green-300 to-green-400",
    // color: "bg-white text-green-600 border border-green-300",
    color: "bg-red-100 text-red-600"
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
    value: 10,
    icon: CreditCard,
    // bgColor: "bg-gradient-to-r from-red-300 to-red-400",
    // color: "bg-white text-red-600 border border-red-300",
    color: "bg-pink-100 text-pink-600"
  },
  {
    title: "Appointments this week",
    value: 35,
    // bgColor: "bg-gradient-to-r from-yellow-300 to-yellow-400",
    icon: Clock,
    // color: "bg-white text-yellow-600 border border-yellow-300",
    color: "bg-yellow-100 text-yellow-600"
  },
];

const SummaryCards = () => {

const [sortedData, setSortedData] = useState(data)

// sorting data according to values in descending order
useEffect(() => {
  const sorted = data.sort((a,b) => b.value - a.value)
  setSortedData(sorted)
}, [data])

  return (
    <div className="pb-4 w-full p-4">
      {/* Responsive Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sortedData.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className={`h-[130px] flex flex-col justify-between bg-[#fafafa] rounded-2xl shadow-lg p-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
            >
              {/* Title */}
              <p className="text-base md:text-lg font-extrabold text-gray-900 text-left capitalize">
                {card.title}
              </p>

              {/* Icon + Value */}
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-full ${card.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg md:text-3xl font-semibold text-textdark">
                  {card.value}
                </h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SummaryCards;
