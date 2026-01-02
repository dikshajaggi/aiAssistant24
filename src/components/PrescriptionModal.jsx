import React, { useState } from "react";
import moment from "moment";
import { Plus, Trash2, X } from "lucide-react";


const DentalPrescriptionForm = ({ patient }) => {
  const [diagnosis, setDiagnosis] = useState("");
  const [advice, setAdvice] = useState("");
  const [medicines, setMedicines] = useState([
    { medicine_name: "", dosage: "", frequency: "", duration: "" },
  ]);
  const [investigations, setInvestigations] = useState({
    opg: false,
    xray: false,
    lab: false,
  });
  const [nextVisit, setNextVisit] = useState(moment());

  const handleMedChange = (index, e) => {
    const updated = [...medicines];
    updated[index][e.target.name] = e.target.value;
    setMedicines(updated);
  };

  const addMedicine = () => {
    setMedicines([
      ...medicines,
      { medicine_name: "", dosage: "", frequency: "", duration: "" },
    ]);
  };

  const removeMedicine = (index) => {
    setMedicines(medicines.filter((_, i) => i !== index));
  };

  const handleInvestigationChange = (e) => {
    setInvestigations({ ...investigations, [e.target.name]: e.target.checked });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      patient_id: patient.id,
      diagnosis,
      advice,
      investigations,
      next_visit: nextVisit.toISOString(),
      medicines,
    });
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white p-4 sm:p-6 rounded-2xl shadow-md space-y-6">
      {/* Header */}
      <h2 className="text-2xl font-bold text-secondary1 text-center">
        Create Dental Prescription
      </h2>

      {/* Patient Details (read-only) */}
      <div className="bg-primary1/10 p-3 rounded-xl text-sm">
        <p className="font-semibold">Patient: {patient.name}</p>
        <p>Phone: {patient.phone}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Diagnosis */}
        <div>
          <label className="block font-medium text-gray-700">Diagnosis / Findings</label>
          <textarea
            name="diagnosis"
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            placeholder="Enter diagnosis details (e.g. Dental abscess, swelling, pain...)"
            className="w-full mt-2 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-secondary1 focus:outline-none"
            required
            rows={3}
          />
        </div>

        {/* Medicines Section */}
        <div>
          <label className="block font-medium text-gray-700">Medicines</label>
          {medicines.map((med, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-center gap-2 bg-gray-50 p-3 mt-2 rounded-xl border"
            >
              <input
                type="text"
                name="medicine_name"
                value={med.medicine_name}
                onChange={(e) => handleMedChange(index, e)}
                placeholder="Medicine Name"
                className="w-full sm:w-2/6 px-3 py-2 border rounded-lg focus:outline-none"
                required
              />
              <input
                type="text"
                name="dosage"
                value={med.dosage}
                onChange={(e) => handleMedChange(index, e)}
                placeholder="Dosage"
                className="w-full sm:w-1/6 px-3 py-2 border rounded-lg focus:outline-none"
                required
              />
              <input
                type="text"
                name="frequency"
                value={med.frequency}
                onChange={(e) => handleMedChange(index, e)}
                placeholder="Frequency"
                className="w-full sm:w-2/6 px-3 py-2 border rounded-lg focus:outline-none"
                required
              />
              <input
                type="text"
                name="duration"
                value={med.duration}
                onChange={(e) => handleMedChange(index, e)}
                placeholder="Duration"
                className="w-full sm:w-1/6 px-3 py-2 border rounded-lg focus:outline-none"
                required
              />

              {/* Delete Button */}
              <button
                type="button"
                onClick={() => removeMedicine(index)}
                className="cursor-pointer text-red-500 hover:opacity-80"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}

          {/* Add medicine */}
          <button
            type="button"
            onClick={addMedicine}
            className="mt-3 flex items-center gap-2 bg-secondary1 text-white px-3 py-2 rounded-lg text-xs hover:opacity-90 cursor-pointer"
          >
            <Plus size={14} /> Add Medicine
          </button>
        </div>

        {/* Investigations */}
        <div>
          <label className="block font-medium text-gray-700">Investigations</label>
          <div className="flex flex-wrap gap-4 mt-2 text-sm">
            <label className="flex items-center gap-1 cursor-pointer">
              <input type="checkbox" name="opg" checked={investigations.opg} onChange={handleInvestigationChange} />
              OPG
            </label>
            <label className="flex items-center gap-1 cursor-pointer">
              <input type="checkbox" name="xray" checked={investigations.xray} onChange={handleInvestigationChange} />
              X-Ray
            </label>
            <label className="flex items-center gap-1 cursor-pointer">
              <input type="checkbox" name="lab" checked={investigations.lab} onChange={handleInvestigationChange} />
              Lab Tests
            </label>
          </div>
        </div>

        {/* Advice */}
        <div>
          <label className="block font-medium text-gray-700">Advice / Instructions</label>
          <textarea
            name="advice"
            value={advice}
            onChange={(e) => setAdvice(e.target.value)}
            placeholder="Enter advice (e.g. maintain oral hygiene, rinse twice daily...)"
            className="w-full mt-2 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-secondary1 focus:outline-none"
            required
            rows={3}
          />
        </div>

        {/* Next Visit */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium text-gray-600">Next Visit</label>
            <input
              type="datetime-local"
              value={nextVisit.format("YYYY-MM-DDTHH:mm")}
              onChange={(e) => setNextVisit(moment(e.target.value))}
              className="w-full mt-1 px-3 py-2 border rounded-xl focus:outline-none cursor-pointer"
              required
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-primary1 text-white py-2 rounded-xl font-medium hover:opacity-90 cursor-pointer"
        >
          Generate Prescription
        </button>
      </form>
    </div>
  );
};


const PrescriptionModal = ({ isOpen, onClose, patient }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed w-full inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-xl p-5 relative max-h-[90vh] overflow-y-auto">
        
        <button onClick={onClose} className="absolute top-4 right-4 cursor-pointer text-gray-500 hover:text-gray-800">
          <X size={20} />
        </button>

        <DentalPrescriptionForm patient={patient} />
      </div>
    </div>
  );
};

export default PrescriptionModal;
