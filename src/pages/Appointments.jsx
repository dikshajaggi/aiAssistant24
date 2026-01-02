import React, { useState } from "react";
import PageWrapper from "./PageWrapper";
import { MessageCircle, Mail, Clock, Plus } from "lucide-react";
import RecentAppointments from "../components/RecentAppointments";
import ScheduleAppointment from "../components/ScheduleAppointment";
import AppointmentModal from "@/components/common/AppointmenModal";
import PrescriptionModal from "@/components/PrescriptionModal";


const Appointments = () => {
  
  const [openForm, setOpenForm] = useState(false);
  const [isPrescriptionOpen, setIsPrescriptionOpen] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState(null)
  
  const reminders = {
    whatsapp: 8,
    email: 5,
    pending: 3,
  };

  const onGeneratePrescription = (patient) => {
    setSelectedPatient(patient)
    setIsPrescriptionOpen(true)
  }

  return (
    <PageWrapper>
      <div className="w-full max-w-7xl mx-auto pt-4 pb-10">
        {/* Heading */}
        <div className="w-full flex flex-col lg:flex-row items-center justify-between">
          <h1 className="text-xl font-semibold mb-6">Appointments & Reminders</h1>
          <button
            onClick={() => setOpenForm(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-700 transition cursor-pointer"
          >
            <Plus size={16} /> Schedule Appointment
          </button>
        </div>
        {/* Reminders Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 mb-10">
          <div className="bg-white shadow-md rounded-2xl p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-700 flex items-center justify-center gap-2">
            <MessageCircle className="w-5 h-5 text-green-600" />
            WhatsApp Reminders
            </h3>
            <p className="text-3xl font-bold text-green-600 mt-3">{reminders.whatsapp}</p>
          </div>
          <div className="bg-white shadow-md rounded-2xl p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-700 flex items-center justify-center gap-2">
              <Mail className="w-5 h-5 text-secondary1" />
              Email Reminders
            </h3>
            <p className="text-3xl font-bold text-secondary1 mt-3">{reminders.email}</p>
          </div>
          <div className="bg-white shadow-md rounded-2xl p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-700 flex items-center justify-center gap-2">
              <Clock className="w-5 h-5 text-alert" />
              Pending Reminders
            </h3>
            <p className="text-3xl font-bold text-alert mt-3">{reminders.pending}</p>
          </div>
        </div>
        <RecentAppointments onGeneratePrescription={onGeneratePrescription} />
        {isPrescriptionOpen && <PrescriptionModal isOpen={isPrescriptionOpen} onClose={() => setIsPrescriptionOpen(false)} patient = {selectedPatient} />}
        {openForm && <AppointmentModal isOpen = {openForm} onClose = {() => setOpenForm(false)} saveLabel = "Schedule Appointment" headingLabel = "Schedule Appointment" caption = "Schedule Appointment" />}
      </div>
    </PageWrapper>
  );
};

export default Appointments;
