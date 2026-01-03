import { useState } from "react";
import { User } from "lucide-react";
import { Input } from "./Reusable";


export default function EditPatient({
    isOpen,
    onClose,
    patient,
    onSave,
}) {

  const [form, setForm] = useState({
    name: patient.name || "",
    treatment: patient.treatment || "",
    phone: patient.phone || "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

const handleSubmit = async () => {
  setLoading(true);
  onSave()

//   try {
//     } catch (err) {
//       console.error("Update failed", err);
//       toast.error("Successfully created!")("Failed to update employee");
//     } finally {
//       setLoading(false);
//     }
};

if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="flex flex-col bg-white rounded-xl p-6">
          {/* HEADER */}
        <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
                <User className="text-gray-500" />
            </div>
            <div>
                <h2 className="text-lg font-semibold text-gray-900">
                    {patient.name}
                </h2>
            </div>
        </div>

      {/* JOB */}
      <Section>
        <Input
          label="Name"
          type="text"
          min={0}
          value={form.name}
          onChange={(e) =>
            handleChange(
              "name",
              e.target.value
            )
          }
        />

        <Input
          label="Treatment"
          type="text"
          min={0}
          value={form.treatment}
          onChange={(e) =>
            handleChange(
              "treatment",
              e.target.value
            )
          }
        />

        <Input
          label="Phone"
          type="number"
          min={0}
          value={form.name}
          onChange={(e) =>
            handleChange(
              "phone",
              e.target.value
            )
          }
        />
        
      </Section>

      {/* ACTIONS */}
      <div className="sticky bottom-0 mt-4 border-t pt-4 flex justify-end gap-3">
        <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 border rounded-lg cursor-pointer"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 cursor-pointer"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
      </div>
    </div>
  );
}

/* helpers */
const Section = ({ children }) => (
  <div className="bg-gray-50 rounded-xl p-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {children}
    </div>
  </div>
);
