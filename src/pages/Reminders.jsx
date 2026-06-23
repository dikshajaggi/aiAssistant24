import BillingModal from '@/components/BillingModal'
import ReminderModal from '@/components/common/ReminderModal'
import PatientsList from '@/components/PatientsList'
import React, { useState } from 'react'
import PageWrapper from './PageWrapper'

const Reminders = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isBillingOpen, setIsBillingOpen] = useState(false)
    const [selectedPatient, setSelectedPatient] = useState(null)

    const saveLabel = "Send Reminder"
    const headingLabel= "WhatsApp and Email Reminders"
    const caption = "Send appointment reminders on register whatsapp mobile no and email"

    const onSendBill = (patient) => {
      setSelectedPatient(patient);
      setIsBillingOpen(true);
    };

  return (
    <PageWrapper>
      <div className="flex flex-col items-center w-full max-w-7xl mx-auto pt-4 pb-10">
        <div className="w-full mb-6">
          <h1 className="text-xl font-semibold">Reminders & Follow Ups</h1>
          <p className="text-sm text-gray-400 mt-1">Send WhatsApp and email appointment reminders to your patients.</p>
        </div>
        <PatientsList module={"reminder_module"} onSendBill={onSendBill} onSendReminder={(patient) => {
            setSelectedPatient(patient)
            setIsOpen(true)
         }} />
        <ReminderModal selectedPatient={selectedPatient} isOpen={isOpen} onClose={() => setIsOpen(prev => !prev)} saveLabel={saveLabel} headingLabel={headingLabel} caption={caption} />
        {selectedPatient && (
          <BillingModal
            isOpen={isBillingOpen}
            onClose={() => setIsBillingOpen(false)}
            patient={selectedPatient}
            onSave={() => {}}
          />
        )}
      </div>
    </PageWrapper>
  )
}

export default Reminders
