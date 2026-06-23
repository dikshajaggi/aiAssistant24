import React, { useState, useEffect } from "react";
import PageWrapper from "./PageWrapper";
import SummaryCards from "../components/SummaryCards";
import QuickActions from "../components/QuickActions";
import MiniCalendarCard from "../components/MiniCalendarCard";
import NextAvailableSlotCard from "../components/NextAvailableSlotCard";
import TodaysAppointments from "../components/TodaysAppointments";
import NewPatientsCard from "../components/NewPatientsCard";
import PendingPaymentsCard from "../components/PendingPaymentsCard";
import ReminderStatusCard from "../components/ReminderStatusCard";
import { useDashboard } from "../hooks/useQueries";
import { readLayout } from "../config/dashboardCards";

// Map card IDs → rendered JSX
const UTILITY_MAP = {
  "quick-actions":  <QuickActions />,
  "calendar":       <MiniCalendarCard />,
  "next-slot":      <NextAvailableSlotCard />,
};

const WIDGET_MAP = {
  "todays-appointments": <TodaysAppointments />,
  "pending-payments":    <PendingPaymentsCard />,
  "new-patients":        <NewPatientsCard />,
  "reminder-impact":     <ReminderStatusCard />,
};

// Tailwind grid-cols class for N visible utility cards
const utilColClass = { 1: "md:grid-cols-1", 2: "md:grid-cols-2", 3: "md:grid-cols-3" };

const Dashboard = () => {
  const { data, isLoading: loading, isError } = useDashboard();
  const error = isError ? "Failed to load dashboard data. Please try again." : null;

  // Re-read layout from localStorage each time the dashboard mounts
  // (handles changes made in Profile → Dashboard Layout settings)
  const [layout, setLayout] = useState(readLayout);
  useEffect(() => { setLayout(readLayout()); }, []);

  const { utilitiesOrder, widgetsOrder, hidden } = layout;

  // Filter out hidden cards
  const visibleUtils   = utilitiesOrder.filter((id) => !hidden.includes(id));
  const visibleWidgets = widgetsOrder.filter((id) => !hidden.includes(id));

  // Pair widgets into 2-col rows
  const widgetRows = [];
  for (let i = 0; i < visibleWidgets.length; i += 2) {
    widgetRows.push(visibleWidgets.slice(i, i + 2));
  }

  return (
    <PageWrapper>
      <div className="w-full mx-auto flex flex-col gap-6 pb-10">

        {/* Row 1 — KPI summary tiles (always first, not customisable) */}
        <SummaryCards summaryData={data?.cards} loading={loading} error={error} />
        {error && <p className="text-center text-red-500 text-sm -mt-4">{error}</p>}

        {/* Row 2 — Utility cards (order + visibility controlled by layout) */}
        {visibleUtils.length > 0 && (
          <div
            className={`grid grid-cols-1 gap-6 ${
              utilColClass[visibleUtils.length] ?? "md:grid-cols-3"
            }`}
          >
            {visibleUtils.map((id) => (
              <div key={id} className="min-w-0">
                {UTILITY_MAP[id]}
              </div>
            ))}
          </div>
        )}

        {/* Rows 3+ — Widget pairs (order + visibility controlled by layout) */}
        {widgetRows.map((pair, i) => (
          <div
            key={i}
            className={`grid grid-cols-1 gap-6 ${pair.length === 2 ? "md:grid-cols-2" : "md:grid-cols-1"}`}
          >
            {pair.map((id) => (
              <div key={id} className="min-w-0">
                {WIDGET_MAP[id]}
              </div>
            ))}
          </div>
        ))}

      </div>
    </PageWrapper>
  );
};

export default Dashboard;
