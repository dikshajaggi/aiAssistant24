import React from 'react'

const RecentAppointments = () => {
    // Fake Data
    const appointments = [
    { id: 1, name: "Aarav Mehta", time: "10:00 AM", treatment: "Dental Cleaning", status: "scheduled" },
    { id: 2, name: "Priya Sharma", time: "11:30 AM", treatment: "Root Canal", status: "completed" },
    { id: 3, name: "Rohan Gupta", time: "2:00 PM", treatment: "Tooth Extraction", status: "cancelled" },
    ];

    const statusColors = {
    scheduled: "bg-blue-100 text-blue-600",
    completed: "bg-green-100 text-green-600",
    cancelled: "bg-red-100 text-red-600",
    };
    
  return (
    <div>
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
        <h3 className="bg-primary1 text-white px-6 py-3 text-lg font-semibold">Today’s Appointments</h3>

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
  )
}

export default RecentAppointments
