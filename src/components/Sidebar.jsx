import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, Users, Calendar, BarChart3, ChevronLeft, ChevronRight, LogOut } from "lucide-react";
import logo from "/assets/smilelytics.png";
import { MainContext } from "../context/MainContext";

const mainNavItems = [
  { path: "/dashboard", label: "Dashboard", icon: <Home size={20} /> },
  { path: "/dashboard/patients", label: "Patients", icon: <Users size={20} /> },
  { path: "/dashboard/appointments", label: "Appointments", icon: <Calendar size={20} /> },
  { path: "/dashboard/analytics", label: "Analytics", icon: <BarChart3 size={20} /> },
];

const Sidebar = ({ collapsed, setCollapsed }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { logout } = useContext(MainContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div
      className={`relative h-full flex flex-col shadow-sm
        transition-all duration-300
        ${collapsed ? "w-20 items-center" : "w-64"}
      `}
    >

      {/* Logo */}
      <div
        className={`flex items-center px-4 py-6 transition-all
          ${collapsed ? "justify-center flex-col" : "justify-between flex-row"}
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
            <span className="text-xl font-bold text-secondary1">
              SmileLytics.AI
            </span>
          )}
        </Link>
         {/* Expand / Collapse Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className={`transition-all duration-300 cursor-pointer ${collapsed ? "mt-4" : "mt-0" }`}
      >
        {collapsed ? <ChevronRight /> : <ChevronLeft />}
      </button>
      </div>

      {/* Nav Menu */}
      <nav className="flex-1 w-full px-3 py-4 flex flex-col justify-between">
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
                        ? "bg-secondary1 !text-white"
                        : "text-gray-700 hover:bg-secondary1/20"
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

        <div className="mt-4">
          <button
            onClick={handleLogout}
            className={`
              w-full flex items-center px-3 py-2 rounded-lg font-medium text-gray-700
              hover:bg-red-50 hover:text-red-600 transition-all duration-200
              ${collapsed ? "justify-center" : "gap-3"}
            `}
          >
            <LogOut size={20} />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
