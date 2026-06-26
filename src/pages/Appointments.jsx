import React, { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import PageWrapper from "./PageWrapper";
import { Plus } from "lucide-react";
import RecentAppointments from "../components/RecentAppointments";
import AppointmentModal from "@/components/common/AppointmenModal";

const Appointments = () => {
  const queryClient = useQueryClient();
  const location = useLocation();
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    if (location.state?.openModal) {
      setOpenForm(true);
    }
  }, []);

  const handleAppointmentSuccess = () => {
    setOpenForm(false);
    queryClient.invalidateQueries({ queryKey: ['visits'] });
  };

  return (
    <PageWrapper>
      <div className="w-full max-w-7xl mx-auto pt-4 pb-10">
        <div className="w-full flex flex-col lg:flex-row items-start justify-between mb-6">
          <div>
            <h1 className="text-xl font-semibold">Appointments</h1>
            <p className="text-sm text-gray-400 mt-1">Track, edit and manage all patient appointments.</p>
          </div>
          <button
            onClick={() => setOpenForm(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition cursor-pointer mt-3 lg:mt-0 shrink-0"
          >
            <Plus size={16} /> Schedule Appointment
          </button>
        </div>

        <RecentAppointments
          onAdd={() => setOpenForm(true)}
        />

        {openForm && (
          <AppointmentModal
            isOpen={openForm}
            onClose={() => setOpenForm(false)}
            onSuccess={handleAppointmentSuccess}
            saveLabel="Schedule Appointment"
            headingLabel="Schedule Appointment"
            caption="Schedule Appointment"
          />
        )}
      </div>
    </PageWrapper>
  );
};

export default Appointments;
