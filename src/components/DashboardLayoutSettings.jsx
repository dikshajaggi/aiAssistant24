import { useState, useRef, useEffect } from "react";
import { Reorder, useDragControls } from "framer-motion";
import { GripVertical, Eye, EyeOff, RotateCcw, Check, LayoutGrid } from "lucide-react";
import {
  UTILITY_CARDS,
  WIDGET_CARDS,
  DEFAULT_LAYOUT,
  DASHBOARD_STORAGE_KEY,
} from "../config/dashboardCards";

// ── Drag Handle Item ────────────────────────────────────────────────
const DraggableCard = ({ item, isHidden, onToggle }) => {
  const controls = useDragControls();

  return (
    <Reorder.Item
      value={item}
      dragListener={false}
      dragControls={controls}
      className="list-none"
      whileDrag={{ scale: 1.02, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}
    >
      <div
        className={`flex items-center gap-3 rounded-xl border px-3 py-3 transition-colors ${
          isHidden
            ? "bg-gray-50 border-gray-100 opacity-50"
            : "bg-white border-gray-100"
        }`}
      >
        {/* Drag handle */}
        <div
          className="cursor-grab active:cursor-grabbing touch-none shrink-0 p-0.5"
          onPointerDown={(e) => controls.start(e)}
        >
          <GripVertical size={15} className="text-gray-300 hover:text-gray-400 transition-colors" />
        </div>

        {/* Label + description */}
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-medium leading-tight ${isHidden ? "text-gray-400" : "text-gray-800"}`}>
            {item.label}
          </p>
          <p className="text-xs text-gray-400 mt-0.5 truncate">{item.description}</p>
        </div>

        {/* Visibility toggle */}
        <button
          type="button"
          onClick={() => onToggle(item.id)}
          title={isHidden ? "Show on dashboard" : "Hide from dashboard"}
          className={`shrink-0 w-7 h-7 flex items-center justify-center rounded-lg transition-colors ${
            isHidden
              ? "text-gray-300 hover:text-gray-500 hover:bg-gray-100"
              : "text-secondary1 hover:bg-sky-50"
          }`}
        >
          {isHidden ? <EyeOff size={14} /> : <Eye size={14} />}
        </button>
      </div>
    </Reorder.Item>
  );
};

// ── Group label ─────────────────────────────────────────────────────
const GroupLabel = ({ children }) => (
  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 pl-1">
    {children}
  </p>
);

// ── Main component ──────────────────────────────────────────────────
const DashboardLayoutSettings = () => {
  const timerRef = useRef(null);

  // Resolve stored order against the canonical card list
  const initItems = (storedOrder, allCards) =>
    storedOrder
      .map((id) => allCards.find((c) => c.id === id))
      .filter(Boolean);

  const readStored = () => {
    try {
      const raw = localStorage.getItem(DASHBOARD_STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  };

  const stored = readStored();

  const [utilItems, setUtilItems] = useState(() =>
    initItems(stored?.utilitiesOrder || DEFAULT_LAYOUT.utilitiesOrder, UTILITY_CARDS)
  );
  const [widgetItems, setWidgetItems] = useState(() =>
    initItems(stored?.widgetsOrder || DEFAULT_LAYOUT.widgetsOrder, WIDGET_CARDS)
  );
  const [hidden, setHidden] = useState(new Set(stored?.hidden || []));
  const [saved, setSaved] = useState(false);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const persist = (utils, widgets, hiddenSet) => {
    localStorage.setItem(
      DASHBOARD_STORAGE_KEY,
      JSON.stringify({
        utilitiesOrder: utils.map((c) => c.id),
        widgetsOrder:   widgets.map((c) => c.id),
        hidden:         [...hiddenSet],
      })
    );
    setSaved(true);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setSaved(false), 2500);
  };

  const handleUtilReorder = (newOrder) => {
    setUtilItems(newOrder);
    persist(newOrder, widgetItems, hidden);
  };

  const handleWidgetReorder = (newOrder) => {
    setWidgetItems(newOrder);
    persist(utilItems, newOrder, hidden);
  };

  const handleToggle = (id) => {
    setHidden((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      persist(utilItems, widgetItems, next);
      return next;
    });
  };

  const handleReset = () => {
    const utils   = UTILITY_CARDS;
    const widgets = WIDGET_CARDS;
    const h       = new Set();
    setUtilItems(utils);
    setWidgetItems(widgets);
    setHidden(h);
    localStorage.removeItem(DASHBOARD_STORAGE_KEY);
    setSaved(true);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">

      {/* Section header */}
      <div className="flex items-center gap-2 pb-3 border-b border-gray-100 mb-4">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-secondary1/10">
          <LayoutGrid size={16} className="text-secondary1" />
        </div>
        <div>
          <h2 className="font-semibold text-gray-800 text-base leading-tight">Dashboard Layout</h2>
        </div>
      </div>

      <p className="text-xs text-gray-400 mb-5 leading-relaxed">
        Drag cards to reorder them on your dashboard. Toggle the eye icon to show or hide a card.
        Changes save automatically.
      </p>

      {/* ── Utility Row ── */}
      <div className="mb-5">
        <GroupLabel>Utility Row (3 columns)</GroupLabel>
        <Reorder.Group
          axis="y"
          values={utilItems}
          onReorder={handleUtilReorder}
          className="space-y-2"
        >
          {utilItems.map((item) => (
            <DraggableCard
              key={item.id}
              item={item}
              isHidden={hidden.has(item.id)}
              onToggle={handleToggle}
            />
          ))}
        </Reorder.Group>
      </div>

      {/* ── Dashboard Widgets ── */}
      <div className="mb-6">
        <GroupLabel>Dashboard Widgets (2 columns per row)</GroupLabel>
        <Reorder.Group
          axis="y"
          values={widgetItems}
          onReorder={handleWidgetReorder}
          className="space-y-2"
        >
          {widgetItems.map((item) => (
            <DraggableCard
              key={item.id}
              item={item}
              isHidden={hidden.has(item.id)}
              onToggle={handleToggle}
            />
          ))}
        </Reorder.Group>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <button
          type="button"
          onClick={handleReset}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
        >
          <RotateCcw size={13} />
          Reset to default
        </button>

        <span
          className={`flex items-center gap-1.5 text-xs font-medium text-green-600 transition-opacity duration-300 ${
            saved ? "opacity-100" : "opacity-0"
          }`}
        >
          <Check size={13} />
          Layout saved
        </span>
      </div>
    </div>
  );
};

export default DashboardLayoutSettings;
