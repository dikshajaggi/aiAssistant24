import React from 'react'
import PageWrapper from './PageWrapper'
import SummaryCards from '../components/SummaryCards'
import AddPatientForm from './AddPatientForm '
import PatientsList from './PatientsList'
import AppointmentsAndReminders from './AppointmentsAndReminders'

const Dashboard = () => {
  return (
    <PageWrapper>
      <SummaryCards />
      <AddPatientForm />
      <PatientsList />
      <AppointmentsAndReminders />
    </PageWrapper>
  )
}

export default Dashboard
