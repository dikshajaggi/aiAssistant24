import React from "react";
import { MessageCircle, Mail, Clock } from "lucide-react";


// Fake Data
const appointments = [
  { id: 1, name: "Aarav Mehta", time: "10:00 AM", treatment: "Dental Cleaning", status: "scheduled" },
  { id: 2, name: "Priya Sharma", time: "11:30 AM", treatment: "Root Canal", status: "completed" },
  { id: 3, name: "Rohan Gupta", time: "2:00 PM", treatment: "Tooth Extraction", status: "cancelled" },
];

const reminders = {
  whatsapp: 8,
  email: 5,
  pending: 3,
};

const statusColors = {
  scheduled: "bg-blue-100 text-blue-600",
  completed: "bg-green-100 text-green-600",
  cancelled: "bg-red-100 text-red-600",
};

const AppointmentsAndReminders = () => {
  return (
    <div className="w-full max-w-7xl mx-auto mt-10 px-4">
      {/* Heading */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Appointments & Reminders</h2>

      {/* Reminders Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white shadow-md rounded-2xl p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-700 flex items-center justify-center gap-2">
           <MessageCircle className="w-5 h-5 text-green-600" />
           WhatsApp Reminders
          </h3>
          <p className="text-3xl font-bold text-green-600 mt-3">{reminders.whatsapp}</p>
        </div>
        <div className="bg-white shadow-md rounded-2xl p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-700 flex items-center justify-center gap-2">
            <Mail className="w-5 h-5 text-blue-600" />
            Email Reminders
          </h3>
          <p className="text-3xl font-bold text-blue-600 mt-3">{reminders.email}</p>
        </div>
        <div className="bg-white shadow-md rounded-2xl p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-700 flex items-center justify-center gap-2">
            <Clock className="w-5 h-5 text-alert" />
            Pending Reminders
          </h3>
          <p className="text-3xl font-bold text-alert mt-3">{reminders.pending}</p>
        </div>
      </div>

      {/* Today’s Appointments */}
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
        <h3 className="bg-primary text-white px-6 py-3 text-lg font-semibold">Today’s Appointments</h3>

        {/* Desktop Table */}
        <table className="hidden md:table w-full text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Time</th>
              <th className="px-6 py-3">Treatment</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => (
              <tr key={appt.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-3">{appt.name}</td>
                <td className="px-6 py-3">{appt.time}</td>
                <td className="px-6 py-3">{appt.treatment}</td>
                <td className="px-6 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[appt.status]}`}
                  >
                    {appt.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile Cards */}
        <div className="md:hidden p-4 grid gap-4">
          {appointments.map((appt) => (
            <div key={appt.id} className="bg-gray-50 shadow-md rounded-xl p-4">
              <p><span className="font-semibold">Name:</span> {appt.name}</p>
              <p><span className="font-semibold">Time:</span> {appt.time}</p>
              <p><span className="font-semibold">Treatment:</span> {appt.treatment}</p>
              <p className="mt-2">
                <span className="font-semibold">Status: </span>
                <span
                  className={`px-2 py-1 rounded-full text-sm font-medium ${statusColors[appt.status]}`}
                >
                  {appt.status}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppointmentsAndReminders;
