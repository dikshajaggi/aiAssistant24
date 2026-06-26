import React, {
  useState, useEffect, useRef, useMemo, useCallback, useContext,
} from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import {
  Search, X, UserPlus, CalendarPlus, Bell,
  FileText, BarChart3, Calendar, ChevronRight,
} from "lucide-react";
import moment from "moment";
import { usePatients, useVisits } from "../../hooks/useQueries";
import { MainContext } from "../../context/MainContext";
import PatientModal from "./PatientModal";
import AppointmentModal from "./AppointmenModal";

// ── statics ───────────────────────────────────────────────────────────────────

const QUICK_ACTIONS = [
  { id: "qa-patient",       label: "Add new patient",       icon: UserPlus,     type: "modal",    target: "patient" },
  { id: "qa-appointment",   label: "Schedule appointment",  icon: CalendarPlus, type: "modal",    target: "appointment" },
  { id: "qa-reminder",      label: "Send reminder",         icon: Bell,         type: "navigate", target: "/dashboard/reminders" },
  { id: "qa-prescription",  label: "Write prescription",    icon: FileText,     type: "navigate", target: "/dashboard/prescriptions" },
  { id: "qa-analytics",     label: "View analytics",        icon: BarChart3,    type: "navigate", target: "/dashboard/analytics" },
  { id: "qa-appointments",  label: "View all appointments", icon: Calendar,     type: "navigate", target: "/dashboard/appointments" },
];

const PAYMENT_BADGE = {
  paid:    "bg-green-100 text-green-700",
  pending: "bg-amber-100 text-amber-700",
  unpaid:  "bg-red-100 text-red-700",
};

const MAX_SHOWN = 4;

function getInitials(name = "") {
  return name.split(" ").map(w => w[0] || "").slice(0, 2).join("").toUpperCase() || "?";
}

function matchesQ(fields, q) {
  return fields.some(f => f && String(f).toLowerCase().includes(q));
}

// ── component ─────────────────────────────────────────────────────────────────

