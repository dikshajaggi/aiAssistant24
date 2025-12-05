import React, { useContext } from 'react'
import PageWrapper from './PageWrapper'
import { features } from '../data'
import { useNavigate } from 'react-router-dom'
import { MainContext } from '../context/MainContext'
// import robo from "/assets/robo.png"
// import doctor from "/assets/doctor.png"
import Hero from '@/components/Hero'
import Hero2 from '@/components/Hero2'

const Home = () => {

  const navigate = useNavigate()
  const {signedUp} = useContext(MainContext)
  const handleJoinCta  = () => {
    if (signedUp) navigate("/pricing")
    else navigate("/signup")
  }

  return (
    <PageWrapper>
      <div className='min-w-screen flex justify-center items-center flex-col px-6 md:px-4 mt-0'>
        <Hero handleJoinCta={handleJoinCta} />
      
        <Hero2 />
      </div>
    </PageWrapper>
  )
}

export default Home
