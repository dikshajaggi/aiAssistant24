import React, { useState } from "react";
import PageWrapper from "./PageWrapper";
import { useAnalytics } from "../hooks/useQueries";
import {
  BarChart, Bar, LineChart, Line,
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, LabelList, Label,
} from "recharts";

// ── Brand colours ────────────────────────────────────────────────────
const TEAL   = "#1D9E75";
const GRAY   = "#D1D5DB";
const BLUE   = "#378ADD";
const AMBER  = "#EF9F27";
const CORAL  = "#F0997B";
const PINK   = "#D4537E";
const PURPLE = "#7F77DD";
const TOP5_COLORS    = [TEAL, BLUE, AMBER, PINK, PURPLE];
const SEASONAL_COLORS = [TEAL, BLUE, AMBER, CORAL, PINK, PURPLE, GRAY];

// Gradient teal shades for revenue-by-treatment (darkest → lightest)
const TREATMENT_SHADES = ["#1D9E75","#2DB88A","#3ECE9F","#5ADDB2","#7AEAC4","#9DF5D5"];

// Show-up chart keeps its mock data — no backend endpoint provided yet
const SHOWUP = [
  { month:"Jan", without:62, with:78 },
  { month:"Feb", without:64, with:80 },
  { month:"Mar", without:60, with:76 },
  { month:"Apr", without:65, with:82 },
  { month:"May", without:63, with:79 },
  { month:"Jun", without:66, with:84 },
];

// ── Helpers ──────────────────────────────────────────────────────────
const fmtINR = (n) => {
  if (n >= 100000) return `₹${+(n / 100000).toFixed(1)}L`;
  if (n >= 1000)   return `₹${+(n / 1000).toFixed(1)}k`;
  return `₹${n}`;
};

// ── Shared mini-components ────────────────────────────────────────────

const Card = ({ title, subtitle, children, action }) => (
  <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl p-5 shadow-sm">
    <div className="flex items-start justify-between mb-4">
      <div>
        <h2 className="text-base font-semibold text-gray-800 dark:text-slate-100">{title}</h2>
        {subtitle && (
          <p className="text-base text-gray-400 dark:text-slate-400 mt-0.5">{subtitle}</p>
        )}
      </div>
      {action}
    </div>
    {children}
  </div>
);

const KpiCard = ({ label, value, delta, positive }) => (
  <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl p-4 shadow-sm">
    <p className="text-base text-gray-500 dark:text-slate-400 mb-1">{label}</p>
    <p className="text-3xl font-bold text-gray-900 dark:text-slate-100 leading-tight">{value}</p>
    <div className="flex items-center gap-1 mt-1.5">
      <span style={{ color: positive ? "#16a34a" : "#dc2626", fontSize: 13, fontWeight: 700 }}>
        {positive ? "↑" : "↓"} {Math.abs(delta)}%
      </span>
      <span className="text-base text-gray-400 dark:text-slate-500">vs last period</span>
    </div>
  </div>
);

const Tip = ({ active, payload, label, fmt }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background:"#fff", border:"1px solid #e5e7eb",
      borderRadius:8, padding:"8px 12px",
      boxShadow:"0 4px 16px rgba(0,0,0,0.08)", minWidth:120,
    }}>
      <p style={{ margin:0, fontSize:13, fontWeight:600, color:"#374151", marginBottom:4 }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ margin:"2px 0", fontSize:13 }}>
          <span style={{ color:"#9ca3af" }}>{p.name}: </span>
          <span style={{ color: p.color ?? "#374151", fontWeight:600 }}>
            {fmt ? fmt(p.value) : p.value}
          </span>
        </p>
      ))}
    </div>
  );
};

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-14 text-gray-300">
    <svg width="48" height="48" fill="none" viewBox="0 0 48 48">
      <rect x="4" y="10" width="40" height="30" rx="4" stroke="#d1d5db" strokeWidth="2"/>
      <path d="M14 30l6-8 6 6 4-5 4 7" stroke="#d1d5db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    <p className="mt-3 text-base text-gray-400">Not enough data yet</p>
  </div>
);

const ErrorState = () => (
  <div className="flex items-center justify-center py-14">
    <p className="text-base text-gray-400">Could not load data — try refreshing</p>
  </div>
);

const ChartSkeleton = ({ height = 280 }) => (
  <div className="animate-pulse">
    <div style={{ height }} className="bg-gray-100 dark:bg-slate-700 rounded-lg" />
  </div>
);

