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
        <div className="flex min-h-screen w-full bg-[#fafafa] p-4">
          {/* Sidebar (Desktop) */}
          <div className="hidden md:flex fixed top-4 left-4 h-[calc(100%-2rem)] w-64 rounded-xl shadow-lg bg-neutral">
            <Sidebar />
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col md:ml-[268px]">
            <Outlet />
          </div>

          {/* Mobile Sidebar (Drawer) */}
          <MobileSidebar />
        </div>
      </PageWrapper>
    </>
  );
};

export default SidebarLayout;
