import React, { useState } from "react";
import { Menu, X } from "lucide-react"; 
import { Link } from "react-router-dom";
import logo from "../assets/smilelytics.png";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-neutral fixed w-full top-0 z-50 uppercase font-semibold">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center py-3">
        
        {/* Logo */}
        <Link to="/">
          <div className="flex items-center gap-2 font-bold text-secondary text-xl md:text-2xl cursor-pointer capitalize">
            <img src={logo} alt="SmileLytics-logo" className="h-12 md:h-14 object-contain" />
            <span>SmileLytics</span>
          </div>
        </Link>

        {/* Desktop Menu (only from lg) */}
        <nav className="hidden lg:flex items-center gap-8">
          <Link to="/walkthrough" className="hover:text-secondary transition">Walkthrough</Link>
          <Link to="/pricing" className="hover:text-secondary transition">Pricing</Link>
          <Link
            to="/bookdemo"
            className="!text-secondary font-semibold animate-bounce"
          >
            Book a Demo
          </Link>
          <Link to="/login" className="hover:text-secondary transition">Login</Link>
          <Link
            to="/signup"
            className="px-4 py-1 rounded-lg bg-gradient-to-r from-[#0F2650] to-[#0ea5e9] !text-white font-semibold"
          >
            Sign Up
          </Link>
        </nav>

        {/* Hamburger Button */}
        <button
          className="lg:hidden text-gray-600"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile / Tablet Menu with Slide Animation */}
      <div
        className={`lg:hidden bg-neutral overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col p-4 space-y-4">
          <Link to="/walkthrough" className="hover:text-secondary transition" onClick={() => setMenuOpen(false)}>Walkthrough</Link>
          <Link to="/pricing" className="hover:text-secondary transition" onClick={() => setMenuOpen(false)}>Pricing</Link>
          <Link to="/bookdemo" className="!text-secondary font-semibold animate-bounce" onClick={() => setMenuOpen(false)}>Book a Demo</Link>
          <Link to="/login" className="hover:text-secondary transition" onClick={() => setMenuOpen(false)}>Login</Link>
          <Link to="/signup" className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#0F2650] to-[#0ea5e9] !text-white font-semibold" onClick={() => setMenuOpen(false)}>Sign Up</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
