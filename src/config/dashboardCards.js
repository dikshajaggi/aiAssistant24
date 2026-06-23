export const UTILITY_CARDS = [
  {
    id: "quick-actions",
    label: "Quick Actions",
    description: "Add patient, schedule appointments, send reminders",
  },
  {
    id: "calendar",
    label: "Calendar",
    description: "Monthly calendar with appointment indicators",
  },
  {
    id: "next-slot",
    label: "Next Available Slot",
    description: "Next free slot for today and tomorrow",
  },
];

export const WIDGET_CARDS = [
  {
    id: "todays-appointments",
    label: "Today's Appointments",
    description: "Patients scheduled for today",
  },
  {
    id: "pending-payments",
    label: "Pending Payments",
    description: "Outstanding dues from patients",
  },
  {
    id: "new-patients",
    label: "New Patients",
    description: "Monthly patient growth trend",
  },
  {
    id: "reminder-impact",
    label: "Reminder Impact",
    description: "Show-up rate and revenue protection metrics",
  },
];

export const DASHBOARD_STORAGE_KEY = "smileLytics.dashboardLayout";

export const DEFAULT_LAYOUT = {
  utilitiesOrder: UTILITY_CARDS.map((c) => c.id),
  widgetsOrder:   WIDGET_CARDS.map((c) => c.id),
  hidden:         [],
};

export const readLayout = () => {
  try {
    const raw = localStorage.getItem(DASHBOARD_STORAGE_KEY);
    if (!raw) return DEFAULT_LAYOUT;
    const parsed = JSON.parse(raw);

    // Merge in any new cards not yet in stored order
    const resolveOrder = (stored, allCards) => {
      const valid   = stored.filter((id) => allCards.some((c) => c.id === id));
      const missing = allCards.filter((c) => !valid.includes(c.id)).map((c) => c.id);
      return [...valid, ...missing];
    };

    return {
      utilitiesOrder: resolveOrder(parsed.utilitiesOrder || [], UTILITY_CARDS),
      widgetsOrder:   resolveOrder(parsed.widgetsOrder   || [], WIDGET_CARDS),
      hidden:         parsed.hidden || [],
    };
  } catch {
    return DEFAULT_LAYOUT;
  }
};
