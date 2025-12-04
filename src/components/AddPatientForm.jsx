import React from "react";
import { formatDateWithDay } from "../utils/formatDateWithDay";

const AddPatientForm = ({message, handleSubmit, formdata, setForm}) => {

  const handleChange = (e) => {
    setForm({ ...formdata, [e.target.name]: e.target.value });
  };

// className="bg-white shadow-md rounded-2xl p-6 w-full max-w-7xl mx-auto mt-10"
  return (
  <div>
        {/* <h2 className="text-2xl font-bold text-textdark mb-6 text-center">
        Add New Patient
        </h2> */}

    <form className="space-y-5" onSubmit={handleSubmit}>
      {/* Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div>
                <label className="block text-gray-700 font-medium">Name</label>
                <input
                type="text"
                name="name"
                value={formdata.name}
                onChange={handleChange}
                required
                className="w-full mt-2 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-secondary1 focus:outline-none"
                />
           </div>

            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                  type="text"
                  name="email"
                  value={formdata.email}
                  onChange={handleChange}
                  required
                  className="w-full mt-2 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-secondary1 focus:outline-none"
              />
            </div>
            {/* <div>
                <label className="block text-gray-700 font-medium">Age</label>
                <input
                    type="number"
                    name="age"
                    value={formdata.age}
                    onChange={handleChange}
                    required
                    className="w-full mt-2 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-secondary1 focus:outline-none"
                />
            </div> */}
        </div>

      {/* Age & Gender in a row (on md+) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* <div>
            <label className="block text-gray-700 font-medium">Gender</label>
            <select
                name="gender"
                value={formdata.gender}
                onChange={handleChange}
                required
                className="w-full mt-2 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-secondary1 focus:outline-none"
            >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </select>
            </div> */}

            <div>
              <label className="block text-gray-700 font-medium">Phone</label>
              <input
                  type="string"
                  name="phone"
                  value={formdata.phone}
                  onChange={handleChange}
                  required
                  className="w-full mt-2 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-secondary1 focus:outline-none"
              />
            </div>

            <div>
                <label className="block text-gray-700 font-medium">
                    Appointment Date
                </label>
                <input
                    type="date"
                    name="appointment_date"
                    value={formdata.appointment_date}
                    onChange={handleChange}
                    required
                    className="w-full mt-2 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-secondary1 focus:outline-none"
                />
                <p className="mt-1 text-gray-600">
                    {formdata.appointment_date && `Selected: ${formatDateWithDay(formdata.appointment_date)}`}
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
                value={formdata.treatment}
                onChange={handleChange}
                required
                className="w-full mt-2 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-secondary1 focus:outline-none"
            />
            </div>
        </div>

        {/* Submit */}
        {/* <div className="md:col-span-2 flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-secondary1 text-white font-bold rounded-xl hover:bg-secondary1/90 transition-all cursor-pointer"
          >
            {loading ? "Adding..." : "Add Patient"}
          </button>
        </div> */}
    </form>

            {message && (
            <p className="mt-4 text-center text-sm font-medium">{message}</p>
            )}
    </div>

  );
};

export default AddPatientForm;
