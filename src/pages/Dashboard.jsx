import React, { useEffect, useState } from "react";
import PageWrapper from "./PageWrapper";
import SummaryCards from "../components/SummaryCards";
import QuickActions from "../components/QuickActions";
import DateTimeDisplay from "../components/DateTimeDisplay";
import DentalScheduleCard from "../components/DentalScheduleCard";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const COLORS = [
  "#390080", // violet
  "#EBB813", // yellow
  "#34F005", // green
  "#E65B10", // orange
  "#FF009D", // bright pink
  "#08805C", // dark green
];

const Dashboard = () => {
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

  return (
    <PageWrapper>
      <div className="w-full mx-auto flex flex-col h-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center p-4 rounded-xl bg-neutral shadow-md mb-3">
          <h2 className="text-lg md:text-xl font-extrabold text-textdark">
            Welcome Dr. Aakash Gupta
          </h2>
          <DateTimeDisplay />
        </div>

        {/* Body */}
        <div className="flex flex-col p-4 rounded-xl bg-neutral shadow-md h-full">
          <SummaryCards />

          {/* Main Content - 2 Columns on md+, stacked on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Left Column */}
            <div className="flex flex-col gap-6 min-w-0">
              {data && (
                <div className="w-full bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
                  <h2 className="text-lg font-semibold mb-4 text-gray-700">
                    Revenue per Month
                  </h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data.revenuePerMonth}>
                      <CartesianGrid stroke="#E5E7EB" strokeDasharray="3 3" />
                      <XAxis dataKey="month" stroke="#6B7280" />
                      <YAxis stroke="#6B7280" />
                      <Tooltip />
                      <Bar
                        dataKey="revenue"
                        fill="#FF009D"
                        radius={[5, 5, 0, 0]}
                        barSize={30} // responsive bar thickness
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}

              <DentalScheduleCard />
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-6 min-w-0">
              <QuickActions />

              {data && (
                <div className="w-full bg-[#fafafa] rounded-2xl shadow-sm p-5 border border-gray-100">
                  <h2 className="text-lg font-semibold mb-4 text-gray-700">
                    Top Treatments
                  </h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={data?.topTreatments}
                        dataKey="count"
                        nameKey="treatment"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label
                      >
                        {data?.topTreatments.map((_, index) => (
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
              )}
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Dashboard;
