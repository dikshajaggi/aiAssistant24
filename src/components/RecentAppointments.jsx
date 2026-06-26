import React from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useVisits } from '../hooks/useQueries'
import AppointmentTableView from './AppointmentTableView'

const RecentAppointments = ({ onAdd }) => {
  const queryClient = useQueryClient()
  const { data: appointments = [], isLoading: loading } = useVisits()

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ['visits'] })
  }

  return (
    <AppointmentTableView
      appointments={appointments}
      loading={loading}
      onRefresh={handleRefresh}
      onAdd={onAdd}
    />
  )
}

export default RecentAppointments
