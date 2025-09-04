import React from "react";
import PageWrapper from "./PageWrapper";
import ChartsAnalytics from "../components/ChartsAnalytics";

const Analytics = () => {
  return (
    <PageWrapper>
      <h1 className="text-2xl font-bold mb-6">Analytics & Reports</h1>
      <ChartsAnalytics />
    </PageWrapper>
  );
};

export default Analytics;
