// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { LogOut, Settings, User } from "lucide-react";
// import Avatar from "react-avatar";
// import logo from "/assets/smilelytics.png";

// const DashboardHeader = () => {
//   const [open, setOpen] = useState(false);

//   const user = {
//     name: "Admin user ",
//     email: "jaggisarthak4@gmail.com",
//     avatarUrl: "", // add image URL if available
//   };

//   return (
//     <header className="bg-neutral fixed w-full top-0 z-50 uppercase font-semibold">
//       <div className="mx-auto px-4 md:px-6 flex justify-between items-center py-3">
//         {/* Logo */}
//         <Link to="/">
//           <div className="flex items-center gap-2 font-semibold text-secondary1 text-lg md:text-xl cursor-pointer capitalize font-poppins">
//             <img
//               src={logo}
//               alt="SmileLytics.AI-logo"
//               loading="lazy"
//               className="h-12 md:h-14 object-contain"
//             />
//             <span>SmileLytics.AI</span>
//           </div>
//         </Link>

//         {/* Avatar Dropdown */}
//         <div className="relative"
//           // onMouseEnter={() => setOpen(true)} ---> on hover
//         >
//           <button onClick={() => setOpen(!open)} className="focus:outline-none">
//             <Avatar
//               name={user.name}
//               src={user.avatarUrl}
//               size="40"
//               round={true}
//               className="shadow-md cursor-pointer hover:scale-105 transition"
//               color="#FF6B6B"
//             />
//           </button>

//           {/* Dropdown Menu */}
//           {open && (
//             <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 animate-fade-in">
//               <div className="px-4 py-3">
//                 <p className="text-sm font-semibold">{user.name}</p>
//                 <p className="text-xs text-gray-500 lowercase">{user.email}</p>
//               </div>
//               {/* <Link
//                 to="/profile"
//                 className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
//               >
//                 <User size={18} />
//                 My Profile
//               </Link>
//               <Link
//                 to="/settings"
//                 className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
//               >
//                 <Settings size={18} />
//                 Settings
//               </Link> */}
//               <button
//                 onClick={() => {
//                   // handle logout
//                 }}
//                 className="cursor-pointer flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition w-full text-left"
//               >
//                 <LogOut size={18} />
//                 Logout
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default DashboardHeader;


import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Sun, Moon } from "lucide-react"
import ExpandableSearch from './common/ExpandableSearch'
import { MainContext } from '@/context/MainContext'

const THEME_KEY = 'smileLytics.theme';

const DashboardHeader = () => {
  const { logout, signedUp } = useContext(MainContext)
  const navigate = useNavigate()
  const [dateTime, setDateTime] = useState(new Date());
  const [isDarkMode, setIsDarkMode] = useState(
    () => localStorage.getItem(THEME_KEY) === 'dark'
  );
  const [greeting, setGreeting] = useState("");

  const displayName = signedUp?.email
    ? "Dr. " + signedUp.email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, c => c.toUpperCase())
    : "Doctor";
  const avatarInitials = signedUp?.email ? signedUp.email[0].toUpperCase() : "U";

  // Update date & time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Update greeting whenever displayName or time changes
  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) setGreeting(`Good Morning, ${displayName}`);
      else if (hour >= 12 && hour < 16) setGreeting(`Good Afternoon, ${displayName}`);
      else setGreeting(`Good Evening, ${displayName}`);
    };
    updateGreeting();
    const interval = setInterval(updateGreeting, 60 * 1000);
    return () => clearInterval(interval);
  }, [displayName]);

  const formattedDate = dateTime.toLocaleDateString("en-GB"); // DD/MM/YYYY
  const formattedTime = dateTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const toggleDarkMode = () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem(THEME_KEY, next ? 'dark' : 'light');
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 shadow-sm">
      <header className="w-full h-14 flex items-center justify-between px-4 md:px-8 bg-white dark:bg-slate-900">
        <div className="w-[120px] sm:w-[200px] md:hidden"></div> {/* placeholder to balance layout */}
        
        <div className="hidden sm:block text-sm sm:text-base md:text-lg font-medium text-gray-700 dark:text-gray-200">
          {greeting}
        </div>

        {/* Center: Date & Time */}
        <div className="hidden lg:flex items-center gap-2 text-sm font-semibold text-gray-600">
          <span>{formattedDate}</span>
          <span>|</span>
          <span>{formattedTime}</span>
        </div>

        {/* Right: Icons + User */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <ExpandableSearch />

          {/* Dark / Light mode toggle */}
          <button
            onClick={toggleDarkMode}
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:text-gray-800 hover:bg-gray-100 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          >
            {isDarkMode
              ? <Sun size={17} />
              : <Moon size={17} />
            }
          </button>

          {/* User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 cursor-pointer">
              <Avatar>
                <AvatarImage src="/user.jpg" />
                <AvatarFallback>{avatarInitials}</AvatarFallback>
              </Avatar>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-sm font-medium">{displayName}</span>
                <span className="text-xs text-gray-400">{signedUp?.email ?? ""}</span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => navigate("/dashboard/profile")}
              >
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600 cursor-pointer"
                onClick={() => { logout(); navigate("/login"); }}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </div>
  )
}

export default DashboardHeader;
