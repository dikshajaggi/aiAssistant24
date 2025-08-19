import React from 'react'
import PageWrapper from './PageWrapper'
import visionMission from "../assets/vision.jpg"
import dentist from "../assets/dentist.png"

const About = () => {
  return (
    <PageWrapper>
      <div className='mt-10 flex flex-col justify-start min-h-screen w-full px-4 md:px-10'>
        
        {/* Heading */}
        <h1 className='text-[clamp(1.6rem,3vw,2rem)] font-bold text-center'>
          Get to Know Us Better
        </h1>

        {/* Tagline */}
        <p className="mt-3 text-placeholder text-base md:text-lg font-bold text-center max-w-2xl mx-auto">
          Your AI-powered dental partner — simplifying patient care, streamlining clinic management, and helping your practice grow smarter every day
        </p>

        {/* About Section */}
        <div className='flex flex-col lg:flex-row items-center gap-8 py-8 px-4 md:px-10 w-full mt-10 mb-10 text-base md:text-lg leading-relaxed'>
          
          {/* Text */}
          <p className="text-justify lg:w-2/3">
            At <span className='text-secondary ml-1 font-semibold'> SmileLytics</span>, we believe dentistry should focus more on smiles and less on spreadsheets. That’s why we built an AI-powered dental companion designed to take the heavy lifting out of clinic management — so dentists can focus on what they do best: <span className='text-secondary ml-1 font-semibold'>caring for patients</span>.
            <br /><br />
            Our assistant is like your digital chairside partner — always attentive, always reliable, and always learning. From managing patients to keeping track of visits, payments, and reminders, it makes running a dental practice smoother, smarter, and stress-free.
          </p>

          {/* Image */}
          <img 
            src={dentist} 
            alt="dentist-with-patient" 
            className='w-full max-w-[400px] lg:max-w-[500px] rounded-xl object-contain'
          />
        </div>
      
        {/* Mission Section */}
        <div className='bg-textdark py-10 px-6 md:px-10 w-full rounded-xl mt-10 mb-10 flex flex-col gap-8'>
          
          {/* Title */}
          <h4 className='text-white font-bold text-xl md:text-3xl text-center'>
            Our Mission
          </h4>

          {/* Content always stacked (column layout only) */}
          <div className='flex flex-col lg:flex-row lg:justify-evenly items-center gap-8'>
            
            {/* Mission Text */}
            <p className='text-gray-400 text-sm md:text-base lg:text-lg leading-relaxed text-justify max-w-3xl'>
              We’re on a mission to empower every dentist with an <span className='text-primary md:font-semibold'>AI-powered assistant</span> that works as hard as they do. <br /><br />
              Our vision is to transform dental practices into smarter, more connected, and stress-free clinics — where patient care comes first, and paperwork takes a back seat. <br /><br />
              By blending intelligent automation with human creativity, we help dentists manage patients, track treatments, grow revenue, and engage patients effortlessly — so they can focus on what truly matters: <span className='md:font-semibold text-primary'>brighter smiles</span>.
            </p>

            {/* Mission Image */}
            <img 
              src={visionMission} 
              alt="vision-mission" 
              className='w-full max-w-[350px] md:max-w-[400px] rounded-2xl object-cover'
            />
          </div>
        </div>

        {/* Why We Built It Section */}
        <div className= "py-8 px-4 md:px-10 w-full mt-5 mb-16">
          <h4 className="text-textdark font-bold text-xl md:text-2xl">
            Why We Built It
          </h4>

          <div className="gap-8 mt-8 mx-auto">
            
            {/* Content */}
            <p className="text-sm md:text-base lg:text-lg leading-relaxed md:text-justify">
              Dentists spend countless hours juggling patient files, finances, and follow-ups. 
              We wanted to create an assistant that works quietly in the background, 
              handling all the admin chaos while you focus on building brighter smiles.
            </p>

            <p className="text-sm md:text-base lg:text-lg leading-relaxed md:text-justify">
              With the power of <span className="font-semibold text-secondary">AI & automation</span>, 
              we’re not just helping dentists manage their clinics — 
              we’re helping them grow them.
            </p>
          </div>
        </div>

      </div>
    </PageWrapper>
  )
}

export default About
