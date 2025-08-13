import React, { useState } from 'react'

const Pricing = () => {
  const [isActive, setIsActive] = useState("yearly")

  const handleMonthlyPlan = () => {
    setIsActive("monthly")
  }

  const handleYearlyPlan = () => {
    setIsActive("yearly")
  }

  return (
    <div className='flex justify-center items-center flex-col'>
      <h1 className='font-bold text-xl md:text-3xl'>Pick a Plan & Let AI Do the Rest</h1>
      <p className='font-semibold text-gray-700 text-md text-center mt-6'>Choose the plan that fits your clinic best, and watch our AI handle <br></br>patients, appointments, payments, and marketing—so you can focus on delivering exceptional dental care.</p>

     <div className='flex justify-around items-center w-1/2 mt-14'>
       <button className = {`${isActive === "monthly" ? "bg-secondary text-white border-2 border-secondary" : "bg-transparent border-2 border-secondary"} cursor-pointer font-semibold px-12 py-3 rounded-2xl transition-all duration-300 ease-in-out`} onClick={handleMonthlyPlan}>Monthly</button>
        <button className = {`${isActive === "yearly" ? "bg-secondary text-white border-2 border-secondary" : "bg-transparent border-2 border-secondary"} cursor-pointer font-semibold px-12 py-3 rounded-2xl transition-all duration-300 ease-in-out`} onClick={handleYearlyPlan}>Yearly</button>
     </div>

    </div>
  )
}

export default Pricing
