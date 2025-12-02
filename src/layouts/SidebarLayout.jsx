import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import MobileSidebar from "../components/MobileSidebar";
import ScrollToTop from "../components/ScrollToTop";
import PageWrapper from "../pages/PageWrapper";

const SidebarLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <ScrollToTop />
      <PageWrapper>
        <div className="flex min-h-screen w-full bg-[#fafafa] p-4">
          
          {/* Sidebar (Desktop) */}
          <div 
            className={`hidden md:flex fixed top-4 left-4 h-[calc(100%-2rem)] 
              bg-neutral shadow-lg rounded-xl transition-all duration-300
              ${collapsed ? "w-20" : "w-64"}`}
          >
            <Sidebar 
              collapsed={collapsed} 
              setCollapsed={setCollapsed}
            />
          </div>

          {/* Main Content */}
          <div
            className={`flex-1 flex flex-col transition-all duration-300 
                ${collapsed ? "md:ml-[100px]" : "md:ml-[268px]"} px-4 md:px-8 lg:px-12`}
          >
            <Outlet />
          </div>

          <MobileSidebar />
        </div>
      </PageWrapper>
    </>
  );
};

export default SidebarLayout;
