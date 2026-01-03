import React, { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";

const steps = [
  { elementId: "nav-dashboard", text: "This is your clinic dashboard overview." },
  { elementId: "nav-patients", text: "Manage patient records here." },
  { elementId: "nav-appointments", text: "View and book appointments using the calendar." },
  { elementId: "nav-reminders", text: "Send WhatsApp and Email reminders for appointments." },
  { elementId: "nav-analytics", text: "View clinic insights and trends." },
  { elementId: "nav-ai-analysis", text: "Upload affected area image for AI analysis and report." },
//   { elementId: "nav-billing", text: "Generate patient treatment bills with automatic cost calculation." },
//   { elementId: "nav-prescription", text: "Create prescriptions instantly during treatment." },
];


const OnboardingTour = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem("smilytics_onboarding_seen");
    if (!seen) setVisible(true);
  }, []);

  useEffect(() => {
    if (!visible) return;

    const step = steps[currentStep];
    const el = document.getElementById(step.elementId);
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const tooltip = document.getElementById("onboarding-tooltip");

    tooltip.style.top = `${rect.top + window.scrollY - 10}px`;
    tooltip.style.left = `${rect.left + rect.width + 10}px`;
    tooltip.style.display = "block";

    el.classList.add("ring-2", "ring-primary1", "rounded-lg");
    return () => el.classList.remove("ring-2", "ring-primary1");
  }, [currentStep, visible]);

  const handleNext = () => {
    if (currentStep === steps.length - 1) {
      handleClose();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSkip = () => {
    handleClose();
  };

  const handleClose = () => {
    setVisible(false);
    localStorage.setItem("smilytics_onboarding_seen", "true");
    localStorage.setItem("smilytics_onboarding_seen", "true");
    localStorage.setItem("smilytics_onboarding_seen", "true");
    localStorage.setItem("smilytics_onboarding_seen", "true");
    localStorage.setItem("smilytics_onboarding_seen", "true");
    localStorage.setItem("smilytics_onboarding_seen", "true");
    localStorage.setItem("smilytics_onboarding_seen", "true");
    localStorage.setItem("smilytics_onboarding_seen", "true");
    localStorage.setItem("smilytics_onboarding_seen", "true");
    localStorage.setItem("smilytics_onboarding_seen", "true");
    localStorage.setItem("smilytics_onboarding_seen", "true");
    localStorage.setItem("smilytics_onboarding_seen", "true");
    localStorage.setItem("smilytics_onboarding_seen", "true");
    localStorage.setItem("smilytics_onboarding_seen", "true");
  };

  if (!visible) return null;

  return (
    <>
      {/* Tooltip */}
      <div
        id="onboarding-tooltip"
        className="absolute bg-white shadow-lg border text-sm p-3 rounded-xl w-56"
        style={{ display: "none", position: "absolute" }}
      >
        {steps[currentStep].text}

        {/* Controls */}
        <div className="flex justify-between items-center mt-3">
          <button onClick={handleSkip} className="text-xs text-gray-500 hover:underline cursor-pointer">
            Skip
          </button>
          <button onClick={handleNext} className="text-xs flex items-center gap-1 bg-primary1 text-white px-2 py-1 rounded-lg cursor-pointer hover:opacity-90">
            {currentStep === steps.length - 1 ? "Done" : "Next"}
            <ChevronRight size={12}/>
          </button>
        </div>
      </div>

      {/* Mobile Bottom Bar (for small screens) */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-11/12 sm:hidden bg-white border shadow-md rounded-xl p-3 text-xs flex justify-between items-center">
        <span>{steps[currentStep].text}</span>
        <div className="flex gap-2">
          <button onClick={handleSkip} className="cursor-pointer text-gray-500 underline">Skip</button>
          <button onClick={handleNext} className="cursor-pointer flex items-center gap-1 bg-primary1 text-white px-2 py-1 rounded-lg hover:opacity-90">
            {currentStep === steps.length - 1 ? "Done" : "Next"}
            <ChevronRight size={10}/>
          </button>
        </div>
      </div>
    </>
  );
};

export default OnboardingTour;
