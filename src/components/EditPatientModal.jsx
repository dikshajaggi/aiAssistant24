import React, { useState, useEffect } from "react";
import { formatDateWithDay } from "../utils/formatDateWithDay";

const EditPatientModal = ({ patient, onClose, onUpdate }) => {
  console.log(onUpdate, "onUpdate")
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    appointment_date: "",
    treatment: "",
  });

  useEffect(() => {
    if (patient) {
      setForm({
        name: patient.name || "",
        age: patient.age || "",
        gender: patient.gender || "",
        appointment_date: patient.appointment_date || "",
        treatment: patient.treatment || "",
      });
    }
  }, [patient]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const token = localStorage.getItem("token");
      // const resp = await fetch(`http://localhost:8000/patients/${patient.id}`, {
      //   method: "PUT",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${token}`,
      //   },
      //   body: JSON.stringify(form),
      // });

      // const data = await resp.json();
      // if (resp.ok) {
        // onUpdate(data); // update parent list
        onClose(); // close modal
      // } else {
        // alert("Error updating patient: " + (data.detail || "Something went wrong"));
      // }
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  if (!patient) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-6 relative">
        <h2 className="text-xl font-bold mb-4 text-center">
          Edit Patient
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full mt-1 px-3 py-2 border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium">Age</label>
              <input
                type="number"
                name="age"
                value={form.age}
                onChange={handleChange}
                required
                className="w-full mt-1 px-3 py-2 border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Gender</label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                required
                className="w-full mt-1 px-3 py-2 border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium">Appointment Date</label>
              <input
                type="date"
                name="appointment_date"
                value={form.appointment_date}
                onChange={handleChange}
                required
                className="w-full mt-1 px-3 py-2 border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none"
              />
              {form.appointment_date && (
                <p className="mt-1 text-gray-600">{formatDateWithDay(form.appointment_date)}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Treatment</label>
              <input
                type="text"
                name="treatment"
                value={form.treatment}
                onChange={handleChange}
                required
                className="w-full mt-1 px-3 py-2 border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-xl hover:bg-gray-400 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-secondary/90 text-white rounded-xl hover:bg-secondary cursor-pointer"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPatientModal;
