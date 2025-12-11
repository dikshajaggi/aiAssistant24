import React from 'react'
import dashboard from "/assets/dashboard.png"
import { features } from '../data'

const Hero2 = () => {
  return (
    <div className="mb-30 bg-[#ffe0e9] bg-[radial-gradient(circle,_rgba(255,237,243,1)_10%,_rgba(220,238,252,1)_100%)] w-[97%] rounded-2xl relative overflow-hidden flex flex-col justify-center items-center text-center px-6 md:px-16 py-16">
        <h1 className="text-[clamp(1.4rem,2.2vw,2.2rem)] font-extrabold text-gray-900 leading-snug relative z-10">
        From Appointments to Payments — 
        <span className="font-extrabold text-[#0ea5e9]">
            Let AI Handle the Busywork
        </span>, <br /> While You Handle the Smiles.
        </h1>
       <img
        src={dashboard}
        className="mt-10 w-9/12 relative z-10 rounded-2xl drop-shadow-[0_10px_10px_rgba(0,0,0,0.2)]"
        />
    </div>
  )
}

const Features = () => {
  return (
    <div className='flex flex-col gap-4 justify-evenly items-start w-[70%] mt-16 mb-26 h-[50%]'>
      <div className='flex justify-between items-stretch '>
       <div className='drop-shadow-[0_10px_10px_rgba(0,0,0,0.2)] flex flex-col items-start gap-2 bg-[#faf7ff] bg-[linear-gradient(0deg,_rgba(250,247,255,1)_40%,_rgba(243,224,255,0.3)_60%)] rounded-2xl p-6 w-[46%]'>
          <span className='text-2xl mb-4'>{features[0].caption}</span>
          {/* <div className='flex items-center gap-2'> */}
            <img src={features[0].img} alt="appointment" className='h-50 rounded-2xl mt-6 mb-10'/>
            <span>{features[0].desc}</span>
          {/* </div> */}
        </div>
        <div className='flex flex-col gap-6 w-[50%]'>
          <div className='drop-shadow-[0_10px_10px_rgba(0,0,0,0.2)] flex flex-col items-start gap-2 bg-[#f5ffff] bg-[linear-gradient(0deg,_rgba(245,255,255,1)_0%,_rgba(199,216,255,0.3)_100%)] rounded-2xl p-6 '>
            <span className='text-2xl mb-3'>{features[1].caption}</span>
            <div className='flex items-center gap-8 mb-4'>
              <img src={features[1].img} alt="revenue" className='h-36 rounded-2xl'/>
              <span className='text-base'>{features[1].desc}</span>
            </div>
          </div>
          <div className='drop-shadow-[0_10px_10px_rgba(0,0,0,0.2)] flex flex-col items-start gap-2 bg-[#f7fff7] bg-[linear-gradient(0deg,_rgba(247,255,247,1)_0%,_rgba(201,255,189,0.4)_100%)] rounded-2xl p-6'>
            <span className='text-2xl mb-3'>{features[2].caption}</span>
            <div className='flex items-center gap-8 mb-4'>
              <img src={features[2].img} alt="appointment" className='h-36 rounded-2xl'/>
              <span>{features[2].desc}</span>
            </div>
          </div>
        </div>
      </div>
      <span className='text-3xl font-semibold mt-8'>...and so much more!</span>
    </div>
  )
}

export  {Hero2, Features}
