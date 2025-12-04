import React from "react";
import { Calendar, Clock, User, FileText, BriefcaseMedical } from "lucide-react";

const ScheduleAppointment = ({formdata, handleChange}) => {

  //bg-white shadow-md rounded-2xl p-6 w-full max-w-7xl mx-auto mt-10
  return (
    <div className="">
      {/* <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
        Schedule New Appointment
      </h3> */}

      <form
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
            value={formdata.name}
            onChange={handleChange}
            required
            placeholder="Enter patient name"
            className="p-3 border rounded-lg focus:ring-2 focus:ring-secondary1 focus:outline-none"
          />
        </div>

        {/* Doctor */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-2 flex items-center gap-2">
            <BriefcaseMedical className="w-4 h-4 text-gray-500" /> Cause of concern
          </label>
           <input
            type="text"
            name="treatment"
            value={formdata.treatment}
            onChange={handleChange}
            required
            placeholder="Enter cause of concern"
            className="p-3 border rounded-lg focus:ring-2 focus:ring-secondary1 focus:outline-none"
          />
        </div>

        {/* Date */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-2 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-500" /> Date
          </label>
          <input
            type="date"
            name="date"
            value={formdata.date}
            onChange={handleChange}
            required
            className="p-3 border rounded-lg focus:ring-2 focus:ring-secondary1 focus:outline-none"
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
            value={formdata.time}
            onChange={handleChange}
            required
            className="p-3 border rounded-lg focus:ring-2 focus:ring-secondary1 focus:outline-none"
          />
        </div>

        {/* Notes */}
        <div className="md:col-span-2 flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-2 flex items-center gap-2">
            <FileText className="w-4 h-4 text-gray-500" /> Notes
          </label>
          <textarea
            name="notes"
            value={formdata.notes}
            onChange={handleChange}
            placeholder="Add notes (optional)"
            rows={3}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-secondary1 focus:outline-none"
          ></textarea>
        </div>

        {/* Submit Button */}
        {/* <div className="md:col-span-2 flex justify-center">
          <button
            className="px-6 py-3 bg-secondary1 text-white font-semibold cursor-pointer rounded-xl transition-all"
          >
            Schedule Appointment
          </button>
        </div> */}
      </form>
    </div>
  );
};

export default ScheduleAppointment;
