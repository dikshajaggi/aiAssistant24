import ReminderModal from '@/components/common/ReminderModal'
import PatientsList from '@/components/PatientsList'
import React, { useState } from 'react'

const Reminders = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedPatient, setSelectedPatient] = useState(null)

    const saveLabel = "Send Reminder"
    const headingLabel= "WhatsApp and Email Reminders"
    const caption = "Send appointment reminders on register whatsapp mbile no and email"

  return (
    <div>
        <PatientsList module={"reminder_module"}  onSendReminder={(patient) => {
            setSelectedPatient(patient)
            setIsOpen(true)
         }} />
        <ReminderModal selectedPatient={selectedPatient} isOpen = {isOpen} onClose = {() => setIsOpen(prev => !prev)} saveLabel= {saveLabel} headingLabel = {headingLabel} caption = {caption} />
    </div>
  )
}

export default Reminders
