// src/layouts/AuthLayout.jsx
import { Link } from "react-router-dom";
import logo from "../assets/smilelytics.png"

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Logo */}
      <div className="p-2">
        <Link to="/">
          <div className="text-2xl flex font-bold text-secondary cursor-pointer capitalize items-center">
            <img src = {logo} alt="SmileLytics-logo" className="h-20"/>
            SmileLytics
          </div>
        </Link>
      </div>

      {/* Page Content */}
      <div className="flex-1 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
