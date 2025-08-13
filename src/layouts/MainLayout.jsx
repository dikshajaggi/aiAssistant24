import React from 'react'
import Header from "../components/Header"
import Footer from "../components/Footer"
import { Outlet } from 'react-router-dom'
import PageWrapper from '../pages/PageWrapper'

const MainLayout = () => {
  return (
    <PageWrapper>
        <Header />
        <main className="min-h-screen pt-24">
            <Outlet />
        </main>
        <Footer />
    </PageWrapper>
  )
}

export default MainLayout
