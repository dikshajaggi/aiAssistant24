import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Users, Calendar, BarChart3 } from "lucide-react";

const navItems = [
  { path: "/dashboard", label: "Dashboard", icon: <Home size={20} /> },
  { path: "/dashboard/patients", label: "Patients", icon: <Users size={20} /> },
  { path: "/dashboard/appointments", label: "Appointments", icon: <Calendar size={20} /> },
  { path: "/dashboard/analytics", label: "Analytics", icon: <BarChart3 size={20} /> },
];

const Sidebar = () => {
  const { pathname } = useLocation();

  return (
    <div className="fixed h-screen bg-neutral z-50 flex flex-col transition-all duration-300 w-20">
      {/* Nav Items */}
      <nav className="flex flex-col gap-2 p-4">
        {navItems.map((item) => {
          const isActive = pathname === item.path;

          return (
            <div key={item.path} className="relative group">
              <Link
                to={item.path}
                className={`flex items-center justify-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors ${
                  isActive
                    ? "bg-primary !text-white"
                    : "text-gray-700 hover:bg-primary/20"
                }`}
              >
                <div
                  className={`transition-transform duration-200 ${
                    isActive ? "scale-125" : "scale-100"
                  }`}
                >
                  {item.icon}
                </div>
              </Link>

              {/* Tooltip when collapsed */}
              <span className="absolute left-14 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                {item.label}
              </span>
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
