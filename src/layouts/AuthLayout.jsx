// src/layouts/AuthLayout.jsx
import { Link } from "react-router-dom";
import logo from "/assets/smilelytics.png"

export default function AuthLayout({ children }) {
  return (
    <div className="bg-neutral flex flex-col">
      {/* Logo */}
      <div className="p-4">
          <div className="text-lg md:text-xl flex font-[600] text-secondary1 cursor-pointer capitalize items-center font-poppins">
            <Link to="/" className="flex justify-center items-center"> 
              <img src = {logo} loading="lazy" alt="SmileLytics.AI-logo" className="h-12 md:h-14 mr-2"/>
              SmileLytics.AI
            </Link>
          </div>
      </div>

      {/* Page Content */}
      <div className="flex-1 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
