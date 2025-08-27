import React, { useContext } from "react";
import { MainContext } from "../context/MainContext";

export default function DeleteModal({ isOpen, toggle, title, currentPatient, children }) {

    const {patients, setPatients} = useContext(MainContext)

    const deleteData = async () => {
        try {
        // const token = localStorage.getItem("token");
        // const res = await fetch(`http://localhost:8000/patients/${currentPatient}`, {
        //     method: "DELETE",
        //     headers: { Authorization: `Bearer ${token}` },
        // });
        // if(res.status === 200) {
                const filtered = patients.filter((p) => p.id !== currentPatient)
                setPatients(filtered);
                if (isOpen) toggle()
            // }
        } catch (err) {
        console.error("Error deleting patient:", err);
        }
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
          <button className="cursor-pointer px-4 py-2 bg-alert/90 text-white rounded hover:bg-alert" onClick={deleteData}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
