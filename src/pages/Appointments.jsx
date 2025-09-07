import React from "react";
import PageWrapper from "./PageWrapper";
import { MessageCircle, Mail, Clock } from "lucide-react";
import RecentAppointments from "../components/RecentAppointments";
import ScheduleAppointment from "../components/ScheduleAppointment";


const Appointments = () => {
  
const reminders = {
  whatsapp: 8,
  email: 5,
  pending: 3,
};

  return (
    <PageWrapper>
      <div className="w-full max-w-7xl mx-auto mt-10 px-4">
        {/* Heading */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Appointments & Reminders</h2>

        {/* Reminders Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white shadow-md rounded-2xl p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-700 flex items-center justify-center gap-2">
            <MessageCircle className="w-5 h-5 text-green-600" />
            WhatsApp Reminders
            </h3>
            <p className="text-3xl font-bold text-green-600 mt-3">{reminders.whatsapp}</p>
          </div>
          <div className="bg-white shadow-md rounded-2xl p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-700 flex items-center justify-center gap-2">
              <Mail className="w-5 h-5 text-secondary" />
              Email Reminders
            </h3>
            <p className="text-3xl font-bold text-secondary mt-3">{reminders.email}</p>
          </div>
          <div className="bg-white shadow-md rounded-2xl p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-700 flex items-center justify-center gap-2">
              <Clock className="w-5 h-5 text-alert" />
              Pending Reminders
            </h3>
            <p className="text-3xl font-bold text-alert mt-3">{reminders.pending}</p>
          </div>
        </div>
        <RecentAppointments />
        <ScheduleAppointment />
      </div>
    </PageWrapper>
  );
};

export default Appointments;
