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

const COLORS = [
  "#390080", // violet
  "#EBB813", // yellow
  "#34F005", //pink
  "#E65B10", //orange
  "#FF009D", // bright
  "#08805C", // deep/dark green
];


const ChartsAnalytics = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    setData({
      visitsPerMonth: [
        { month: "Jan", visits: 120 },
        { month: "Feb", visits: 90 },
        { month: "Mar", visits: 150 },
      ],
      revenuePerMonth: [
        { month: "Jan", revenue: 30000 },
        { month: "Feb", revenue: 45000 },
        { month: "Mar", revenue: 50000 },
      ],
      topTreatments: [
        { treatment: "Root Canal", count: 40 },
        { treatment: "Whitening", count: 25 },
        { treatment: "Implants", count: 18 },
      ],
      patientsGrowth: [
        { month: "Jan", newPatients: 15 },
        { month: "Feb", newPatients: 22 },
        { month: "Mar", newPatients: 28 },
      ],
    });
  }, []);

  if (!data)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-gray-500">Loading dashboard...</p>
      </div>
    );

  return (
    <div className="p-6 min-h-screen w-full">

      {/* Grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
        {/* Visits per Month */}
        <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Visits per Month
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.visitsPerMonth}>
              <CartesianGrid stroke="#E5E7EB" strokeDasharray="3 3" />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="visits"
                stroke="#EBB813"
                strokeWidth={3}
                dot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue per Month */}
        <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Revenue per Month
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.revenuePerMonth}>
              <CartesianGrid stroke="#E5E7EB" strokeDasharray="3 3" />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip />
              <Bar dataKey="revenue" fill="#FF009D" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Treatments */}
        <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Top Treatments
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.topTreatments}
                dataKey="count"
                nameKey="treatment"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {data.topTreatments.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Patients Growth */}
        <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Patients Growth
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.patientsGrowth}>
              <CartesianGrid stroke="#E5E7EB" strokeDasharray="3 3" />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="newPatients"
                stroke="#08805C"
                strokeWidth={3}
                dot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ChartsAnalytics;
