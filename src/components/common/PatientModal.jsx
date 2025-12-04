import { X } from "lucide-react";
import React, { useState } from "react";
import AddPatientForm from "../AddPatientForm";
import { addPatients } from "../../apis"

const PatientModal = ({ isOpen, onClose, saveLabel, headingLabel, caption}) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    name: "",
    // age: "",
    // gender: "",
    phone: "",
    email: "",
    appointment_date: "",
    treatment: "",
  });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {

      const resp = await addPatients(form)

      if (resp.ok) {
        setMessage("Patient added successfully!");
        setForm({
          name: "",
          email: "",
          phone: "",
          // age: "",
          // gender: "",
          appointment_date: "",
          treatment: "",
        });
      } else {
        setMessage("Error: " + (resp || "Something went wrong"));
      }
    } catch (err) {
      setMessage("Error: " + err.message);
    } finally {
      setLoading(false);
    }
     onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-999 p-4">
      <div className="bg-white/90 border border-gray-200 shadow-xl rounded-2xl w-full max-w-lg p-6 relative overflow-y-auto max-h-[90vh] transition-all">
        {/* close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition cursor-pointer"
        >
          <X size={18} />
        </button>

        {/* header */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
           {headingLabel}
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            {caption}
          </p>
        </div>

        <AddPatientForm handleSubmit={handleSubmit} loading={loading} message={message} formdata={form} setForm={setForm}/>

        {/* footer */}
        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="flex items-center gap-2 border border-gray-400 text-gray-700 px-3 py-2 rounded-lg text-sm hover:bg-gray-50 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-sm text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition font-medium cursor-pointer"
          >
            {saveLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientModal;
