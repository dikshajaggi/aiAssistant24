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
      <div className='flex justify-center items-center flex-col px-6 md:px-4 mt-20'>
        <h1 className='text-[clamp(1.6rem,4vw,2.4rem)] font-bold text-center'>From Appointments to Payments — <span className='font-bold bg-gradient-to-r from-[#01CFC9] to-[#0ea5e9] bg-clip-text text-transparent'>Let AI Handle the Busywork</span>, <br></br> While You Handle the Smiles.</h1>
        <TypingHero />
        <button className='cursor-pointer bg-gradient-to-r from-[#01CFC9] to-[#0ea5e9] text-textlight text-lg h-16 w-64 rounded-xl shadow-[0_0_20px_rgba(1,207,201,0.6)]
        transform hover:-translate-y-1 transition-all duration-300 font-bold text-md' onClick={handleJoinCta}>Start Your FREE Trial</button>
        <section className="max-w-6xl mx-auto px-4 py-12 space-y-20 mt-20 md:mt-40">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`flex flex-col justify-center md:flex-row md:justify-start items-center md:gap-12 mb-30 md:mb-40 ${
              index % 2 === 0 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Image */}
            <div className="flex-1">
              <img
                src={feature.image}
                alt={feature.caption}
                className= "w-[500px] h-auto rounded-xl mb-10 md:mb-0"
              />
            </div>

            {/* Text */}
            <div className="flex-1 flex flex-col justify-center items-center md:items-start">
              <h2 className="text-2xl md:text-4xl font-extrabold mb-4 text-primary text-center md:text-left">
                {feature.caption}
              </h2>
              <p className="text-gray-600 leading-relaxed text-center md:text-left">
                {feature.desc}
              </p>
              <button className='px-6 py-2 mt-4 cursor-pointer bg-gradient-to-r from-[#01CFC9] to-[#0ea5e9] text-textlight h-10 w-36 rounded-xl
              transform hover:-translate-y-1 transition-all duration-300 font-bold' onClick={handleJoinCta}>Join Now </button>
            </div>
          </div>
        ))}
        </section>
      </div>
    </PageWrapper>
  )
}

export default Home
