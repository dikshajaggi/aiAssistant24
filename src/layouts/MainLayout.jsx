import React from 'react'
import Header from "../components/Header"
import Footer from "../components/Footer"
import { Outlet, useLocation } from 'react-router-dom'
import PageWrapper from '../pages/PageWrapper'
import ScrollToTop from '../components/ScrollToTop'

const MainLayout = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <>
      <ScrollToTop />
      <PageWrapper>

        {/* Show Header normally on all pages except "/" */}
        {!isHome && <Header />}

        <main className={`min-h-screen w-screen overflow-hidden ${!isHome ? "pt-24" : "pt-4 px-0"}`}>
          <Outlet />
        </main>

        <Footer />
        
      </PageWrapper>
    </>
  )
}

export default MainLayout
