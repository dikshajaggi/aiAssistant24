import React, { useContext } from 'react'
import PageWrapper from './PageWrapper'
import TypingHero from '../components/TypingHero'
import { features } from '../data'
import { useNavigate } from 'react-router-dom'
import { MainContext } from '../context/MainContext'

const Home = () => {

  const navigate = useNavigate()
  const {signedUp} = useContext(MainContext)

  const handleJoinCta  = () => {
    if (signedUp) navigate("/pricing")
    else navigate("/signup")
  }

  return (
    <PageWrapper>
      <div className='min-w-screen flex justify-center items-center flex-col px-6 md:px-4 mt-10'>
        <div className="relative overflow-hidden flex flex-col justify-center items-center text-center px-6 md:px-16 py-16">
              
          <h1 className="text-[clamp(1.8rem,4vw,2.6rem)] font-extrabold text-gray-900 leading-snug relative z-10">
            From Appointments to Payments — 
            <span className="font-extrabold bg-gradient-to-r from-[#0ea5e9] to-[#46D3FF] bg-clip-text text-transparent">
              Let AI Handle the Busywork
            </span>, <br /> While You Handle the Smiles.
          </h1>

          <div className="mt-4 relative z-10">
            <TypingHero />
          </div>

          <button
            className="mt-8 cursor-pointer bg-gradient-to-r from-[#0F2650] to-[#0ea5e9] text-white 
              h-16 w-64 rounded-2xl text-lg font-semibold shadow-lg 
              hover:shadow-[0_0_25px_rgba(14,165,233,0.6)] hover:-translate-y-1 active:scale-95 
              transition-all duration-300 relative z-10"
            onClick={handleJoinCta}
          >
            Start Your FREE Trial
          </button>

          <p className="mt-3 text-sm md:text-base text-gray-600 relative z-10 font-medium">
            14-day free trial • No credit card required
          </p>
        </div>
        <section className="max-w-6xl mx-auto px-4 py-12 space-y-20 md:mt-20">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`flex flex-col justify-center md:flex-row md:justify-start items-center md:gap-12 mb-30 md:mb-40 ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
          >
            {/* Image */}
            <div className="flex-1">
              <img
                src={feature.image}
                alt={feature.caption}
                loading="lazy"
                className= "w-[500px] h-auto rounded-xl mb-10 md:mb-0"
              />
            </div>

            {/* Text */}
            <div className="flex-1 flex flex-col justify-center items-center md:items-start">
              <h2 className="text-2xl md:text-4xl font-extrabold mb-4 text-secondary text-center md:text-left">
                {feature.caption}
              </h2>
              <p className="text-gray-600 leading-relaxed text-center md:text-left">
                {feature.desc}
              </p>
              <button className='px-6 py-2 mt-4 cursor-pointer bg-gradient-to-r from-[#0F2650] to-[#0ea5e9] text-textlight h-10 w-36 rounded-xl
              transform hover:-translate-y-1 transition-all duration-300 font-medium' onClick={handleJoinCta}>Join Now </button>
            </div>
          </div>
        ))}
        </section>
      </div>
    </PageWrapper>
  )
}

export default Home
