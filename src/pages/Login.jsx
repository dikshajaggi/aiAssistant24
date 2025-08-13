import React, { useContext } from "react";
import authBg from "../assets/authBg.png";
import { Link, useNavigate } from "react-router-dom";
import PageWrapper from "./PageWrapper";
import { MainContext } from "../context/MainContext";

const Login = () => {

  const {isSubscribed} = useContext(MainContext)
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    if (isSubscribed) navigate("/dashboard")
    else navigate("/pricing")
  }

  return (
    <PageWrapper>
      <div className="flex flex-col md:flex-row min-h-screen items-center justify-center overflow-hidden">
      
      {/* Image Section */}
      <div className="hidden md:w-[550px] md:flex justify-center items-center">
        <img
          src={authBg}
          alt="bg-image"
          className="w-full max-h-screen object-contain md:object-cover"
        />
      </div>

      {/* Form Section */}
      <div className="relative z-10 bg-white/60 rounded-2xl p-6 sm:p-8 h-[600px] w-[100%] md:ml-[-50px] max-w-md md:max-w-[439px] md:h-[500px] flex flex-col items-center justify-evenly shadow-lg backdrop-blur">
        <div className="flex flex-col items-center justify-center text-center">
          <h4 className="text-lg md:text-xl font-bold mb-4">Welcome to Company Name!</h4>
          <span className="text-placeholder text-sm sm:text-base  md:text-md">
            Smart Clinic Management – From Patients to Payments, AI-Powered and Effortlessly Organized.
          </span>
        </div>

        <form className="flex flex-col gap-4 w-full">
          {/* Username */}
          <input
            placeholder="Enter username"
            type="text"
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
            onClick={handleLogin}
            className="cursor-pointer bg-primary text-white p-2 rounded-xl shadow-md shadow-primary/40 hover:shadow-lg hover:shadow-primary/40 active:shadow-inner active:shadow-gray-600 transition-all duration-150"
          >
            Login
          </button>
        </form>

        {/* Signup link */}
        <div className="mt-4 text-xs sm:text-sm text-placeholder text-center">
          Don’t have an account?{" "}
          <Link to="/signup">
            <span className="text-primary hover:underline cursor-pointer font-bold">
              Sign Up
            </span>
          </Link>
        </div>
      </div>
    </div>
    </PageWrapper>
  );
};

export default Login;
