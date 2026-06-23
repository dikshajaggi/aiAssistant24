import React from "react";
import { Users, Calendar, CreditCard, Clock } from "lucide-react";

// Fields from GET /dashboard → cards: total_patients, total_visits, total_revenue, pending_payments
const CARD_DEFINITIONS = [
  {
    title: "Total Patients",
    apiKey: ["total_patients"],
    icon: Users,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Total Visits",
    apiKey: ["total_visits"],
    icon: Calendar,
    color: "bg-red-100 text-red-600",
  },
  {
    title: "Total Revenue",
    apiKey: ["total_revenue"],
    icon: CreditCard,
    color: "bg-pink-100 text-pink-600",
  },
  {
    title: "Pending Payments",
    apiKey: ["pending_payments"],
    icon: Clock,
    color: "bg-yellow-100 text-yellow-600",
    accent: "border-l-4 border-amber-400",
    actionLink: "#",
  },
];

const resolveValue = (data, keys) => {
  for (const key of keys) {
    if (data?.[key] !== undefined && data?.[key] !== null) return data[key];
  }
  return "—";
};

const SummaryCards = ({ summaryData, loading, error }) => {
  if (loading) {
    return (
      <div className="w-full pb-2">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {CARD_DEFINITIONS.map((_, idx) => (
            <div
              key={idx}
              className="h-[130px] bg-[#fafafa] rounded-2xl shadow-lg p-4 animate-pulse"
            >
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4" />
              <div className="h-8 bg-gray-200 rounded w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full pb-2">
        <p className="text-red-500 text-sm text-center">{error}</p>
      </div>
    );
  }

  const cards = CARD_DEFINITIONS.map((def) => ({
    ...def,
    value: resolveValue(summaryData, def.apiKey),
  }));

  return (
    <div className="pb-4 w-full p-4">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className={`h-[130px] flex flex-col justify-between bg-[#fafafa] rounded-2xl shadow-lg p-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${card.accent ?? ""}`}
            >
              <div className="flex items-center justify-between">
                <p className="text-base md:text-lg font-extrabold text-gray-900 text-left capitalize">
                  {card.title}
                </p>
                {card.actionLink && (
                  <a
                    href={card.actionLink}
                    className="text-xs font-medium text-amber-600 hover:underline"
                  >
                    View →
                  </a>
                )}
              </div>
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
