import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LogOut, Settings, User } from "lucide-react";
import Avatar from "react-avatar";
import logo from "/assets/smilelytics.png";

const DashboardHeader = () => {
  const [open, setOpen] = useState(false);

  const user = {
    name: "Aakash Gupta",
    email: "aakash09gupta@gmail.com",
    avatarUrl: "", // add image URL if available
  };

  return (
    <header className="bg-neutral fixed w-full top-0 z-50 uppercase font-semibold">
      <div className="mx-auto px-4 md:px-6 flex justify-between items-center py-3">
        {/* Logo */}
        <Link to="/">
          <div className="flex items-center gap-2 font-semibold text-secondary text-lg md:text-2xl cursor-pointer capitalize font-poppins">
            <img
              src={logo}
              alt="SmileLytics.AI-logo"
              loading="lazy"
              className="h-12 md:h-14 object-contain"
            />
            <span>SmileLytics.AI</span>
          </div>
        </Link>

        {/* Avatar Dropdown */}
        <div className="relative"
          // onMouseEnter={() => setOpen(true)} ---> on hover
          // onMouseLeave={() => setOpen(false)}
        >
          <button onClick={() => setOpen(!open)} className="focus:outline-none">
            <Avatar
              name={user.name}
              src={user.avatarUrl}
              size="40"
              round={true}
              className="shadow-md cursor-pointer hover:scale-105 transition"
              color="#FF6B6B"
            />
          </button>

          {/* Dropdown Menu */}
          {open && (
            <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 animate-fade-in">
              <div className="px-4 py-3">
                <p className="text-sm font-semibold">{user.name}</p>
                <p className="text-xs text-gray-500 lowercase">{user.email}</p>
              </div>
              {/* <Link
                to="/profile"
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
              >
                <User size={18} />
                My Profile
              </Link>
              <Link
                to="/settings"
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
              >
                <Settings size={18} />
                Settings
              </Link> */}
              <button
                onClick={() => {
                  // handle logout
                }}
                className="cursor-pointer flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition w-full text-left"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
