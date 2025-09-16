import React from "react";
import PageWrapper from "./PageWrapper";
import ChartsAnalytics from "../components/ChartsAnalytics";

const Analytics = () => {
  return (
    <PageWrapper>
      <div className="flex flex-col items-center w-full max-w-7xl mx-auto pt-4 pb-10">
        <h1 className="text-2xl font-bold mb-6">Analytics & Reports</h1>
        <ChartsAnalytics />
      </div>
    </PageWrapper>
  );
};

export default Analytics;
