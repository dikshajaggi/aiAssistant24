import React, { useState } from "react";
import authBg from "/assets/authBg.png";
import { Link } from "react-router-dom";
import PageWrapper from "./PageWrapper";
import Modal from "../components/SignUpModal";
import { supabase } from "../utils/supabaseClient";
import { Eye, EyeOff } from "lucide-react";

const SignUp = () => {

  const [modalOpen, setModalOpen] = useState(false);
  const modalDesc = "Success! Your account is live, and your AI assistant is waiting. Let’s start building smiles—one smart step at a time."
  const modalTitle = "Your account is ready!"

  const toggleModal = () => setModalOpen(!modalOpen);


  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(null)

  const handleSignUp = async (e) => {
    e.preventDefault()
    // setError('')

    // const { error } = await supabase.auth.signUp({ email, password, phoneNumber})

    if (error) {
      setError(error.message)
    } else {
      toggleModal()
    }
  }

  return (
    <PageWrapper>
      <div className="flex flex-col md:flex-row items-center justify-center overflow-hidden">
      
      {/* Image Section */}
      <div className="hidden md:w-1/2 md:flex justify-center items-center">
        <img
          src={authBg}
          loading="lazy"
          alt="bg-image"
          className="w-full max-h-screen object-contain md:object-cover"
        />
      </div>

      {/* Form Section */}
      <div className="relative z-10 md:bg-white/60 rounded-2xl p-6 sm:p-8 h-[600px] w-[100%] md:ml-[-100px] max-w-md md:max-w-[439px] md:h-[600px] flex flex-col items-center justify-evenly shadow-lg">
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 text-sm sm:text-base focus:primary focus:outline focus:outline-secondary"
          />

          <input
            placeholder="Enter phone no."
            type="number"
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 text-sm sm:text-base focus:primary focus:outline focus:outline-primary"
          />

          {/* Password + Forgot Password */}
          <div className="relative flex flex-col">
            <input
              placeholder="Enter password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 text-sm sm:text-base focus:primary focus:outline focus:outline-primary"
            />
            <span
                className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSignUp}
            className="bg-secondary cursor-pointer text-white p-2 rounded-xl shadow-md shadow-primary/40 hover:shadow-lg hover:shadow-primary/40 active:shadow-inner active:shadow-gray-600 transition-all duration-150"
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
