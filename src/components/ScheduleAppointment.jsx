import React, { useState } from "react";
import { Calendar, Clock, User, FileText, Stethoscope } from "lucide-react";

const ScheduleAppointment = () => {
  const [form, setForm] = useState({
    name: "",
    doctor: "",
    date: "",
    time: "",
    notes: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Scheduled Appointment:", form);
    alert("Appointment scheduled successfully ✅");
    // Here you can call API to save appointment
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-7xl mx-auto mt-10">
      <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
        Schedule New Appointment
      </h3>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Patient Name */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-2 flex items-center gap-2">
            <User className="w-4 h-4 text-gray-500" /> Patient Name
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Enter patient name"
            className="p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
          />
        </div>

        {/* Doctor */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-2 flex items-center gap-2">
            <Stethoscope className="w-4 h-4 text-gray-500" /> Doctor
          </label>
          <select
            name="doctor"
            value={form.doctor}
            onChange={handleChange}
            required
            className="p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
          >
            <option value="">Select Doctor</option>
            <option value="Dr. Sharma">Dr. Sharma</option>
            <option value="Dr. Patel">Dr. Patel</option>
            <option value="Dr. Mehta">Dr. Mehta</option>
          </select>
        </div>

        {/* Date */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-2 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-500" /> Date
          </label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
            className="p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
          />
        </div>

        {/* Time */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-2 flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-500" /> Time
          </label>
          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            required
            className="p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
          />
        </div>

        {/* Notes */}
        <div className="md:col-span-2 flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-2 flex items-center gap-2">
            <FileText className="w-4 h-4 text-gray-500" /> Notes
          </label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="Add notes (optional)"
            rows={3}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2 flex justify-center">
          <button
            className="px-6 py-3 bg-primary text-white font-semibold cursor-pointer rounded-xl transition-all"
          >
            Schedule Appointment
          </button>
        </div>
      </form>
    </div>
  );
};

export default ScheduleAppointment;
