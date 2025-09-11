import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Users,
  Calendar,
  BarChart3,
  Settings,
  HelpCircle,
  LogOut,
  Users2,
} from "lucide-react";
import logo from "/assets/smilelytics.png"


const mainNavItems = [
  { path: "/dashboard", label: "Dashboard", icon: <Home size={20} /> },
  { path: "/dashboard/patients", label: "Tasks", icon: <Users size={20} /> },
  { path: "/dashboard/appointments", label: "Calendar", icon: <Calendar size={20} /> },
  { path: "/dashboard/analytics", label: "Analytics", icon: <BarChart3 size={20} /> },
];

// const generalNavItems = [
//   { path: "/dashboard/settings", label: "Settings", icon: <Settings size={20} /> },
//   { path: "/dashboard/help", label: "Help", icon: <HelpCircle size={20} /> },
//   { path: "/logout", label: "Logout", icon: <LogOut size={20} /> },
// ];

const Sidebar = () => {
  const { pathname } = useLocation();

  return (
    <div className="fixed h-screen flex flex-col w-64 bg-neutral shadow-sm rounded-2xl">
      {/* Logo */}
      <div className="flex items-center gap-2 px-6 py-4">
       <div className="text-lg md:text-xl flex font-[600] text-secondary cursor-pointer capitalize items-center font-poppins">
          <Link to="/" className="flex justify-center items-center"> 
            <img src = {logo} loading="lazy" alt="SmileLytics.AI-logo" className="h-12 md:h-14 mr-2"/>
            SmileLytics.AI
          </Link>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-6">
        <ul className="space-y-1">
          {mainNavItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors ${
                    isActive
                      ? "bg-secondary !text-white"
                      : "text-gray-700 hover:bg-secondary/20"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Divider */}
        {/* <div className="border-t my-6"></div>

        <ul className="space-y-1">
          {generalNavItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors ${
                    isActive
                      ? "bg-secondary text-white"
                      : "text-gray-700 hover:bg-green-100"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul> */}
      </nav>
    </div>
  );
};

export default Sidebar;
