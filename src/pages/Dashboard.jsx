import React from 'react'
import PageWrapper from './PageWrapper'
import SummaryCards from '../components/SummaryCards'
import QuickActions from '../components/QuickActions'
import DateTimeDisplay from '../components/DateTimeDisplay'
import DentalScheduleCard from '../components/DentalScheduleCard'

const Dashboard = () => {
  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto flex flex-col"> 
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-xl md:text-2xl font-extrabold text-textdark">Welcome Dr. Aakash Gupta</h2>
          <DateTimeDisplay />
        </div>
        <SummaryCards />
        <div className='flex justify-between'>
          <DentalScheduleCard />
          <QuickActions />
        </div>
      </div>
    </PageWrapper>
  )
}

export default Dashboard
