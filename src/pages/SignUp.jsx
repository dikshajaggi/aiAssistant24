import React, { useState } from "react";
import smilelytics from "../assets/smilelytics.png";
import { Link } from "react-router-dom";
import PageWrapper from "./PageWrapper";
import Modal from "../components/SignUpModal";

const SignUp = () => {

  const [modalOpen, setModalOpen] = useState(false);
  const modalDesc = "Success! Your account is live, and your AI assistant is waiting. Let’s start building smiles—one smart step at a time."
  const modalTitle = "Your account is ready!"

  const toggleModal = () => setModalOpen(!modalOpen);

  const handleSignUp  = (e) => {
    e.preventDefault()
    toggleModal()
  }

  return (
    <PageWrapper>
      <div className="flex flex-col md:flex-row items-center justify-center overflow-hidden">
      
      {/* Image Section */}
      <div className="hidden md:w-1/2 md:flex justify-center items-center">
        <img
          src={smilelytics}
          alt="bg-image"
          className="w-full max-h-screen object-contain md:object-cover"
        />
      </div>

      {/* Form Section */}
      <div className="relative z-10 md:bg-white/60 rounded-2xl p-6 sm:p-8 h-[600px] w-[100%] md:ml-[-50px] max-w-md md:max-w-[439px] md:h-[600px] flex flex-col items-center justify-evenly shadow-lg backdrop-blur">
        <div className="flex flex-col items-center justify-center text-center">
          <h4 className="text-lg md:text-xl font-bold mb-4">Welcome to <span className="text-secondary">SmileLytics.AI</span>!</h4>
          <span className="text-placeholder text-sm sm:text-base  md:text-base">
            Smart Clinic Management – From Patients to Payments, AI-Powered and Effortlessly Organized.
          </span>
        </div>

        <form className="flex flex-col gap-4 w-full">
          {/* Username */}
          <input
            placeholder="Enter username"
            type="text"
            className="border border-gray-300 rounded-lg p-2 text-sm sm:text-base focus:primary focus:outline focus:outline-secondary"
          />

          <input
            placeholder="Enter email"
            type="text"
            className="border border-gray-300 rounded-lg p-2 text-sm sm:text-base focus:primary focus:outline focus:outline-secondary"
          />

          <input
            placeholder="Enter phone no."
            type="number"
            className="border border-gray-300 rounded-lg p-2 text-sm sm:text-base focus:primary focus:outline focus:outline-primary"
          />

          {/* Password + Forgot Password */}
          <div className="flex flex-col">
            <input
              placeholder="Enter password"
              type="password"
              className="border border-gray-300 rounded-lg p-2 text-sm sm:text-base focus:primary focus:outline focus:outline-primary"
            />
            <span className="self-end mt-1 text-xs sm:text-sm text-primary hover:underline cursor-pointer">
              Forgot Password?
            </span>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSignUp}
            className="bg-primary cursor-pointer text-white p-2 rounded-xl shadow-md shadow-primary/40 hover:shadow-lg hover:shadow-primary/40 active:shadow-inner active:shadow-gray-600 transition-all duration-150"
          >
            Sign Up
          </button>
          <div className="text-xs sm:text-sm text-placeholder text-center">
            Already have an account?{" "}
            <Link to="/login">
              <span className="text-secondary hover:underline cursor-pointer font-bold">
                Login
              </span>
            </Link>
          </div>
        </form>
      </div>
      <Modal isOpen={modalOpen} toggle={toggleModal} title={modalTitle}>
        <p>{modalDesc}</p>
      </Modal>
    </div>
    </PageWrapper>
  );
};

export default SignUp;
