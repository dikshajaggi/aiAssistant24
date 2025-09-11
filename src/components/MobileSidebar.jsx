import React from 'react'
import { Link, useLocation } from "react-router-dom";
import { Home, Users, Calendar, BarChart3 } from "lucide-react";
import logo from "/assets/smilelytics.png"

const navItems = [
  { path: "/dashboard", label: "Dashboard", icon: <Home size={22} /> },
  { path: "/dashboard/patients", label: "Patients", icon: <Users size={22} /> },
  { path: "/dashboard/appointments", label: "Appointments", icon: <Calendar size={22} /> },
  { path: "/dashboard/analytics", label: "Analytics", icon: <BarChart3 size={22} /> },
];

const MobileSidebar = () => {
  const { pathname } = useLocation();

  return (
    <div className="fixed bottom-0 left-0 w-full bg-neutral border-t border-gray-200 z-50 flex justify-around items-center h-16 md:hidden">
      {/* Nav Items */}
      {navItems.slice(0, 2).map((item) => {
        const isActive = pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col rounded-2xl p-2 items-center justify-center gap-1 text-xs transition-colors ${
              isActive ? "bg-primary !text-white" : "text-gray-700 hover:bg-primary/20"
            }`}
          >
            <div className={`transition-transform ${isActive ? "scale-110" : ""}`}>
              {item.icon}
            </div>
            <span className="text-[10px]">{item.label}</span>
          </Link>
        );
      })}

      {/* Center Logo */}
      <Link
        to="/"
        className="flex items-center justify-center w-14 h-14 rounded-full shadow-lg "
      >
         <img src = {logo} loading="lazy" alt="SmileLytics.AI-logo" className="h-10"/>
      </Link>

      {navItems.slice(2).map((item) => {
        const isActive = pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col rounded-2xl p-2 items-center justify-center gap-1 text-xs transition-colors ${
              isActive ? "bg-primary !text-white" : "text-gray-700 hover:bg-primary/20"
            }`}
          >
            <div className={`transition-transform ${isActive ? "scale-110" : ""}`}>
              {item.icon}
            </div>
            <span className="text-[10px]">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default MobileSidebar;
