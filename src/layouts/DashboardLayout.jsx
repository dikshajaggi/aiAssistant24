import DashboardHeader from '@/components/DashboardHeader';
import DashboardSidebar from '@/components/DashboardSidebar';
import GlobalSearch from '@/components/common/GlobalSearch';
import { LayoutContext } from '@/context/LayoutContext';
import { useContext } from 'react';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
    const { collapsed } = useContext(LayoutContext);

  return (
    <div className="flex w-full bg-gray-50">
      {/* Sidebar - Fixed and full height */}
      <div className="fixed top-0 left-0 h-screen z-40">
        <DashboardSidebar />
      </div>

      {/* Main Content Area */}
       <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${
          collapsed ? "ml-22" : "ml-60"
        }`}
      >
        <div className="sticky top-0 z-30">
          <DashboardHeader />
        </div>
        <main className="flex-1 overflow-y-auto px-6 lg:px-10 xl:px-16 2xl:px-20 py-6">
          <div className="w-full max-w-[1800px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
      <GlobalSearch />
    </div>
  );
};

export default DashboardLayout;
