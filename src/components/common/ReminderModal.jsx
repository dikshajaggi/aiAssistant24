import { X, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { remindPatient } from "../../apis";
import { toast } from "react-toastify";

const REMINDER_TYPES = [
  { value: "appointment_reminder",    label: "Appointment Reminder" },
  { value: "next_visit_due",          label: "Next Visit Due" },
  { value: "appointment_rescheduled", label: "Appointment Rescheduled" },
  { value: "follow_up_due",           label: "Follow-up Due" },
  { value: "general_message",         label: "General Message" },
];

function formatDateTime(date, time) {
  if (!date && !time) return "[DateTime]";
  const parts = [];
  if (date) {
    const d = new Date(date + "T00:00:00");
    parts.push(
      d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
    );
  }
  if (time) parts.push(`at ${time}`);
  return parts.join(" ");
}

function buildTemplate(type, name, date, time) {
  const n  = name || "[Patient Name]";
  const dt = formatDateTime(date, time);

  switch (type) {
    case "appointment_reminder":
      return (
        `Greetings of the day! 🙏\n` +
        `Dear ${n}, this is a reminder for your upcoming dental\n` +
        `appointment scheduled on ${dt}.\n` +
        `Please arrive 10 minutes early. For any changes, feel free to contact us.\n` +
        `We look forward to seeing you! 😊`
      );
    case "next_visit_due":
      return (
        `Greetings of the day! 🙏\n` +
        `Dear ${n}, it's time for your next dental check-up!\n` +
        `We have an appointment available on ${dt}.\n` +
        `Regular visits help keep your smile healthy. Book your slot today! 😊`
      );
    case "appointment_rescheduled":
      return (
        `Greetings of the day! 🙏\n` +
        `Dear ${n}, your dental appointment has been rescheduled\n` +
        `to ${dt}. We apologise for any inconvenience. Please contact\n` +
        `us if this time does not suit you. 🙏`
      );
    case "follow_up_due":
      return (
        `Greetings of the day! 🙏\n` +
        `Dear ${n}, your follow-up visit is due on ${dt}.\n` +
        `Please do not skip — it is important for your recovery and oral health.\n` +
        `We look forward to seeing you! 😊`
      );
    case "general_message":
      return (
        `Greetings of the day! 🙏\n` +
        `Dear ${n}, we hope you are doing well.\n`
      );
    default:
      return "";
  }
}

const ReminderModal = ({ selectedPatient, isOpen, onClose }) => {
  const [reminderType, setReminderType] = useState("");
  const [date, setDate]                 = useState("");
  const [time, setTime]                 = useState("");
  const [message, setMessage]           = useState("");
  const [userEdited, setUserEdited]     = useState(false);
  const [loading, setLoading]           = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setReminderType("");
      setDate("");
      setTime("");
      setMessage("");
      setUserEdited(false);
      setLoading(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const patientName = selectedPatient?.name;
  const isGeneral   = reminderType === "general_message";

  const handleTypeChange = (val) => {
    setReminderType(val);
    setUserEdited(false);
    setMessage(buildTemplate(val, patientName, date, time));
  };

  const handleDateChange = (val) => {
    setDate(val);
    setUserEdited(false);
    setMessage(buildTemplate(reminderType, patientName, val, time));
  };

  const handleTimeChange = (val) => {
    setTime(val);
    setUserEdited(false);
    setMessage(buildTemplate(reminderType, patientName, date, val));
  };

  const handleMessageChange = (val) => {
    setMessage(val);
    setUserEdited(true);
  };

  const resetToTemplate = () => {
    setUserEdited(false);
    setMessage(buildTemplate(reminderType, patientName, date, time));
  };

  const handleSend = async () => {
    setLoading(true);
    try {
      await remindPatient({ patient_id: selectedPatient.id, days_after: 1 });
      toast.success(`Reminder sent to ${patientName}`);
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "Failed to send reminder");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-[999] p-4">
      <div className="bg-white border border-gray-200 shadow-xl rounded-2xl w-full max-w-lg p-6 relative overflow-y-auto max-h-[90vh]">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition cursor-pointer"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Send Reminder</h2>
          <p className="text-sm text-gray-500 mt-1">
            {selectedPatient?.name}
            {selectedPatient?.phone ? ` · ${selectedPatient.phone}` : ""}
          </p>
        </div>

        <div className="space-y-5">

          {/* Reminder Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reminder Type
            </label>
            <select
              value={reminderType}
              onChange={(e) => handleTypeChange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm text-gray-700 focus:ring-2 focus:ring-secondary1 focus:outline-none"
            >
              <option value="">Select type</option>
              {REMINDER_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          {/* Date & Time — hidden for General Message */}
          {!isGeneral && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date &amp; Time
              </label>
              <div className="flex gap-3">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => handleDateChange(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-xl text-sm text-gray-700 focus:ring-2 focus:ring-secondary1 focus:outline-none"
                />
                <input
                  type="time"
                  value={time}
                  onChange={(e) => handleTimeChange(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-xl text-sm text-gray-700 focus:ring-2 focus:ring-secondary1 focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* Message — visible once a type is chosen */}
          {reminderType && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-sm font-medium text-gray-700">Message</label>
                {userEdited && (
                  <button
                    type="button"
                    onClick={resetToTemplate}
                    className="text-xs text-secondary1 hover:underline cursor-pointer"
                  >
                    Reset to template
                  </button>
                )}
              </div>
              <textarea
                rows={5}
                value={message}
                onChange={(e) => handleMessageChange(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 focus:ring-2 focus:ring-secondary1 focus:outline-none resize-y"
              />
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 transition cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
            disabled={loading || !reminderType}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 size={14} className="animate-spin" />
                Sending…
              </span>
            ) : "Send via WhatsApp & Email"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default ReminderModal;
