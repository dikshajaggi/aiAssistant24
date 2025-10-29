import React, { useContext, useState } from "react";
import authBg from "/assets/authBg.png";
import { Link, useNavigate } from "react-router-dom";
import PageWrapper from "./PageWrapper";
import { MainContext } from "../context/MainContext";
import { supabase } from "../utils/supabaseClient";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
    const { isSubscribed, setSignedUp } = useContext(MainContext);
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
      e.preventDefault();
      setError("");

      // const { data: dataUser, error } = await supabase.auth.signInWithPassword({
      //   email,
      //   password,
      // });

      // if (error) {
      //   setError(error.message);
      //   return;
      // }

      // const user = dataUser.user;
      // setSignedUp(user)

      // if (!user.email_confirmed_at) {
      //   // resend confirmation email
      //   await supabase.auth.resend({
      //     type: "signup",
      //     email,
      //   });

      //   setError(
      //     "Your email is not confirmed. We've sent you a new confirmation link. Please check your inbox."
      //   );
      //   return;
      // }

      // localStorage.setItem("token", dataUser.session?.access_token);

      if (isSubscribed) navigate("/dashboard");
      else navigate("/pricing");
  };


  return (
    <PageWrapper>
      <div className="flex flex-col md:flex-row items-center justify-center">
        {/* Image Section */}
        <div className="hidden md:flex md:w-1/2 justify-center items-center">
          <img
            src={authBg}
            alt="bg-image"
            loading="lazy"
            className="w-full max-h-screen"
          />
        </div>

        {/* Form Section */}
        <div className="relative z-10 md:bg-white/60 rounded-2xl p-6 sm:p-8 h-[600px] w-[100%] md:ml-[-100px] max-w-md md:max-w-[439px] md:h-[500px] flex flex-col items-center justify-evenly shadow-lg">
          <div className="flex flex-col items-center justify-center text-center">
            <h4 className="text-lg md:text-xl font-bold mb-4">
              Welcome to <span className="text-secondary">SmileLytics.AI</span>!
            </h4>
            <span className="text-placeholder text-sm sm:text-base md:text-base">
              Smart Clinic Management – From Patients to Payments, AI-Powered and Effortlessly Organized.
            </span>
          </div>

          <form className="flex flex-col gap-4 w-full">
            {/* Email */}
            <input
              placeholder="Enter username"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 text-sm sm:text-base focus:primary focus:outline focus:outline-primary"
            />

            {/* Password + Show/Hide + Forgot Password */}
            <div className="relative flex flex-col">
              <input
                placeholder="Enter password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 text-sm sm:text-base focus:primary focus:outline focus:outline-primary pr-10"
              />
              {/* Eye Icon */}
              <span
                className="absolute right-2 top-1/3 -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
              <span className="self-end mt-1 text-xs sm:text-sm text-secondary hover:underline cursor-pointer">
                Forgot Password?
              </span>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleLogin}
              className="cursor-pointer bg-secondary text-white p-2 rounded-xl shadow-md shadow-primary/40 hover:shadow-lg hover:shadow-primary/40 active:shadow-inner active:shadow-gray-600 transition-all duration-150"
            >
              Login
            </button>

            {/* Signup link */}
            <div className="text-xs sm:text-sm text-placeholder text-center">
              Don’t have an account?{" "}
              <Link to="/signup">
                <span className="text-secondary hover:underline cursor-pointer font-bold">
                  Sign Up
                </span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Login;
