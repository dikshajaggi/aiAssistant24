import React from "react";
import PageWrapper from "./PageWrapper";
import AppointmentsAndReminders from "../components/AppointmentsAndReminders";

const Appointments = () => {
  return (
    <PageWrapper>
      <h1 className="text-2xl font-bold mb-6">Appointments</h1>
      <AppointmentsAndReminders />
    </PageWrapper>
  );
};

export default Appointments;
