import React from 'react'
import PageWrapper from './PageWrapper'
import SummaryCards from '../components/SummaryCards'
import AddPatientForm from './AddPatientForm '
import PatientsList from './PatientsList'

const Dashboard = () => {
  return (
    <PageWrapper>
      <SummaryCards />
      <AddPatientForm />
      <PatientsList />
    </PageWrapper>
  )
}

export default Dashboard