const GlobalSearch = () => {
  const { isSearchOpen, setIsSearchOpen } = useContext(MainContext);
  const navigate    = useNavigate();
  const queryClient = useQueryClient();

  const [query, setQuery]       = useState("");
  const [debounced, setDeb]     = useState("");
  const [focusedIdx, setFocused]= useState(-1);
  const [patientModal, setPM]   = useState(false);
  const [apptModal,    setAM]   = useState(false);

  const inputRef = useRef(null);

  const { data: patients = [] } = usePatients();
  const { data: visits   = [] } = useVisits();

  // debounce
  useEffect(() => {
    const t = setTimeout(() => setDeb(query.trim().toLowerCase()), 300);
    return () => clearTimeout(t);
  }, [query]);

  // focus + reset on open
  useEffect(() => {
    if (!isSearchOpen) return;
    setQuery("");
    setDeb("");
    setFocused(-1);
    setTimeout(() => inputRef.current?.focus(), 40);
  }, [isSearchOpen]);

  // Ctrl+K / Cmd+K — don't fire when typing in a form
  useEffect(() => {
    const handler = (e) => {
      if (!(e.ctrlKey || e.metaKey) || e.key !== "k") return;
      const tag = document.activeElement?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || document.activeElement?.isContentEditable) return;
      e.preventDefault();
      setIsSearchOpen(true);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [setIsSearchOpen]);

  // Escape to close search overlay
  useEffect(() => {
    if (!isSearchOpen) return;
    const handler = (e) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isSearchOpen]);

  const close = useCallback(() => setIsSearchOpen(false), [setIsSearchOpen]);

  // ── filtered data ──────────────────────────────────────────────────────────

  const filteredPatients = useMemo(() => {
    if (!debounced) return [];
    return patients.filter(p => matchesQ([p.name, p.phone, p.email], debounced));
  }, [patients, debounced]);

  const filteredVisits = useMemo(() => {
    if (!debounced) return [];
    return visits.filter(v => {
      const dateStr = v.visit_date
        ? moment(v.visit_date).format("D MMM MMMM YYYY dddd").toLowerCase()
        : "";
      return matchesQ([v.name, v.patient_name, v.treatment, dateStr], debounced);
    });
  }, [visits, debounced]);

  const filteredActions = useMemo(() => {
    if (!debounced) return QUICK_ACTIONS;
    return QUICK_ACTIONS.filter(a => a.label.toLowerCase().includes(debounced));
  }, [debounced]);

  const shownPatients = filteredPatients.slice(0, MAX_SHOWN);
  const shownVisits   = filteredVisits.slice(0, MAX_SHOWN);
  const morePatients  = filteredPatients.length - MAX_SHOWN;
  const moreVisits    = filteredVisits.length - MAX_SHOWN;

  // flat list for arrow-key nav (order must match render order)
  const navItems = useMemo(() => [
    ...shownPatients.map(d => ({ kind: "patient", data: d })),
    ...shownVisits.map(d   => ({ kind: "visit",   data: d })),
    ...filteredActions.map(d => ({ kind: "action",  data: d })),
  ], [shownPatients, shownVisits, filteredActions]);

  // pre-compute index offsets for each section
  const visitOffset  = shownPatients.length;
  const actionOffset = shownPatients.length + shownVisits.length;

  // ── select handler ─────────────────────────────────────────────────────────

  const handleSelect = useCallback((item) => {
    if (item.kind === "patient") {
      close();
      navigate("/dashboard/patients");
    } else if (item.kind === "visit") {
      close();
      navigate("/dashboard/appointments");
    } else {
      const { type, target } = item.data;
      if (type === "navigate") {
        close();
        navigate(target);
      } else if (target === "patient") {
        close();
        setPM(true);
      } else if (target === "appointment") {
        close();
        setAM(true);
      }
    }
  }, [close, navigate]);

  // ── keyboard nav inside the modal ─────────────────────────────────────────

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocused(i => Math.min(i + 1, navItems.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocused(i => Math.max(i - 1, -1));
    } else if (e.key === "Enter" && focusedIdx >= 0) {
      e.preventDefault();
      handleSelect(navItems[focusedIdx]);
    }
  };

  // ── row renderers ──────────────────────────────────────────────────────────

  const rowCls = (idx) =>
    `flex items-center gap-3 px-4 h-12 cursor-pointer transition-colors ${
      focusedIdx === idx ? "bg-gray-100" : "hover:bg-gray-50"
    }`;

  const renderPatient = (p, idx) => (
    <div key={p.id ?? idx} onClick={() => handleSelect({ kind: "patient", data: p })}
      onMouseEnter={() => setFocused(idx)} className={rowCls(idx)}>
      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold shrink-0">
        {getInitials(p.name)}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-800 truncate">{p.name}</p>
        <p className="text-xs text-gray-400 truncate">
          {[p.phone, p.treatment].filter(Boolean).join(" · ")}
        </p>
      </div>
      <ChevronRight size={14} className="text-gray-300 shrink-0" />
    </div>
  );

  const renderVisit = (v, idx) => {
    const name    = v.name || v.patient_name || "Unknown";
    const dateStr = v.visit_date ? moment(v.visit_date).format("D MMM YYYY, h:mm A") : "—";
    const badge   = PAYMENT_BADGE[v.payment_status] || "bg-gray-100 text-gray-500";
    return (
      <div key={v.id ?? idx} onClick={() => handleSelect({ kind: "visit", data: v })}
        onMouseEnter={() => setFocused(idx)} className={rowCls(idx)}>
        <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center text-xs font-bold shrink-0">
          {getInitials(name)}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-800 truncate">
            {name}
            {v.treatment && <span className="text-gray-400 font-normal"> — {v.treatment}</span>}
          </p>
          <p className="text-xs text-gray-400">{dateStr}</p>
        </div>
        {v.payment_status && (
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize shrink-0 ${badge}`}>
            {v.payment_status}
          </span>
        )}
      </div>
    );
  };

  const renderAction = (a, idx) => {
    const Icon = a.icon;
    return (
      <div key={a.id} onClick={() => handleSelect({ kind: "action", data: a })}
        onMouseEnter={() => setFocused(idx)} className={rowCls(idx)}>
        <div className="w-8 h-8 rounded-lg bg-gray-100 text-gray-500 flex items-center justify-center shrink-0">
          <Icon size={15} />
        </div>
        <span className="text-sm text-gray-700">{a.label}</span>
      </div>
    );
  };

  // ── render ─────────────────────────────────────────────────────────────────

  const hasResults = shownPatients.length > 0 || shownVisits.length > 0 || filteredActions.length > 0;
  const noResults  = !!debounced && !hasResults;

  return createPortal(
    <>
      {/* ── Search overlay ── */}
      {isSearchOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-start justify-center pt-[10vh]"
          style={{ background: "rgba(0,0,0,0.5)" }}
          onClick={(e) => { if (e.target === e.currentTarget) close(); }}
        >
          <div
            className="bg-white w-full mx-4 rounded-xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden"
            style={{ maxWidth: 580, maxHeight: 480 }}
          >
            {/* Input row */}
            <div className="flex items-center gap-3 px-4 border-b border-gray-100 shrink-0">
              <Search size={18} className="text-gray-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => { setQuery(e.target.value); setFocused(-1); }}
                onKeyDown={handleKeyDown}
                placeholder="Search patients, appointments, treatments…"
                className="flex-1 py-4 text-[17px] text-gray-800 placeholder-gray-400 bg-transparent focus:outline-none"
              />
              {query && (
                <button type="button" onClick={() => { setQuery(""); setDeb(""); inputRef.current?.focus(); }}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer shrink-0 p-1">
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Results */}
            <div className="overflow-y-auto flex-1">

              {/* No results */}
              {noResults && (
                <div className="flex flex-col items-center justify-center py-12 text-center px-6">
                  <Search size={36} className="text-gray-200 mb-3" />
                  <p className="text-gray-500 text-sm">
                    No results for <strong>"{query}"</strong>
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Try a patient name, phone number, or treatment
                  </p>
                </div>
              )}

              {/* Results */}
              {!noResults && (
                <div className="py-1">

                  {/* Patients */}
                  {shownPatients.length > 0 && (
                    <div>
                      <p className="px-4 pt-3 pb-1 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                        Patients
                      </p>
                      {shownPatients.map((p, i) => renderPatient(p, i))}
                      {morePatients > 0 && (
                        <button type="button"
                          onClick={() => { close(); navigate("/dashboard/patients"); }}
                          className="w-full text-left px-4 py-2 text-xs text-blue-600 hover:bg-gray-50 cursor-pointer transition-colors">
                          See all {filteredPatients.length} patient results →
                        </button>
                      )}
                    </div>
                  )}

                  {/* Appointments */}
                  {shownVisits.length > 0 && (
                    <div>
                      <p className="px-4 pt-3 pb-1 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                        Appointments
                      </p>
                      {shownVisits.map((v, i) => renderVisit(v, visitOffset + i))}
                      {moreVisits > 0 && (
                        <button type="button"
                          onClick={() => { close(); navigate("/dashboard/appointments"); }}
                          className="w-full text-left px-4 py-2 text-xs text-blue-600 hover:bg-gray-50 cursor-pointer transition-colors">
                          See all {filteredVisits.length} appointment results →
                        </button>
                      )}
                    </div>
                  )}

                  {/* Quick actions */}
                  {filteredActions.length > 0 && (
                    <div>
                      <p className="px-4 pt-3 pb-1 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                        Quick actions
                      </p>
                      {!debounced && (
                        <p className="px-4 pb-1 text-xs text-gray-400">
                          Search patients, appointments, treatments…
                        </p>
                      )}
                      {filteredActions.map((a, i) => renderAction(a, actionOffset + i))}
                    </div>
                  )}

                </div>
              )}
            </div>

            {/* Footer */}
            <div className="shrink-0 flex items-center justify-end gap-3 px-4 py-2 border-t border-gray-100">
              <span className="text-xs text-gray-400 flex items-center gap-1.5">
                <kbd className="bg-gray-100 border border-gray-200 rounded px-1.5 py-0.5 text-[11px] text-gray-500 font-mono">↑↓</kbd>
                navigate
              </span>
              <span className="text-xs text-gray-400 flex items-center gap-1.5">
                <kbd className="bg-gray-100 border border-gray-200 rounded px-1.5 py-0.5 text-[11px] text-gray-500 font-mono">↵</kbd>
                select
              </span>
              <span className="text-xs text-gray-400 flex items-center gap-1.5">
                <kbd className="bg-gray-100 border border-gray-200 rounded px-1.5 py-0.5 text-[11px] text-gray-500 font-mono">ESC</kbd>
                close
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ── Add Patient modal (from quick action) ── */}
      {patientModal && (
        <PatientModal
          isOpen={patientModal}
          onClose={() => setPM(false)}
          onSuccess={() => {
            setPM(false);
            queryClient.invalidateQueries({ queryKey: ["patients"] });
          }}
          saveLabel="Add Patient"
          headingLabel="Add Patient"
          caption="Add a new patient to your clinic"
        />
      )}

      {/* ── Schedule Appointment modal (from quick action) ── */}
      {apptModal && (
        <AppointmentModal
          isOpen={apptModal}
          onClose={() => setAM(false)}
          onSuccess={() => {
            setAM(false);
            queryClient.invalidateQueries({ queryKey: ["visits"] });
          }}
          saveLabel="Schedule Appointment"
          headingLabel="Schedule Appointment"
          caption="Book a new appointment"
        />
      )}
    </>,
    document.body
  );
};

export default GlobalSearch;
