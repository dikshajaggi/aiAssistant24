import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { dashboardData } from "../apis";

// Clinical palette — source of truth is @theme in index.css
const CHART_COLORS = {
  bar: "#1D9E75",
  pie: ["#378ADD", "#1D9E75", "#EF9F27"],
  grid: "#E5E7EB",
  axis: "#6B7280",
  line: "#EBB813",
};

const EmptyChart = ({ message }) => (
  <div className="flex items-center justify-center h-[300px] text-gray-400 text-sm">
    {message}
  </div>
);

const ChartsAnalytics = () => {
  const [charts, setCharts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hiddenTreatments, setHiddenTreatments] = useState({});

  useEffect(() => {
    const load = async () => {
      try {
        const res = await dashboardData();
        setCharts(res.data?.charts ?? null);
      } catch (err) {
        console.error("ChartsAnalytics load error:", err);
        setError("Failed to load chart data.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handlePieLegendClick = (entry) => {
    setHiddenTreatments((prev) => ({ ...prev, [entry.value]: !prev[entry.value] }));
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6 p-6 w-full">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100 h-[370px] animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
            <div className="h-[300px] bg-gray-100 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-500 text-sm">{error}</div>
    );
  }

  const visitsPerMonth = charts?.visits_per_month ?? [];
  const revenuePerMonth = charts?.revenue_per_month ?? [];
  const topTreatments = charts?.top_treatments ?? [];

  return (
    <div className="p-6 min-h-screen w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Visits per Month
          </h2>
          {visitsPerMonth.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={visitsPerMonth}>
                <CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="3 3" />
                <XAxis dataKey="month" stroke={CHART_COLORS.axis} />
                <YAxis stroke={CHART_COLORS.axis} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="visits"
                  stroke={CHART_COLORS.line}
                  strokeWidth={3}
                  dot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <EmptyChart message="No visits data available" />
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Revenue per Month
          </h2>
          {revenuePerMonth.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenuePerMonth}>
                <CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="3 3" />
                <XAxis dataKey="month" stroke={CHART_COLORS.axis} />
                <YAxis
                  stroke={CHART_COLORS.axis}
                  tickFormatter={(v) => `₹${v}`}
                />
                <Tooltip
                  formatter={(value) => [`₹${value.toLocaleString("en-IN")}`, "Revenue"]}
                />
                <Bar dataKey="revenue" fill={CHART_COLORS.bar} radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <EmptyChart message="No revenue data available" />
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Top Treatments
          </h2>
          {topTreatments.length > 0 ? (
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={topTreatments}
                  dataKey="count"
                  nameKey="treatment"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ name, percent }) =>
                    hiddenTreatments[name] ? "" : `${name} (${(percent * 100).toFixed(0)}%)`
                  }
                >
                  {topTreatments.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={CHART_COLORS.pie[index % CHART_COLORS.pie.length]}
                      fillOpacity={hiddenTreatments[entry.treatment] ? 0 : 1}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend
                  onClick={handlePieLegendClick}
                  formatter={(value) => (
                    <span
                      style={{
                        color: hiddenTreatments[value] ? "#9CA3AF" : "#374151",
                        cursor: "pointer",
                      }}
                    >
                      {value}
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <EmptyChart message="No treatment data available" />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChartsAnalytics;
