import React from 'react'
import PageWrapper from './PageWrapper'
import SummaryCards from '../components/SummaryCards'
import RecentAppointments from '../components/RecentAppointments'
import QuickActions from '../components/QuickActions'

const Dashboard = () => {
  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto flex flex-col"> 
        <h2 className="text-xl md:text-2xl font-extrabold text-textdark mb-10"> Welcome </h2>
        <SummaryCards />
        <div className='flex justify-between'>
          <RecentAppointments />
          <QuickActions />
        </div>
      </div>
    </PageWrapper>
  )
}

export default Dashboard
