import React from 'react'
// import dashboard from "/assets/dashboard.png"

const Hero2 = () => {
  return (
    <div className="mb-20 bg-[#ffe0e9] bg-[radial-gradient(circle,_rgba(255,237,243,1)_10%,_rgba(220,238,252,1)_100%)] w-11/12 rounded-2xl relative overflow-hidden flex flex-col justify-center items-center text-center px-6 md:px-16 py-16">
        <h1 className="text-[clamp(1.4rem,2.2vw,2.2rem)] font-extrabold text-gray-900 leading-snug relative z-10">
        From Appointments to Payments — 
        <span className="font-extrabold text-[#0ea5e9]">
            Let AI Handle the Busywork
        </span>, <br /> While You Handle the Smiles.
        </h1>
       {/* <img
        src={dashboard}
        className="mt-6 w-9/12 relative z-10"
        /> */}
    </div>
  )
}

export default Hero2
