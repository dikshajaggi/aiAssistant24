import { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import { editPatientData } from "../../apis";
import { toast } from "react-toastify";

const inputCls =
  "w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary1";

const Field = ({ label, className = "", children }) => (
  <div className={className}>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    {children}
  </div>
);

export default function EditPatient({ isOpen, onClose, patient, onSave }) {
  const [form, setForm] = useState({
    name:        patient?.name        || "",
    email:       patient?.email       || "",
    phone:       patient?.phone       || "",
    age:         patient?.age         || "",
    gender:      patient?.gender      || "",
    treatment:   patient?.treatment   || "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => { if (e.key === "Escape" && !loading) onClose(); };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, loading]);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setLoading(true);
    try {
      await editPatientData(patient.id, form);
      toast.success("Patient updated successfully");
      onSave();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "Failed to update patient");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Edit Patient</h2>
            <p className="text-sm text-gray-400 mt-0.5">{patient?.name}</p>
          </div>
          <button
            onClick={onClose}
            disabled={loading}
            className="text-gray-400 hover:text-gray-600 transition cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <form id="edit-patient-form" onSubmit={handleSubmit} className="px-6 py-5 space-y-4">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Full Name" className="sm:col-span-2">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Patient name"
                className={inputCls}
              />
            </Field>

            <Field label="Email" className="sm:col-span-2">
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="patient@email.com"
                className={inputCls}
              />
            </Field>

            <Field label="Phone">
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className={inputCls}
              />
            </Field>

            <Field label="Age">
              <input
                type="number"
                name="age"
                value={form.age}
                onChange={handleChange}
                min="0"
                placeholder="e.g. 32"
                className={inputCls}
              />
            </Field>

            <Field label="Gender">
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className={inputCls}
              >
                <option value="">Select…</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </Field>

            <Field label="Treatment">
              <input
                name="treatment"
                value={form.treatment}
                onChange={handleChange}
                placeholder="e.g. Root Canal"
                className={inputCls}
              />
            </Field>
          </div>
        </form>

        {/* Footer */}
        <div className="px-6 pb-5 pt-4 border-t border-gray-100 flex flex-col sm:flex-row justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="edit-patient-form"
            disabled={loading}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition disabled:opacity-50 cursor-pointer"
          >
            {loading ? <><Loader2 size={14} className="animate-spin" /> Saving…</> : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
