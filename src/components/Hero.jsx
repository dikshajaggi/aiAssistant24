import React from 'react'
import TypingHero from './TypingHero'
import collage from "/assets/collage.png"
import { useLocation } from 'react-router-dom';
import Header from './Header';

const Hero = ({handleJoinCta}) => {
    const location = useLocation();
    const isHome = location.pathname === "/";

  return (
    <>
    <div 
    className={`
        mb-20 bg-[#ffe0e9]
        bg-[radial-gradient(circle,_rgba(255,237,243,1)_20%,_rgba(220,238,252,1)_100%)] 
        w-[97%] rounded-2xl relative overflow-hidden 
        flex flex-col justify-center items-center text-center 
        px-6 md:px-16 py-16
        ${isHome ? "pt-32 md:pt-40" : ""}
    `}
    >      {/* Render header inside hero on home */}
      {isHome && (
        <div className="absolute top-0 left-0 w-full z-20">
          <Header isHome={isHome} />
        </div>
      )}

        <h1 className="text-[clamp(1.8rem,4vw,2.6rem)] font-extrabold text-gray-900 relative">
        All-in-One AI Dental Clinic Management
        </h1>

        <div className="relative z-10">
        <TypingHero />
        </div>

        <img src={collage} className='w-9/12' alt="collage" />

       <div className='flex flex-col md:flex-row items-center gap-4 mt-6'>
            <button
            className="mt-4 cursor-pointer bg-gradient-to-r from-[#0F2650] to-[#0ea5e9] text-white 
                h-12 w-50 rounded-xl text-base shadow-lg 
                hover:-translate-y-1 active:scale-95 
                transition-all duration-300 relative z-10"
            onClick={handleJoinCta}
            >
            Start Your FREE Trial
            </button>

            <button
            className="mt-4 cursor-pointer bg-white text-[#0F2650] 
                h-12 w-50 rounded-xl text-base shadow-lg font-semibold
                hover:-translate-y-1 active:scale-95 
                transition-all duration-300 relative z-10"
            onClick={handleJoinCta}
            >
            Book Demo 
            </button>
       </div>

        <p className="mt-3 text-sm md:text-base text-gray-600 relative z-10 font-medium">
        14-day free trial • No credit card required
        </p>
    </div>
    </>
  )
}

export default Hero
