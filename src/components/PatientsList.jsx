import React, { useContext, useEffect, useState } from "react";
import { formatDateWithDay } from "../utils/formatDateWithDay";
import DeleteModal from "../components/DeleteConfirmationModal";
import { MainContext } from "../context/MainContext";
import EditPatientModal from "../components/EditPatientModal";

const PatientsList = () => {
    const {patients, setPatients} = useContext(MainContext)
    const [currentPatient, setCurrentPatient] = useState(null)
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingPatient, setEditingPatient] = useState(null);

    const modalDesc = "Are you sure you want to delete this patient's data?"
    const modalTitle = "Confirm Deletion"
    
    const toggleModal = (id) => {
        setModalOpen(!modalOpen)
        setCurrentPatient(id)
    }

    const handleUpdate = (updatedPatient) => {
        setPatients(patients.map(p => (p.id === updatedPatient.id ? updatedPatient : p)));
    };

    // Fetch patients on mount
    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        try {
        setLoading(true);
        //   const token = localStorage.getItem("token");
        //   const resp = await fetch("http://localhost:8000/patients", {
        //     headers: {
        //       Authorization: `Bearer ${token}`,
        //     },
        //   });
        //   const data = await resp.json();
        // setPatients(data);
        } catch (err) {
        console.error("Error fetching patients:", err);
        } finally {
        setLoading(false);
        }
    };

  return (
    <div className="mt-12  w-full max-w-6xl">
      <h2 className="text-2xl font-bold text-textdark mb-6 text-center">
        Patients List
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading patients...</p>
      ) : patients.length === 0 ? (
        <p className="text-center text-gray-500">No patients found.</p>
      ) : (
        <div className="overflow-x-auto">
          {/* Desktop Table */}
          <table className="hidden md:table w-full border-collapse bg-white shadow-lg rounded-2xl overflow-hidden">
            <thead className="bg-primary text-white">
              <tr>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Age</th>
                <th className="p-4 text-left">Gender</th>
                <th className="p-4 text-left">Appointment Date</th>
                <th className="p-4 text-left">Treatment</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((p) => (
                <tr key={p.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">{p.name}</td>
                    <td className="p-4">{p.age}</td>
                    <td className="p-4 capitalize">{p.gender}</td>
                    <td className="p-4">{formatDateWithDay(p.appointment_date)}</td>
                    <td className="p-4">{p.treatment}</td>
                    <td className="p-4 flex gap-3 justify-center">
                    <button onClick={() => setEditingPatient(p)} className="px-3 py-1 bg-secondary/90 text-white rounded-lg hover:bg-secondary cursor-pointer">
                      Edit
                    </button>
                    <button
                      onClick={() => toggleModal(p.id)}
                      className="px-3 py-1 bg-alert/90 text-white rounded-lg hover:bg-alert cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile Cards */}
          <div className="grid gap-4 md:hidden">
            {patients.map((p) => (
              <div
                key={p.id}
                className="bg-white shadow-md rounded-xl p-4 space-y-2"
              >
                <p>
                  <span className="font-semibold">Name:</span> {p.name}
                </p>
                <p>
                  <span className="font-semibold">Age:</span> {p.age}
                </p>
                <p>
                  <span className="font-semibold">Gender:</span>{" "}
                  {p.gender}
                </p>
                <p>
                    <span className="font-semibold">Appointment:</span>{" "}
                    {formatDateWithDay(p.appointment_date)}
                </p>
                <p>
                  <span className="font-semibold">Treatment:</span>{" "}
                  {p.treatment}
                </p>
                <div className="flex gap-3 mt-2">
                  <button onClick={() => setEditingPatient(p)} className="cursor-pointer flex-1 px-3 py-1 bg-secondary/90 text-white rounded-lg hover:bg-secondary">
                    Edit
                  </button>
                  <button
                    onClick={() => toggleModal(p.id)}
                    className="cursor-pointer flex-1 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
        <DeleteModal isOpen={modalOpen} toggle={toggleModal} title={modalTitle} currentPatient={currentPatient}>
            <p>{modalDesc}</p>
        </DeleteModal>

        {editingPatient && (
            <EditPatientModal
            patient={editingPatient}
            onClose={() => setEditingPatient(null)}
            onUpdate={handleUpdate}
            />
        )}
    </div>
  );
};

export default PatientsList;
