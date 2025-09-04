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
        <main className="flex justify-between min-h-screen min-w-screen pt-24">
            <Sidebar />
            <Outlet />
        </main>
        <Footer />
      </PageWrapper>
    </>
  );
};

export default SidebarLayout;


