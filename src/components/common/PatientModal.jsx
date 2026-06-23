import { X } from "lucide-react";
import React, { useState } from "react";
import AddPatientForm from "../AddPatientForm";
import { addPatients, getPatientByPhone } from "../../apis";
import { toast } from "react-toastify";
import moment from "moment";

const PatientModal = ({ isOpen, onClose, onSuccess, saveLabel, headingLabel, caption }) => {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    appointment_date: moment(),
    treatment: "",
  });

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setLoading(true);
    try {
      // Check for duplicate phone before saving
      try {
        const existing = await getPatientByPhone(form.phone);
        if (existing?.data) {
          toast.error(`A patient with phone ${form.phone} already exists.`);
          return;
        }
      } catch (dupErr) {
        // 404 means no patient found — safe to proceed
        if (dupErr.response?.status !== 404) {
          toast.error("Could not verify phone uniqueness. Please try again.");
          return;
        }
      }

      await addPatients({
        ...form,
        appointment_date: form.appointment_date
          ? form.appointment_date.toISOString()
          : null,
      });
      toast.success("Patient added successfully!");
      setForm({ name: "", email: "", phone: "", appointment_date: moment(), treatment: "" });
      onSuccess?.();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "Failed to add patient");
    } finally {
      setLoading(false);
    }
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

        <AddPatientForm handleSubmit={handleSubmit} loading={loading} formdata={form} setForm={setForm} />

        {/* footer */}
        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex items-center gap-2 border border-gray-400 text-gray-700 px-3 py-2 rounded-lg text-sm hover:bg-gray-50 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-blue-600 text-sm text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Adding..." : saveLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientModal;
