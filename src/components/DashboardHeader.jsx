import React from 'react'
import { Link } from 'react-router-dom';
import logo from "/assets/smilelytics.png";


const DashboardHeader = () => {

  return (
    <header className="bg-neutral fixed w-full top-0 z-50 uppercase font-semibold">
      <div className="mx-auto px-6 flex justify-between items-center py-3">
        <div className="w-full flex items-center justify-between">
          {/* user dropdown to logout */}
           <Link to="/">
                <div className="flex items-center gap-2 font-bold text-secondary text-xl md:text-2xl cursor-pointer capitalize font-poppins">
                <img src={logo} alt="SmileLytics.AI-logo" loading="lazy" className="h-12 md:h-14 object-contain" />
                <span>SmileLytics.AI</span>
                </div>
            </Link>
            <Link
                to="/login"
                className="hover:text-secondary transition"
            >
                Login
            </Link>
        </div>
      </div>
    </header>
  )
}

export default DashboardHeader;
