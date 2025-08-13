import React from 'react'
import notFound from "../assets/notFound.png"
import PageWrapper from './PageWrapper'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <PageWrapper>
     <div className='flex flex-col justify-center items-center p-10'>
        <h1 className='mb-6 text-center text-lg md:text-2xl font-extrabold text-placeholder'> Looks like this URL has a cavity — Page Not Found!</h1>
        <img src = {notFound} alt="notFound" className='h-[100px] md:h-[200px]' />
        <Link to ="/"><button className='cursor-pointer bg-primary mt-20 h-[40px] w-[100px] md:h-[60px] md:w-[150px] rounded-md text-textlight text-sm md:text-base font-bold'>Go to Home</button></Link>
     </div>
    </PageWrapper>
  )
}

export default NotFound
