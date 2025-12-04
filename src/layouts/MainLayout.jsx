import React from 'react'
import Header from "../components/Header"
import Footer from "../components/Footer"
import { Outlet } from 'react-router-dom'
import PageWrapper from '../pages/PageWrapper'
import ScrollToTop from '../components/ScrollToTop'

const MainLayout = () => {
  return (
    <>
      <ScrollToTop />
      <PageWrapper>
        <Header />
        <main className="min-h-screen pt-24 w-screen overflow-hidden">
            <Outlet />
        </main>
        <Footer />
      </PageWrapper>
    </>
  )
}

export default MainLayout