const ToggleBtn = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className="px-3 py-1 text-base font-medium rounded-lg cursor-pointer transition-all"
    style={{
      background: active ? TEAL : "#f3f4f6",
      color: active ? "#fff" : "#6b7280",
      border: "none",
    }}
  >
    {label}
  </button>
);

// ── Chart 1 — Revenue over time ───────────────────────────────────────
const RevenueChart = ({ data, view, onViewChange, isLoading, isError }) => (
  <Card
    title="Revenue over time"
    subtitle="Revenue per period"
    action={
      <div className="flex gap-1.5">
        <ToggleBtn label="Monthly" active={view === "Monthly"} onClick={() => onViewChange("Monthly")} />
        <ToggleBtn label="Weekly"  active={view === "Weekly"}  onClick={() => onViewChange("Weekly")}  />
      </div>
    }
  >
    {isLoading ? <ChartSkeleton height={280} /> :
     isError   ? <ErrorState /> :
     !data?.length ? <EmptyState /> : (
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} barCategoryGap="30%" margin={{ top:4, right:16, left:8, bottom:0 }}>
          <CartesianGrid vertical={false} stroke="#f3f4f6" />
          <XAxis dataKey="period" tick={{ fontSize:13, fill:"#9ca3af" }} axisLine={false} tickLine={false} />
          <YAxis tickFormatter={fmtINR} tick={{ fontSize:13, fill:"#9ca3af" }} axisLine={false} tickLine={false} width={52} />
          <Tooltip content={<Tip fmt={fmtINR} />} cursor={{ fill:"#f9fafb" }} />
          <Bar dataKey="revenue" name="Revenue" fill={TEAL} radius={[4,4,0,0]} />
        </BarChart>
      </ResponsiveContainer>
    )}
  </Card>
);

