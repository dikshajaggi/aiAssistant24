import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import PageWrapper from "../pages/PageWrapper";
import DashboardHeader from "../components/DashboardHeader";
import MobileSidebar from "../components/MobileSidebar";

const SidebarLayout = () => {
  return (
    <>
      <ScrollToTop />
      <PageWrapper>
        <DashboardHeader />
        <main className="flex min-h-screen w-full pt-24">
          <div className="hidden md:flex w-20 flex-shrink-0">
            <Sidebar />
          </div>
          <div className="md:hidden fixed left-0 top-16 z-40">
          </div>
          <div className="flex-1 px-4 md:px-6">
            <Outlet />
          </div>
        </main>
        <MobileSidebar />
        <Footer />
      </PageWrapper>
    </>
  );
};

export default SidebarLayout;


