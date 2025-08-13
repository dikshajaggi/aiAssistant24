// src/layouts/AuthLayout.jsx
import { Link } from "react-router-dom";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Logo */}
      <div className="p-6">
        <Link to="/">
        <div className="text-2xl font-bold text-secondary cursor-pointer">
          DentalAI
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
