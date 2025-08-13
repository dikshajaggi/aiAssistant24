import React, { useState } from 'react'

const Pricing = () => {
  const [isActive, setIsActive] = useState("yearly")

  return (
    <div className="flex flex-col items-center px-4 py-10">
      <h1 className="font-bold text-xl md:text-3xl text-center">
        Pick a Plan & Let AI Do the Rest
      </h1>

      <p className="font-semibold text-gray-700 text-sm md:text-md text-center mt-6 max-w-2xl">
        Choose the plan that fits your clinic best, and watch our AI handle patients, appointments, 
        payments, and marketing—so you can focus on delivering exceptional dental care.
      </p>

      {/* Buttons */}
      <div className="flex justify-center items-center gap-4 mt-14 flex-wrap">
        <button
          className={`${isActive === "monthly"
              ? "bg-secondary text-white border-2 border-secondary"
              : "bg-transparent border-2 border-secondary"
            } cursor-pointer font-semibold px-8 md:px-12 py-3 rounded-2xl transition-all duration-300 ease-in-out`}
          onClick={() => setIsActive("monthly")}
        >
          Monthly
        </button>

        <button
          className={`${isActive === "yearly"
              ? "bg-secondary text-white border-2 border-secondary"
              : "bg-transparent border-2 border-secondary"
            } cursor-pointer font-semibold px-8 md:px-12 py-3 rounded-2xl transition-all duration-300 ease-in-out`}
          onClick={() => setIsActive("yearly")}
        >
          Yearly
        </button>
      </div>
    </div>
  )
}

export default Pricing
