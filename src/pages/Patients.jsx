import React, { useState } from "react";
import PatientsList from "../components/PatientsList";
import PageWrapper from "./PageWrapper";
import { Plus } from "lucide-react";
import PatientModal from "@/components/common/PatientModal";

const Patients = () => {
  const [openForm, setOpenForm] = useState(false);

  return (
    <PageWrapper>
      <div className="flex flex-col items-center w-full max-w-7xl mx-auto pt-4 pb-10">
        <div className="w-full flex flex-col lg:flex-row items-center justify-between">
          <h1 className="text-xl font-semibold mb-6">Patient Management</h1>
          <button
            onClick={() => setOpenForm(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-700 transition cursor-pointer"
          >
            <Plus size={16} /> Add Patient
          </button>
        </div>
        {openForm && <PatientModal isOpen={openForm} onClose={() => setOpenForm(false)} saveLabel="Add Patient" headingLabel="Add Patient" caption = "Add Patient" />}
        <PatientsList module={"patient_module"}/>
      </div>
    </PageWrapper>
  );
};

export default Patients;
