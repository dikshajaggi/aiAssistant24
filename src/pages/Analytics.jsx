import React from "react";
import PageWrapper from "./PageWrapper";
import ChartsAnalytics from "../components/ChartsAnalytics";

const Analytics = () => {
  return (
    <PageWrapper>
      <div className="flex flex-col items-center w-full max-w-7xl mx-auto pt-4 pb-10">
        <div className="flex items-start w-full mt-4">
          <h1 className="text-xl font-semibold mb-6">Analytics & Reports</h1>
          </div>
        <ChartsAnalytics />
      </div>
    </PageWrapper>
  );
};

export default Analytics;
