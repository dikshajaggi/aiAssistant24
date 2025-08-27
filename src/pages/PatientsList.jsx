import React, { useEffect, useState } from "react";
import { formatDateWithDay } from "../utils/formatDateWithDay";

const PatientsList = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch patients on mount
  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      setLoading(true);
    //   const token = localStorage.getItem("token");
    //   const resp = await fetch("http://localhost:8000/patients", {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   });
    //   const data = await resp.json();
      setPatients([
  {
    "name": "Aarav Mehta",
    "age": 32,
    "gender": "male",
    "appointment_date": "2025-09-05",
    "treatment": "Dental Cleaning"
  },
  {
    "name": "Priya Sharma",
    "age": 27,
    "gender": "female",
    "appointment_date": "2025-09-06",
    "treatment": "Root Canal"
  },
  {
    "name": "Rohan Gupta",
    "age": 45,
    "gender": "male",
    "appointment_date": "2025-09-07",
    "treatment": "Tooth Extraction"
  },
  {
    "name": "Simran Kaur",
    "age": 36,
    "gender": "female",
    "appointment_date": "2025-09-08",
    "treatment": "Braces Consultation"
  },
  {
    "name": "Aditya Verma",
    "age": 52,
    "gender": "male",
    "appointment_date": "2025-09-09",
    "treatment": "Dental Implant"
  }
]
);
    } catch (err) {
      console.error("Error fetching patients:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this patient?")) return;
    try {
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:8000/patients/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setPatients(patients.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Error deleting patient:", err);
    }
  };

  return (
    <div className="mt-12  w-full max-w-6xl">
      <h2 className="text-2xl font-bold text-textdark mb-6 text-center">
        Patients List
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading patients...</p>
      ) : patients.length === 0 ? (
        <p className="text-center text-gray-500">No patients found.</p>
      ) : (
        <div className="overflow-x-auto">
          {/* Desktop Table */}
          <table className="hidden md:table w-full border-collapse bg-white shadow-lg rounded-2xl overflow-hidden">
            <thead className="bg-primary text-white">
              <tr>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Age</th>
                <th className="p-4 text-left">Gender</th>
                <th className="p-4 text-left">Appointment Date</th>
                <th className="p-4 text-left">Treatment</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((p) => (
                <tr key={p.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">{p.name}</td>
                    <td className="p-4">{p.age}</td>
                    <td className="p-4 capitalize">{p.gender}</td>
                    <td className="p-4">{formatDateWithDay(p.appointment_date)}</td>
                    <td className="p-4">{p.treatment}</td>
                    <td className="p-4 flex gap-3 justify-center">
                    <button className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile Cards */}
          <div className="grid gap-4 md:hidden">
            {patients.map((p) => (
              <div
                key={p.id}
                className="bg-white shadow-md rounded-xl p-4 space-y-2"
              >
                <p>
                  <span className="font-semibold">Name:</span> {p.name}
                </p>
                <p>
                  <span className="font-semibold">Age:</span> {p.age}
                </p>
                <p>
                  <span className="font-semibold">Gender:</span>{" "}
                  {p.gender}
                </p>
                <p>
                    <span className="font-semibold">Appointment:</span>{" "}
                    {formatDateWithDay(p.appointment_date)}
                </p>
                <p>
                  <span className="font-semibold">Treatment:</span>{" "}
                  {p.treatment}
                </p>
                <div className="flex gap-3 mt-2">
                  <button className="flex-1 px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="flex-1 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientsList;