// ── Chart 2 — Revenue by treatment (horizontal bars) ─────────────────
const RevByTreatmentChart = ({ data, isLoading, isError }) => {
  const total = data?.reduce((s, d) => s + d.revenue, 0) || 0;
  const dataWithPct = data?.map(d => ({ ...d, pct: total ? Math.round((d.revenue / total) * 100) : 0 })) ?? [];

  return (
    <Card title="Revenue by treatment" subtitle="Top treatments by revenue generated">
      {isLoading ? <ChartSkeleton height={260} /> :
       isError   ? <ErrorState /> :
       !dataWithPct.length ? <EmptyState /> : (
        <ResponsiveContainer width="100%" height={260}>
          <BarChart
            data={dataWithPct}
            layout="vertical"
            margin={{ top:4, right:110, left:8, bottom:0 }}
          >
            <XAxis type="number" tickFormatter={fmtINR} tick={{ fontSize:13, fill:"#9ca3af" }} axisLine={false} tickLine={false} />
            <YAxis type="category" dataKey="treatment" width={80} tick={{ fontSize:13, fill:"#6b7280" }} axisLine={false} tickLine={false} />
            <Tooltip content={<Tip fmt={fmtINR} />} cursor={{ fill:"#f9fafb" }} />
            <Bar dataKey="revenue" name="Revenue" radius={[0,4,4,0]}>
              {dataWithPct.map((_, i) => (
                <Cell key={i} fill={TREATMENT_SHADES[i % TREATMENT_SHADES.length]} />
              ))}
              <LabelList
                content={({ x, y, width, height, value, index }) => (
                  <text
                    x={x + width + 8} y={y + height / 2 + 1}
                    fill="#9ca3af" fontSize={12} dominantBaseline="middle"
                  >
                    {fmtINR(value)} · {dataWithPct[index]?.pct}%
                  </text>
                )}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
};

// ── Chart 3 — Patient retention donut ────────────────────────────────
const RetentionChart = ({ data, isLoading, isError }) => {
  const retentionData = data ? [
    { name: "Retained",     value: Math.round(data.rate * 100),         count: data.retained     },
    { name: "Not returned", value: Math.round((1 - data.rate) * 100),   count: data.not_returned },
  ] : [];
  const total = data ? data.retained + data.not_returned : 0;
  const retainedPct = data ? Math.round(data.rate * 100) : 0;

  return (
    <Card title="Patient retention rate" subtitle="Patients who returned within 6 months">
      {isLoading ? <ChartSkeleton height={280} /> :
       isError   ? <ErrorState /> :
       !data    ? <EmptyState /> : (
        <div className="flex flex-col items-center">
          <PieChart width={220} height={220}>
            <Pie
              data={retentionData} cx={110} cy={110}
              innerRadius={70} outerRadius={95}
              startAngle={90} endAngle={-270}
              dataKey="value" strokeWidth={0}
            >
              <Cell fill={TEAL}  />
              <Cell fill={CORAL} />
              <Label
                content={({ viewBox }) => {
                  const { cx, cy } = viewBox;
                  return (
                    <g>
                      <text x={cx} y={cy - 6} textAnchor="middle" fill={TEAL} fontSize={30} fontWeight="800">
                        {retainedPct}%
                      </text>
                      <text x={cx} y={cy + 16} textAnchor="middle" fill="#9ca3af" fontSize={11}>
                        retained
                      </text>
                    </g>
                  );
                }}
              />
            </Pie>
            <Tooltip content={<Tip fmt={(v) => `${v}%`} />} />
          </PieChart>

          <div className="flex gap-6 mt-1">
            {retentionData.map((r, i) => (
              <div key={r.name} className="flex items-center gap-2">
                <span style={{ width:10, height:10, borderRadius:"50%", background: i === 0 ? TEAL : CORAL, display:"inline-block" }} />
                <div>
                  <p className="text-base text-gray-500">{r.name}</p>
                  <p className="text-base font-bold text-gray-800 dark:text-slate-200">
                    {r.count} <span className="text-base font-normal text-gray-400">/ {total}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};

// ── Chart 4 — Busiest days & hours ───────────────────────────────────
const BusiestTimesCard = ({ data, isLoading, isError }) => {
  const days  = data?.days  ?? [];
  const hours = data?.hours ?? [];
  const maxDay = days.length ? days.reduce((a, b) => a.count > b.count ? a : b).day : null;

  return (
    <Card title="Busiest days & hours" subtitle="Average number of appointments per slot">
      {isLoading ? <ChartSkeleton height={240} /> :
       isError   ? <ErrorState /> : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* 4a — Days */}
          <div>
            <p className="text-base font-medium text-gray-500 mb-3">By day of week</p>
            {!days.length ? <EmptyState /> : (
              <>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={days} margin={{ top:4, right:8, left:-16, bottom:0 }}>
                    <CartesianGrid vertical={false} stroke="#f3f4f6" />
                    <XAxis dataKey="day" tick={{ fontSize:13, fill:"#9ca3af" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize:13, fill:"#9ca3af" }} axisLine={false} tickLine={false} />
                    <Tooltip content={<Tip />} cursor={{ fill:"#f9fafb" }} />
                    <Bar dataKey="count" name="Avg appointments" radius={[4,4,0,0]}>
                      {days.map((d, i) => (
                        <Cell key={i} fill={d.day === maxDay ? TEAL : GRAY} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
                <p className="text-base text-center text-gray-400 mt-2">
                  Busiest: <span style={{ color:TEAL, fontWeight:600 }}>{maxDay}</span>
                </p>
              </>
            )}
          </div>

          {/* 4b — Hours (empty for now) */}
          <div>
            <p className="text-base font-medium text-gray-500 mb-3">By hour of day</p>
            {!hours.length ? (
              <div className="flex flex-col items-center justify-center h-[200px] text-center px-4">
                <svg width="40" height="40" fill="none" viewBox="0 0 40 40" className="mb-3">
                  <circle cx="20" cy="20" r="16" stroke="#d1d5db" strokeWidth="2"/>
                  <path d="M20 12v8l4 4" stroke="#d1d5db" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <p className="text-base text-gray-400">
                  Hour-level data will be available once appointment times are recorded
                </p>
              </div>
            ) : (
              <>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={hours} margin={{ top:4, right:8, left:-16, bottom:0 }}>
                    <CartesianGrid vertical={false} stroke="#f3f4f6" />
                    <XAxis dataKey="hour" tick={{ fontSize:11, fill:"#9ca3af" }} axisLine={false} tickLine={false} interval={1} />
                    <YAxis tick={{ fontSize:13, fill:"#9ca3af" }} axisLine={false} tickLine={false} />
                    <Tooltip content={<Tip />} cursor={{ fill:"#f9fafb" }} />
                    <Bar dataKey="count" name="Avg appointments" radius={[4,4,0,0]}>
                      {hours.map((h, i) => (
                        <Cell key={i} fill={GRAY} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </>
            )}
          </div>
        </div>
      )}
    </Card>
  );
};

// ── Chart 5 — Top 5 treatments (volume + revenue donuts) ─────────────
const Top5Card = ({ data, isLoading, isError }) => {
  const byVolume  = data?.by_volume  ?? [];
  const byRevenue = data?.by_revenue ?? [];

  const Donut = ({ items, dataKey, fmt }) => (
    <PieChart width={200} height={180}>
      <Pie
        data={items} cx={100} cy={90}
        innerRadius={52} outerRadius={75}
        startAngle={90} endAngle={-270}
        dataKey={dataKey} nameKey="treatment" strokeWidth={0}
      >
        {items.map((_, i) => <Cell key={i} fill={TOP5_COLORS[i % TOP5_COLORS.length]} />)}
      </Pie>
      <Tooltip content={<Tip fmt={fmt} />} />
    </PieChart>
  );

  // Build a unified legend from whichever list is longer
  const legendItems = byVolume.length >= byRevenue.length ? byVolume : byRevenue;

  return (
    <Card title="Top 5 treatments" subtitle="Breakdown by volume (cases) and revenue (₹)">
      {isLoading ? <ChartSkeleton height={220} /> :
       isError   ? <ErrorState /> :
       (!byVolume.length && !byRevenue.length) ? <EmptyState /> : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col items-center">
              <p className="text-base font-medium text-gray-500 mb-2">By volume (cases)</p>
              {byVolume.length ? <Donut items={byVolume} dataKey="count" /> : <EmptyState />}
            </div>
            <div className="flex flex-col items-center">
              <p className="text-base font-medium text-gray-500 mb-2">By revenue (₹)</p>
              {byRevenue.length ? <Donut items={byRevenue} dataKey="revenue" fmt={fmtINR} /> : <EmptyState />}
            </div>
          </div>

          {legendItems.length > 0 && (
            <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mt-4 pt-4 border-t border-gray-100">
              {legendItems.map((t, i) => (
                <span key={t.treatment} className="flex items-center gap-1.5 text-base text-gray-600">
                  <span style={{ width:10, height:10, borderRadius:2, background:TOP5_COLORS[i % TOP5_COLORS.length], display:"inline-block" }} />
                  {t.treatment}
                </span>
              ))}
            </div>
          )}
        </>
      )}
    </Card>
  );
};

// ── Chart 6 — Seasonal trends (multi-line, dynamic keys) ─────────────
const SeasonalChart = ({ data, isLoading, isError }) => {
  const treatmentKeys = data?.length
    ? Object.keys(data[0]).filter(k => k !== "month")
    : [];

  return (
    <Card title="Seasonal trends" subtitle="Monthly case volume for top treatments">
      {isLoading ? <ChartSkeleton height={300} /> :
       isError   ? <ErrorState /> :
       !data?.length ? <EmptyState /> : (
        <>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data} margin={{ top:20, right:24, left:0, bottom:0 }}>
              <CartesianGrid stroke="#f3f4f6" />
              <XAxis dataKey="month" tick={{ fontSize:13, fill:"#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize:13, fill:"#9ca3af" }} axisLine={false} tickLine={false} width={32} />
              <Tooltip content={<Tip />} />
              {treatmentKeys.map((key, i) => (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  name={key}
                  stroke={SEASONAL_COLORS[i % SEASONAL_COLORS.length]}
                  strokeWidth={i === 0 ? 2.5 : 2}
                  dot={false}
                  activeDot={{ r:4 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>

          <div className="flex flex-wrap gap-5 mt-3 justify-end">
            {treatmentKeys.map((key, i) => (
              <span key={key} className="flex items-center gap-1.5 text-base text-gray-500">
                <span style={{ width:16, height:2.5, background:SEASONAL_COLORS[i % SEASONAL_COLORS.length], display:"inline-block", borderRadius:2 }} />
                {key}
              </span>
            ))}
          </div>
        </>
      )}
    </Card>
  );
};

// ── Chart 7 — Show-up rate before vs after reminders ─────────────────
const ShowUpChart = () => {
  const avgWith    = Math.round(SHOWUP.reduce((s,r) => s + r.with,    0) / SHOWUP.length);
  const avgWithout = Math.round(SHOWUP.reduce((s,r) => s + r.without, 0) / SHOWUP.length);
  const lift       = avgWith - avgWithout;

  return (
    <Card title="Show-up rate: before vs after reminders" subtitle="Monthly comparison over the last 6 months">
      <div
        className="flex items-center gap-3 rounded-xl px-4 py-3 mb-5"
        style={{ background: `${TEAL}14`, border: `1px solid ${TEAL}30` }}
      >
        <div>
          <p className="text-base font-semibold" style={{ color: TEAL }}>
            Reminders improve show-up rate by {lift}%
          </p>
          <p className="text-base text-gray-500 mt-0.5">
            Average <strong>{avgWithout}%</strong> without reminders →{" "}
            <strong style={{ color: TEAL }}>{avgWith}%</strong> with reminders
          </p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={SHOWUP} barCategoryGap="30%" barGap={4} margin={{ top:4, right:24, left:0, bottom:0 }}>
          <CartesianGrid vertical={false} stroke="#f3f4f6" />
          <XAxis dataKey="month" tick={{ fontSize:13, fill:"#9ca3af" }} axisLine={false} tickLine={false} />
          <YAxis domain={[50,100]} tickFormatter={(v) => `${v}%`} tick={{ fontSize:13, fill:"#9ca3af" }} axisLine={false} tickLine={false} width={40} />
          <Tooltip content={<Tip fmt={(v) => `${v}%`} />} cursor={{ fill:"#f9fafb" }} />
          <ReferenceLine
            y={avgWith}
            stroke="#9ca3af"
            strokeDasharray="5 3"
            label={{ value:`${avgWith}% avg (with)`, position:"insideRight", fill:"#9ca3af", fontSize:10, dy:-6 }}
          />
          <Bar dataKey="without" name="Without reminder" fill={GRAY} radius={[4,4,0,0]} />
          <Bar dataKey="with"    name="With reminder"    fill={TEAL} radius={[4,4,0,0]} />
        </BarChart>
      </ResponsiveContainer>

      <div className="flex items-center gap-5 mt-3 justify-end">
        {[["With reminder", TEAL],["Without reminder", GRAY]].map(([l,c]) => (
          <span key={l} className="flex items-center gap-1.5 text-base text-gray-500">
            <span style={{ width:10, height:10, borderRadius:2, background:c, display:"inline-block" }} />
            {l}
          </span>
        ))}
      </div>
    </Card>
  );
};

// ── Main page ─────────────────────────────────────────────────────────
const RANGES = ["7D","30D","3M","6M","1Y"];

const Analytics = () => {
  const [range, setRange] = useState("3M");
  // Inner toggle for revenue chart — synced with top-level range
  const [revView, setRevView] = useState("Monthly");

  const handleRangeChange = (r) => {
    setRange(r);
    setRevView(["7D","30D"].includes(r) ? "Weekly" : "Monthly");
  };

  const period = revView === "Monthly" ? "monthly" : "weekly";
  const { data, isLoading, isError } = useAnalytics(period);

  return (
    <PageWrapper>
      <div className="w-full max-w-7xl mx-auto pt-4 pb-16 flex flex-col gap-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-slate-100">Analytics & Reports</h1>
            <p className="text-base text-gray-400 mt-0.5">Clinic performance overview</p>
          </div>

          {/* Date range filter */}
          <div className="flex gap-1.5 p-1 bg-gray-100 dark:bg-slate-700 rounded-xl">
            {RANGES.map(r => (
              <button
                key={r}
                onClick={() => handleRangeChange(r)}
                className="px-3 py-1.5 text-base font-medium rounded-lg cursor-pointer transition-all"
                style={{
                  background: range === r ? TEAL : "transparent",
                  color:      range === r ? "#fff" : "#6b7280",
                  border:     "none",
                }}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* KPI summary cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard label="Total revenue"            value="₹24.8L"  delta={14} positive />
          <KpiCard label="Total appointments"       value="1,248"   delta={8}  positive />
          <KpiCard label="Avg revenue per patient"  value="₹2,850"  delta={6}  positive />
          <KpiCard label="Show-up rate"             value="74%"     delta={5}  positive />
        </div>

        {/* Chart 1 — Revenue over time */}
        <RevenueChart
          data={data?.revenue}
          view={revView}
          onViewChange={setRevView}
          isLoading={isLoading}
          isError={isError}
        />

        {/* Charts 2 + 3 — Revenue by treatment + Retention */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RevByTreatmentChart
            data={data?.revByTreatment}
            isLoading={isLoading}
            isError={isError}
          />
          <RetentionChart
            data={data?.retention}
            isLoading={isLoading}
            isError={isError}
          />
        </div>

        {/* Chart 4 — Busiest days & hours */}
        <BusiestTimesCard
          data={data?.busySlots}
          isLoading={isLoading}
          isError={isError}
        />

        {/* Chart 5 — Top 5 treatments */}
        <Top5Card
          data={data?.topTreatments}
          isLoading={isLoading}
          isError={isError}
        />

        {/* Chart 6 — Seasonal trends */}
        <SeasonalChart
          data={data?.seasonal}
          isLoading={isLoading}
          isError={isError}
        />

        {/* Chart 7 — Show-up rate before vs after reminders */}
        <ShowUpChart />

      </div>
    </PageWrapper>
  );
};

export default Analytics;
