import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import PageWrapper from "../pages/PageWrapper";
import DashboardHeader from "../components/DashboardHeader";

const SidebarLayout = () => {
  return (
    <>
      <ScrollToTop />
      <PageWrapper>
        <DashboardHeader />
        <main className="flex min-h-screen w-screen pt-24">
          {/* Sidebar with fixed width */}
          <div className="w-20 flex-shrink-0">
            <Sidebar />
          </div>

          {/* Outlet expands to remaining space */}
          <div className="flex-1">
            <Outlet />
          </div>
        </main>
        <Footer />
      </PageWrapper>
    </>
  );
};

export default SidebarLayout;


