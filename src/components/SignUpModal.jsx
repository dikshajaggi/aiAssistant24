import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MainContext } from "../context/MainContext";

export default function Modal({ isOpen, toggle, title, children }) {
  
  const navigate = useNavigate()
  const {isSubscribed} = useContext(MainContext)

  const openDashboard = () => {
    if(isSubscribed) navigate("/dashboard")
    else navigate("/pricing/payment")
  }

  if (!isOpen) return null; // Don't render if closed

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black opacity-80"
        onClick={toggle}
      />

      {/* Modal Content */}
      <div className="relative bg-neutral rounded-lg shadow-lg w-full max-w-md p-6 z-10">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-500 pb-3">
          <h2 className="text-lg font-bold">{title}</h2>
          <button
            onClick={toggle}
            className="cursor-pointer text-gray-500 hover:text-gray-700 text-xl font-bold"
          >
            &times;
          </button>
        </div>

        {/* Body */}
        <div className="mt-4">{children}</div>

        {/* Footer */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={toggle}
            className="cursor-pointer px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button className="cursor-pointer px-4 py-2 bg-primary text-white rounded hover:bg-secondary" onClick={openDashboard}>
            Start Building
          </button>
        </div>
      </div>
    </div>
  );
}
