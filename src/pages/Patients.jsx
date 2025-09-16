import React from "react";
import AddPatientForm from "../components/AddPatientForm";
import PatientsList from "../components/PatientsList";
import PageWrapper from "./PageWrapper";

const Patients = () => {
  return (
    <PageWrapper>
      <div className="flex flex-col items-center w-full max-w-7xl mx-auto pt-4 pb-10">
        <h1 className="text-2xl font-bold mb-6">Patients Management</h1>
        <AddPatientForm />
        <PatientsList />
      </div>
    </PageWrapper>
  );
};

export default Patients;
