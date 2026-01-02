import BillingModal from '@/components/BillingModal'
import ReminderModal from '@/components/common/ReminderModal'
import PatientsList from '@/components/PatientsList'
import React, { useState } from 'react'

const Reminders = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isBillingOpen, setIsBillingOpen] = useState(false)
    const [selectedPatient, setSelectedPatient] = useState(null)

    const saveLabel = "Send Reminder"
    const headingLabel= "WhatsApp and Email Reminders"
    const caption = "Send appointment reminders on register whatsapp mbile no and email"

    const onSendBill = (patient) => {
      setSelectedPatient(patient);
      setIsBillingOpen(true);
    };

  return (
    <div>
        <PatientsList module={"reminder_module"} onSendBill={onSendBill}  onSendReminder={(patient) => {
            setSelectedPatient(patient)
            setIsOpen(true)
         }} />
        <ReminderModal selectedPatient={selectedPatient} isOpen = {isOpen} onClose = {() => setIsOpen(prev => !prev)} saveLabel= {saveLabel} headingLabel = {headingLabel} caption = {caption} />
        {selectedPatient && (
          <BillingModal
            isOpen={isBillingOpen}
            onClose={() => setIsBillingOpen(false)}
            patient={selectedPatient}
            onSave={(payload) => console.log("Bill saved:", payload)}
          />
        )}
    </div>
  )
}

export default Reminders
