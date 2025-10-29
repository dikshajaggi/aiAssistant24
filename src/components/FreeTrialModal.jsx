import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const FreeTrialModal = ({ isFreeOpen, toggleFree }) => {
  const [step, setStep] = useState("email"); // "email" → "otp"
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate()

  if (!isFreeOpen) return null;

  const handleSendOtp = () => {
    if (!email.trim()) return alert("Please enter your email or phone");
    // Simulate sending OTP (in real world: API call)
    setStep("otp");
  };

  const handleVerifyOtp = () => {
    if (!otp.trim()) return alert("Please enter the OTP");
    alert("Free trial activated successfully!");
    toggleFree();
    navigate("/dashboard")
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black opacity-60"
        onClick={toggleFree}
      />

      {/* Modal Box */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 z-10 mx-4 sm:mx-0">
        {/* Close Button */}
        <button
          onClick={toggleFree}
          className="absolute top-3 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold cursor-pointer"
        >
          &times;
        </button>

        {/* Title */}
        <h2 className="text-xl font-bold text-center text-secondary mb-1">
          Start Your Free Trial
        </h2>
        <p className="text-center text-gray-500 text-sm mb-6">
          No credit card required. Verify your account to continue.
        </p>

        {/* Step 1 — Email or Phone */}
        {step === "email" && (
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Enter your email or phone number
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              onClick={handleSendOtp}
              className="w-full bg-secondary hover:bg-secondary/80 text-white font-semibold py-2 px-4 rounded-lg transition cursor-pointer"
            >
              Send OTP
            </button>
          </div>
        )}

        {/* Step 2 — OTP Verification */}
        {step === "otp" && (
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Enter the OTP sent to <span className="font-semibold">{email}</span>
            </label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter 6-digit OTP"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary tracking-widest text-center"
              maxLength="6"
            />

            <button
              onClick={handleVerifyOtp}
              className="w-full bg-secondary hover:bg-secondary/80 text-white font-semibold py-2 px-4 rounded-lg transition cursor-pointer"
            >
              Verify & Start Free Trial
            </button>

            <p className="text-xs text-gray-500 text-center mt-2">
              Didn’t receive OTP?{" "}
              <button
                onClick={handleSendOtp}
                className="text-secondary hover:underline font-medium cursor-pointer"
              >
                Resend
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FreeTrialModal;
