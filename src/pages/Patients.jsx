import React from "react";
import AddPatientForm from "../components/AddPatientForm";
import PatientsList from "../components/PatientsList";
import PageWrapper from "./PageWrapper";

const Patients = () => {
  return (
    <PageWrapper>
      <h1 className="text-2xl font-bold mb-6">Patients Management</h1>
      <AddPatientForm />
      <PatientsList />
    </PageWrapper>
  );
};

export default Patients;
