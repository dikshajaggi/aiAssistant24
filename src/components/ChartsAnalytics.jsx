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
  ResponsiveContainer
} from "recharts";
// import axios from "axios";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const ChartsAnalytics = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // axios.get("/dashboard").then((res) => {
    //   setData(res.data);
    // });
    setData({
      "visitsPerMonth": [
        { "month": "Jan", "visits": 120 },
        { "month": "Feb", "visits": 90 }
      ],
      "revenuePerMonth": [
        { "month": "Jan", "revenue": 30000 },
        { "month": "Feb", "revenue": 45000 }
      ],
      "topTreatments": [
        { "treatment": "Root Canal", "count": 40 },
        { "treatment": "Whitening", "count": 25 }
      ],
      "patientsGrowth": [
        { "month": "Jan", "newPatients": 15 },
        { "month": "Feb", "newPatients": 22 }
      ]
    });
  }, []);

  if (!data)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Loading dashboard...</p>
      </div>
    );

  return (
    <div className="p-6 min-h-screen w-full">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Clinic Dashboard
      </h1>

      {/* Grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
        {/* Visits per Month */}
        <div className="bg-white rounded-2xl shadow p-4">
          <h2 className="text-lg font-semibold mb-3 text-gray-700">
            Visits per Month
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.visitsPerMonth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="visits"
                stroke="#0088FE"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue per Month */}
        <div className="bg-white rounded-2xl shadow p-4">
          <h2 className="text-lg font-semibold mb-3 text-gray-700">
            Revenue per Month
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.revenuePerMonth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="revenue"
                fill="#00C49F"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Treatments */}
        <div className="bg-white rounded-2xl shadow p-4">
          <h2 className="text-lg font-semibold mb-3 text-gray-700">
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
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Patients Growth */}
        <div className="bg-white rounded-2xl shadow p-4">
          <h2 className="text-lg font-semibold mb-3 text-gray-700">
            Patients Growth
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.patientsGrowth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="newPatients"
                stroke="#FF8042"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}


export default ChartsAnalytics