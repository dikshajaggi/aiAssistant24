import React from 'react'
import PageWrapper from './PageWrapper'
import { CheckCircle } from "lucide-react";


const BookDemo = () => {
  return (
    <PageWrapper>
    <div className="flex flex-col items-center min-h-screen bg-gray-50 px-6 py-12">
      {/* Hero Section */}
      <div className="max-w-3xl text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-800">
          Book a <span className="text-primary">Live Demo</span>
        </h1>
        <p className="mt-4 text-gray-600 text-base md:text-lg">
          Experience how our AI Dental Assistant can simplify patient care,
          boost clinic efficiency, and help you focus on what matters most —{" "}
          <span className="font-semibold text-primary">brighter smiles!</span>
        </p>
      </div>

      {/* Form Section */}
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left Side (Intro) */}
        <div className="bg-primary text-textdark font-semibold flex flex-col justify-center items-center p-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 !text-white">
            Let’s Get Started
          </h2>
          <p className="text-sm md:text-base text-center opacity-90">
            Fill out the form, and one of our team members will reach out to
            schedule your personalized demo session.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-left">
            <li className="flex items-center gap-2">
              <CheckCircle size={18} className="text-white" />
              <span>30-minute walkthrough</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle size={18} className="text-white" />
              <span>Tailored to your clinic’s needs</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle size={18} className="text-white" />
              <span>Q&A with our product experts</span>
            </li>
          </ul>

        </div>

        {/* Right Side (Form) */}
        <form className="flex flex-col gap-4 p-8">
          <input
            type="text"
            placeholder="Full Name"
            className="border rounded-lg p-3 text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-primary"
          />

          {/* Phone Number with +91 */}
          <div className="flex">
            <span className="px-3 py-3 bg-gray-100 border border-r-0 rounded-l-lg text-gray-600 text-sm flex items-center">
              +91
            </span>
            <input
              type="tel"
              placeholder="Phone Number"
              className="flex-1 border rounded-r-lg p-3 text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <input
            type="email"
            placeholder="Email Address"
            className="border rounded-lg p-3 text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <input
            type="date"
            className="border rounded-lg p-3 text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <textarea
            rows="4"
            placeholder="Additional Notes"
            className="border rounded-lg p-3 text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          ></textarea>

          <button
            type="submit"
            className="mt-4 bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 shadow-md cursor-pointer transform hover:-translate-y-1 transition-all duration-300"
          >
            Schedule Demo
          </button>
        </form>
      </div>
    </div>
    </PageWrapper>
  )
}

export default BookDemo
