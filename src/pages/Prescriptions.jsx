import React, { useState } from "react";
import { Plus, X, Printer, Loader2 } from "lucide-react";
import { generatePrescription } from "../apis";
import { toast } from "react-toastify";
import { usePatients, useClinicProfile } from "../hooks/useQueries";

const emptyMedicine = () => ({ name: "", dose: "", timing: "", freq: "", duration: "" });

const MED_FIELDS = ["name", "dose", "timing", "freq", "duration"];
const MED_PLACEHOLDERS = { name: "Medicine name", dose: "Dose", timing: "Timing", freq: "Frequency", duration: "Duration" };

const Prescriptions = () => {
  const today = (() => {
    const d = new Date();
    return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
  })();

  const { data: patients = [] } = usePatients();
  const { data: clinicProfile } = useClinicProfile();

  const [selectedPatientId, setSelectedPatientId] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patientAge, setPatientAge] = useState("");
  const [patientGender, setPatientGender] = useState("");
  const [complaints, setComplaints] = useState([""]);
  const [diagnosis, setDiagnosis] = useState("");
  const [medicines, setMedicines] = useState([emptyMedicine()]);
  const [tests, setTests] = useState([""]);
  const [notes, setNotes] = useState("");
  const [advice, setAdvice] = useState("");
  const [sendEmail, setSendEmail] = useState(false);
  const [sendWhatsapp, setSendWhatsapp] = useState(false);
  const [loading, setLoading] = useState(false);

  const getPid = (p) => p?.patient_id || p?.id;

  const handlePatientSelect = (e) => {
    const id = e.target.value;
    setSelectedPatientId(id);
    const p = patients.find((pt) => String(getPid(pt)) === String(id));
    setSelectedPatient(p || null);
    setPatientAge(p?.age || "");
    setPatientGender(p?.gender || "");
  };

  const addComplaint = () => setComplaints((p) => [...p, ""]);
  const removeComplaint = (i) => complaints.length > 1 && setComplaints((p) => p.filter((_, idx) => idx !== i));
  const updateComplaint = (i, val) => setComplaints((p) => p.map((c, idx) => (idx === i ? val : c)));

  const addTest = () => setTests((p) => [...p, ""]);
  const removeTest = (i) => tests.length > 1 && setTests((p) => p.filter((_, idx) => idx !== i));
  const updateTest = (i, val) => setTests((p) => p.map((t, idx) => (idx === i ? val : t)));

  const addMedicine = () => setMedicines((p) => [...p, emptyMedicine()]);
  const removeMedicine = (i) => medicines.length > 1 && setMedicines((p) => p.filter((_, idx) => idx !== i));
  const updateMedicine = (i, field, val) =>
    setMedicines((p) => p.map((m, idx) => (idx === i ? { ...m, [field]: val } : m)));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await generatePrescription({
        // Patient & clinical data
        patient_id: String(getPid(selectedPatient)),
        patient_age: patientAge,
        patient_gender: patientGender,
        complaints: complaints.filter(Boolean),
        diagnosis,
        medicines: medicines.filter((m) => m.name),
        notes,
        advice_text: advice,
        tests: tests.filter(Boolean),
        send_email: sendEmail,
        send_whatsapp: sendWhatsapp,
        filename: "prescription.pdf",
        // Clinic / letterhead data from profile
        clinic_name: clinicProfile?.clinic_name || "",
        clinic_address: [clinicProfile?.address, clinicProfile?.city].filter(Boolean).join(", "),
        clinic_phone: clinicProfile?.phone || "",
        clinic_email: clinicProfile?.email || "",
        clinic_website: clinicProfile?.website || clinicProfile?.clinic_website || "",
        doctor_name: clinicProfile?.doctor_name || "",
        doctor_specialization: clinicProfile?.specialization || "",
        doctor_registration: clinicProfile?.registration_number || "",
        clinic_logo: clinicProfile?.logo_url || "",
      });
      // toast is already fired inside generatePrescription on success
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to generate prescription");
    } finally {
      setLoading(false);
    }
  };

  const patientName = selectedPatient?.name || "";
  const hasEmail = Boolean(selectedPatient?.email);
  const hasPhone = Boolean(selectedPatient?.phone);

  return (
    <div className="space-y-5 pt-2 pb-10">
      <div className="no-print">
        <h1 className="text-xl font-semibold">Prescriptions</h1>
        <p className="text-sm text-gray-400 mt-1">Generate and send prescriptions directly to patients via email or WhatsApp.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* ── LEFT: FORM ── */}
        <div className="flex-1 no-print">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow p-5 space-y-5">

            {/* Patient selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Patient <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={selectedPatientId}
                onChange={handlePatientSelect}
                className="w-full border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary1"
              >
                <option value="">Select patient…</option>
                {patients.map((p) => (
                  <option key={getPid(p)} value={getPid(p)}>
                    {p.name}{p.phone ? ` — ${p.phone}` : p.email ? ` — ${p.email}` : ""}
                  </option>
                ))}
              </select>
            </div>

            {/* Age & Gender */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                <input
                  type="text"
                  value={patientAge}
                  onChange={(e) => setPatientAge(e.target.value)}
                  placeholder="e.g. 32"
                  className="w-full border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <select
                  value={patientGender}
                  onChange={(e) => setPatientGender(e.target.value)}
                  className="w-full border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary1"
                >
                  <option value="">Select…</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Complaints */}
            <DynamicList
              label="Chief Complaints"
              items={complaints}
              placeholder={(i) => `Complaint ${i + 1}`}
              onAdd={addComplaint}
              onRemove={removeComplaint}
              onUpdate={updateComplaint}
              addLabel="Add complaint"
            />

            {/* Diagnosis */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Diagnosis</label>
              <input
                type="text"
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                placeholder="Enter diagnosis"
                className="w-full border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary1"
              />
            </div>

            {/* Medicines table */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Medicines</label>
              <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full text-xs border-collapse" style={{ minWidth: 500 }}>
                  <thead>
                    <tr className="bg-gray-50 text-gray-600">
                      {["Medicine Name", "Dose", "Timing", "Frequency", "Duration", ""].map((h) => (
                        <th key={h} className="px-2 py-2 text-left font-medium border-b border-gray-200 whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {medicines.map((m, i) => (
                      <tr key={i} className="border-b border-gray-100 last:border-0">
                        {MED_FIELDS.map((field) => (
                          <td key={field} className="p-1">
                            <input
                              type="text"
                              value={m[field]}
                              onChange={(e) => updateMedicine(i, field, e.target.value)}
                              placeholder={MED_PLACEHOLDERS[field]}
                              className="w-full px-2 py-1.5 rounded-lg border border-transparent hover:border-gray-200 focus:border-secondary1 focus:outline-none bg-transparent text-xs"
                              style={{ minWidth: 70 }}
                            />
                          </td>
                        ))}
                        <td className="p-1 text-center">
                          <button
                            type="button"
                            onClick={() => removeMedicine(i)}
                            disabled={medicines.length === 1}
                            className="text-gray-400 hover:text-red-500 disabled:opacity-30 cursor-pointer"
                          >
                            <X size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button
                type="button"
                onClick={addMedicine}
                className="mt-2 flex items-center gap-1 text-xs text-secondary1 hover:opacity-75 cursor-pointer font-medium"
              >
                <Plus size={14} /> Add medicine
              </button>
            </div>

            {/* Tests */}
            <DynamicList
              label="Lab tests / investigations"
              items={tests}
              placeholder={(i) => `Test / investigation ${i + 1}`}
              onAdd={addTest}
              onRemove={removeTest}
              onUpdate={updateTest}
              addLabel="Add test"
            />

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Clinical notes…"
                className="w-full border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary1 resize-none"
              />
            </div>

            {/* Advice */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Advice to patient</label>
              <textarea
                rows={2}
                value={advice}
                onChange={(e) => setAdvice(e.target.value)}
                placeholder="Post-treatment advice…"
                className="w-full border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary1 resize-none"
              />
            </div>

            {/* Delivery options */}
            {(hasEmail || hasPhone) && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Delivery options</label>
                <div className="flex flex-wrap gap-5">
                  {hasEmail && (
                    <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={sendEmail}
                        onChange={(e) => setSendEmail(e.target.checked)}
                        className="accent-secondary1 w-4 h-4"
                      />
                      Send via Email
                    </label>
                  )}
                  {hasPhone && (
                    <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={sendWhatsapp}
                        onChange={(e) => setSendWhatsapp(e.target.checked)}
                        className="accent-secondary1 w-4 h-4"
                      />
                      Send via WhatsApp
                    </label>
                  )}
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !selectedPatient}
              className="w-full bg-secondary1 text-white py-2.5 rounded-xl font-medium hover:opacity-90 transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 size={16} className="animate-spin" />
                  Generating…
                </span>
              ) : "Generate & Send Prescription"}
            </button>
          </form>
        </div>

        {/* ── RIGHT: LIVE PREVIEW ── */}
        <div className="lg:w-[440px] xl:w-[500px] shrink-0">
          <div className="flex items-center justify-between mb-3 no-print">
            <span className="text-sm font-medium text-gray-600">Live Preview</span>
            <button
              type="button"
              onClick={() => window.print()}
              className="flex items-center gap-1.5 text-sm border border-gray-300 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-all cursor-pointer"
            >
              <Printer size={15} />
              Print preview
            </button>
          </div>

          {/* A4-like card */}
          <div
            id="prescription-print-area"
            className="bg-white border border-gray-200 rounded-xl shadow-sm"
            style={{ minHeight: 800, fontFamily: "Georgia, 'Times New Roman', serif", padding: 28 }}
          >
            {/* Letterhead */}
            {clinicProfile?.clinic_name || clinicProfile?.logo_url ? (
              <div className="flex items-center gap-4 border-b border-gray-200 pb-4 mb-5">
                {clinicProfile?.logo_url && (
                  <img
                    src={clinicProfile.logo_url}
                    alt="Clinic logo"
                    className="h-14 w-14 object-contain shrink-0"
                  />
                )}
                <div>
                  {clinicProfile?.clinic_name && (
                    <p className="text-base font-bold text-gray-800">{clinicProfile.clinic_name}</p>
                  )}
                  {clinicProfile?.doctor_name && (
                    <p className="text-sm text-gray-600">{clinicProfile.doctor_name}{clinicProfile?.specialization ? ` — ${clinicProfile.specialization}` : ""}</p>
                  )}
                  {clinicProfile?.address && (
                    <p className="text-xs text-gray-500">{clinicProfile.address}{clinicProfile?.city ? `, ${clinicProfile.city}` : ""}</p>
                  )}
                  {(clinicProfile?.phone || clinicProfile?.email) && (
                    <p className="text-xs text-gray-500">
                      {clinicProfile?.phone}{clinicProfile?.phone && clinicProfile?.email ? " · " : ""}{clinicProfile?.email}
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 border border-dashed border-gray-300 rounded-lg py-5 text-center mb-5">
                <p className="text-gray-400 text-sm">Clinic letterhead will appear here</p>
                <a href="/dashboard/profile" className="text-xs text-secondary1 hover:underline mt-1 block">
                  Set up your profile →
                </a>
              </div>
            )}

            {/* Patient info */}
            <div className="border-b border-gray-200 pb-3 mb-4 grid grid-cols-2 gap-y-1 text-xs text-gray-700">
              <div>
                <span className="font-semibold">Name:</span>{" "}
                {patientName || <span className="text-gray-400 italic">Select patient</span>}
              </div>
              <div><span className="font-semibold">Date:</span> {today}</div>
              <div>
                <span className="font-semibold">Age:</span>{" "}
                {patientAge || <span className="text-gray-400 italic">—</span>}
              </div>
              <div>
                <span className="font-semibold">Gender:</span>{" "}
                {patientGender || <span className="text-gray-400 italic">—</span>}
              </div>
            </div>

            {/* Complaints */}
            {complaints.some(Boolean) && (
              <PreviewSection title="Chief Complaints">
                <ul className="list-disc list-inside text-xs text-gray-700 space-y-0.5 pl-1">
                  {complaints.filter(Boolean).map((c, i) => <li key={i}>{c}</li>)}
                </ul>
              </PreviewSection>
            )}

            {/* Diagnosis */}
            {diagnosis && (
              <PreviewSection title="Diagnosis">
                <p className="text-xs text-gray-700">{diagnosis}</p>
              </PreviewSection>
            )}

            {/* Medicines */}
            {medicines.some((m) => m.name) && (
              <div className="mb-4">
                <p className="text-base font-bold text-gray-800 mb-2 italic">Diagnosis</p>
                <div className="border border-gray-300 rounded-lg overflow-hidden divide-y divide-gray-200">
                  {medicines.filter((m) => m.name).map((m, i) => (
                    <div key={i} className="px-3 py-2 text-xs text-gray-700">
                      <p className="font-semibold text-gray-800">{i + 1}. {m.name}</p>
                      {(m.dose || m.timing) && (
                        <p className="text-gray-500 mt-0.5">
                          {m.dose && `Dose: ${m.dose}`}
                          {m.dose && m.timing && "  ·  "}
                          {m.timing && `Timing: ${m.timing}`}
                        </p>
                      )}
                      {(m.freq || m.duration) && (
                        <p className="text-gray-500">
                          {m.freq && `Frequency: ${m.freq}`}
                          {m.freq && m.duration && "  ·  "}
                          {m.duration && `Duration: ${m.duration}`}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tests */}
            {tests.some(Boolean) && (
              <PreviewSection title="Investigations advised">
                <ul className="list-disc list-inside text-xs text-gray-700 space-y-0.5 pl-1">
                  {tests.filter(Boolean).map((t, i) => <li key={i}>{t}</li>)}
                </ul>
              </PreviewSection>
            )}

            {/* Notes & Advice */}
            {(notes || advice) && (
              <div className="mb-4 space-y-1 text-xs text-gray-700">
                {notes && <p><span className="font-semibold">Notes:</span> {notes}</p>}
                {advice && <p><span className="font-semibold">Advice:</span> {advice}</p>}
              </div>
            )}

            {/* Footer placeholder */}
            <div className="mt-10 bg-gray-50 border border-dashed border-gray-300 rounded-lg py-5 text-center text-gray-400 text-sm">
              Doctor signature & credentials will appear here
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DynamicList = ({ label, items, placeholder, onAdd, onRemove, onUpdate, addLabel }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex gap-2 items-center">
          <input
            type="text"
            value={item}
            onChange={(e) => onUpdate(i, e.target.value)}
            placeholder={placeholder(i)}
            className="flex-1 border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary1"
          />
          <button
            type="button"
            onClick={() => onRemove(i)}
            disabled={items.length === 1}
            className="text-gray-400 hover:text-red-500 disabled:opacity-30 cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
    <button
      type="button"
      onClick={onAdd}
      className="mt-2 flex items-center gap-1 text-xs text-secondary1 hover:opacity-75 cursor-pointer font-medium"
    >
      <Plus size={14} /> {addLabel}
    </button>
  </div>
);

const PreviewSection = ({ title, children }) => (
  <div className="mb-4">
    <p className="text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1.5">{title}</p>
    {children}
  </div>
);

export default Prescriptions;
