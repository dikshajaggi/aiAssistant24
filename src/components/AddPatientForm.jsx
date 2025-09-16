import React, { useState } from "react";
import { formatDateWithDay } from "../utils/formatDateWithDay";

const AddPatientForm = () => {
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    appointment_date: "",
    treatment: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token"); // assuming token is stored in localStorage

      const resp = await fetch("http://localhost:8000/add_patient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await resp.json();

      if (resp.ok) {
        setMessage("✅ Patient added successfully!");
        setForm({
          name: "",
          age: "",
          gender: "",
          appointment_date: "",
          treatment: "",
        });
      } else {
        setMessage("❌ Error: " + (data.detail || "Something went wrong"));
      }
    } catch (err) {
      setMessage("❌ Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };


  return (
  <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-7xl mx-auto mt-10">
        <h2 className="text-2xl font-bold text-textdark mb-6 text-center">
        Add New Patient
        </h2>

    <form className="space-y-5" onSubmit={handleSubmit}>
      {/* Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div>
                <label className="block text-gray-700 font-medium">Name</label>
                <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full mt-2 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none"
                />
           </div>

            <div>
                <label className="block text-gray-700 font-medium">Age</label>
                <input
                    type="number"
                    name="age"
                    value={form.age}
                    onChange={handleChange}
                    required
                    className="w-full mt-2 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none"
                />
            </div>
        </div>

      {/* Age & Gender in a row (on md+) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
            <label className="block text-gray-700 font-medium">Gender</label>
            <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                required
                className="w-full mt-2 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none"
            >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </select>
            </div>

            <div>
                <label className="block text-gray-700 font-medium">
                    Appointment Date
                </label>
                <input
                    type="date"
                    name="appointment_date"
                    value={form.appointment_date}
                    onChange={handleChange}
                    required
                    className="w-full mt-2 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none"
                />
                <p className="mt-1 text-gray-600">
                    {form.appointment_date && `Selected: ${formatDateWithDay(form.appointment_date)}`}
                </p>
            </div>
        </div>

      {/* Appointment Date & Treatment */}
        <div>
            <div>
            <label className="block text-gray-700 font-medium">Treatment</label>
            <input
                type="text"
                name="treatment"
                value={form.treatment}
                onChange={handleChange}
                required
                className="w-full mt-2 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none"
            />
            </div>
        </div>

        {/* Submit */}
        <div className="md:col-span-2 flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all cursor-pointer"
          >
            {loading ? "Adding..." : "Add Patient"}
          </button>
        </div>
    </form>

            {message && (
            <p className="mt-4 text-center text-sm font-medium">{message}</p>
            )}
    </div>

  );
};

export default AddPatientForm;
