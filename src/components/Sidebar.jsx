import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Users, Calendar, BarChart3, ChevronLeft, ChevronRight } from "lucide-react";
import logo from "/assets/smilelytics.png";

const mainNavItems = [
  { path: "/dashboard", label: "Dashboard", icon: <Home size={20} /> },
  { path: "/dashboard/patients", label: "Patients", icon: <Users size={20} /> },
  { path: "/dashboard/appointments", label: "Appointments", icon: <Calendar size={20} /> },
  { path: "/dashboard/analytics", label: "Analytics", icon: <BarChart3 size={20} /> },
];

const Sidebar = ({ collapsed, setCollapsed }) => {
  const { pathname } = useLocation();

  return (
    <div
      className={`relative h-full flex flex-col rounded-2xl bg-neutral shadow-sm
        transition-all duration-300
        ${collapsed ? "w-20 items-center" : "w-64"}
      `}
    >
      {/* Expand / Collapse Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="
          absolute top-4 
          bg-white border shadow rounded-md p-1
          transition-all duration-300
          hover:bg-gray-100
        "
        style={{
          right: collapsed ? "50%" : "1rem",
          transform: collapsed ? "translateX(50%)" : "none"
        }}
      >
        {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </button>

      {/* Logo */}
      <div
        className={`flex items-center px-4 py-6 transition-all
          ${collapsed ? "justify-center" : "justify-start"}
        `}
      >
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt="SmileLytics.AI"
            className={`transition-all duration-300 
              ${collapsed ? "h-10" : "h-12 mr-2"}
            `}
          />
          {!collapsed && (
            <span className="text-xl font-bold text-secondary">
              SmileLytics.AI
            </span>
          )}
        </Link>
      </div>

      {/* Nav Menu */}
      <nav className="flex-1 w-full px-3 py-4">
        <ul className="space-y-2">
          {mainNavItems.map((item) => {
            const isActive = pathname === item.path;

            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`
                    flex items-center px-3 py-2 rounded-lg font-medium 
                    transition-all duration-200
                    ${collapsed ? "justify-center" : "gap-3"}
                    ${
                      isActive
                        ? "bg-secondary text-white"
                        : "text-gray-700 hover:bg-secondary/20"
                    }
                  `}
                >
                  {item.icon}
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
