import React, { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import PatientsList from "../components/PatientsList";
import PageWrapper from "./PageWrapper";
import { Plus } from "lucide-react";
import PatientModal from "@/components/common/PatientModal";

const Patients = () => {
  const queryClient = useQueryClient();
  const location = useLocation();
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    if (location.state?.openModal) {
      setOpenForm(true);
    }
  }, []);

  const handlePatientSuccess = () => {
    setOpenForm(false);
    queryClient.invalidateQueries({ queryKey: ['patients'] });
  };

  return (
    <PageWrapper>
      <div className="flex flex-col items-center w-full max-w-7xl mx-auto pt-4 pb-10">
        <div className="w-full flex flex-col lg:flex-row items-start justify-between mb-6">
          <div>
            <h1 className="text-xl font-semibold">Patient Management</h1>
            <p className="text-sm text-gray-400 mt-1">View, search and manage all your clinic patients.</p>
          </div>
          <button
            onClick={() => setOpenForm(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition cursor-pointer mt-3 lg:mt-0 shrink-0"
          >
            <Plus size={16} /> Add Patient
          </button>
        </div>
        {openForm && (
          <PatientModal
            isOpen={openForm}
            onClose={() => setOpenForm(false)}
            onSuccess={handlePatientSuccess}
            saveLabel="Add Patient"
            headingLabel="Add Patient"
            caption="Add Patient"
          />
        )}
        <PatientsList module={"patient_module"} onAdd={() => setOpenForm(true)} />
      </div>
    </PageWrapper>
  );
};

export default Patients;
