import React from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { usePatients } from '../hooks/useQueries'
import PatientsTableView from './PatientsTableView'

const PatientsList = ({ module, onSendReminder, onSendBill, onAdd }) => {
  const queryClient = useQueryClient()
  const { data: patients = [], isLoading: loading, isError, refetch } = usePatients()

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ['patients'] })
  }

  if (isError) {
    return (
      <div className="mt-6 w-full text-center py-12">
        <p className="text-red-500 mb-4">Failed to load patients. Please check your connection and try again.</p>
        <button
          onClick={refetch}
          className="px-4 py-2 bg-secondary1 text-white rounded-lg hover:bg-secondary1/90 cursor-pointer"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="mt-6 w-full">
      <PatientsTableView
        patients={patients}
        loading={loading}
        module={module}
        onSendReminder={onSendReminder}
        onSendBill={onSendBill}
        onRefresh={handleRefresh}
        onAdd={onAdd}
      />
    </div>
  )
}

export default PatientsList
