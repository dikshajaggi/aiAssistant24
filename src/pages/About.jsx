import React from 'react'
import PageWrapper from './PageWrapper'
import visionMission from "../assets/vision.jpg"

const About = () => {
  return (
    <PageWrapper>
      <div className='mt-10 flex flex-col justify-start min-h-screen min-w-screen px-4 md:px-10'>
        <h1 className='text-[clamp(1.6rem,3vw,2rem)] font-bold text-center'>
          Get to Know Us Better
        </h1>

        <p className="mt-3 text-placeholder text-base md:text-lg font-bold text-center max-w-2xl mx-auto">
          Your AI-powered dental partner — simplifying patient care, streamlining clinic management, and helping your practice grow smarter every day
        </p>
      
        <div className='bg-textdark py-8 px-6 md:px-10 w-full rounded-xl mt-10 mb-10'>
          <h4 className='text-white font-bold text-xl md:text-3xl'>Our Mission</h4>

          <div className='flex flex-col md:flex-row items-center md:items-start justify-between gap-6 mt-8'>
            
            <p className='text-gray-400 text-sm md:text-base lg:text-lg leading-relaxed md:w-2/3'>
              We’re on a mission to empower every dentist with an AI-powered assistant that works as hard as they do. <br />
              Our vision is to transform dental practices into smarter, more connected, and stress-free clinics — where patient care comes first, and paperwork takes a back seat. <br />
              By blending intelligent automation with human creativity, we help dentists manage patients, track treatments, grow revenue, and engage patients effortlessly — so they can focus on what truly matters: <span className='md:font-semibold text-primary'>brighter smiles</span>.
            </p>

            <img 
              src={visionMission} 
              alt="vision-mission" 
              className='w-full max-w-[300px] md:max-w-[400px] rounded-2xl object-cover'
            />
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}

export default About
