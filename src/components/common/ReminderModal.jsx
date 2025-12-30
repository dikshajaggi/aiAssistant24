import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import AddPatientForm from "../AddPatientForm";
import { sendReminder } from "../../apis"
import { formatDateWithDay } from "@/utils/formatDateWithDay";
import { DateTimePicker } from "@mui/x-date-pickers";
import moment from "moment";

const SendReminderForm = ({message, handleSubmit, formdata, setForm}) => {

  const handleChange = (e) => {
    setForm({ ...formdata, [e.target.name]: e.target.value });
  };

  return (
  <div>
    <form className="space-y-5" onSubmit={handleSubmit}>
      {/* Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div>
                <label className="block text-gray-700 font-medium">Patient Name</label>
                <input
                    type="text"
                    name="patient_name"
                    value={formdata.patient_name}
                    onChange={handleChange}
                    required
                    className="w-full mt-2 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-secondary1 focus:outline-none"
                />
           </div>

            <div>
              <label className="block text-gray-700 font-medium">Doctor Name</label>
              <input
                  type="text"
                  name="doctor_name"
                  value={formdata.doctor_name}
                  onChange={handleChange}
                  required
                  className="w-full mt-2 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-secondary1 focus:outline-none"
              />
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
             <div className="mt-4">
                <div className="flex justify-between items-center">
                    <label className="block text-gray-700 font-medium">
                        Appointment Date
                    </label>
                    <DateTimePicker
                        label="Controlled picker"
                        value={formdata.appointment_date}
                        onChange={(newValue) => {
                            setForm(prev => ({ ...prev, appointment_date: newValue }))
                        }}
                    />
                </div>
                {/* <input
                    type="date"
                    name="appointment_date"
                    value={formdata.appointment_date}
                    onChange={handleChange}
                    required
                    className="w-full mt-2 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-secondary1 focus:outline-none"
                /> */}
                <p className="mt-4 text-gray-600">
                    {formdata.appointment_date && `Selected: ${formatDateWithDay(formdata.appointment_date)}`}
                </p>
            </div>
        </div>
    </form>

            {message && (
            <p className="mt-4 text-center text-sm font-medium">{message}</p>
            )}
    </div>

  );
};


const ReminderModal = ({ selectedPatient, isOpen, onClose, saveLabel, headingLabel, caption}) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    patient_name: selectedPatient ? selectedPatient.patient_name : null,
    treatment: "",
    appointment_date: moment(),
    doctor_name: ""
  });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {

      const resp = await sendReminder(form)

      if (resp.ok) {
        setMessage(`Reminder to patient ${form.patient_name} successfully!`);
        setForm({
            patient_name: "",
            treatment: "",
            appointment_date: "",
            doctor_name: ""
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

  useEffect(() => {
    if (selectedPatient) {
        console.log(selectedPatient, "selectedPatient")
        setForm((prev => ({
            ...prev,
            patient_name: selectedPatient.name
        })
        ))
    }
   
  }, [selectedPatient])

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

        <SendReminderForm handleSubmit={handleSubmit} loading={loading} message={message} formdata={form} setForm={setForm}/>

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

export default ReminderModal;
