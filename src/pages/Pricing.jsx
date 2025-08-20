import React, { useState } from 'react'
import PageWrapper from './PageWrapper'
import { Check, Star, Sparkles } from "lucide-react";
import { AnimatePresence } from 'framer-motion';
import { motion } from "framer-motion";


const Feature = ({ children }) => (
  <li className="flex items-start gap-3">
    <Check className="mt-1 h-5 w-5 text-primary shrink-0" />
    <span className="text-sm md:text-[15px] text-gray-700">{children}</span>
  </li>
);

const Pricing = () => {
  const [isActive, setIsActive] = useState("monthly")


  return (
    <PageWrapper>
      <div className="flex flex-col items-center px-4 py-10 min-w-screen">
      <h1 className="font-bold text-xl md:text-3xl text-center">
        Pick a Plan & Let AI Do the Rest
      </h1>

      <p className="text-gray-700 text-sm md:text-base  text-center mt-6 max-w-2xl">
        Choose the plan that fits your clinic best, and watch our AI handle patients, appointments, 
        payments, and marketing—so you can focus on delivering exceptional dental care.
      </p>

      {/* Buttons */}
      <div className="flex justify-center items-center gap-4 mt-14 flex-wrap">
        <button
          className={`${isActive === "monthly"
              ? "bg-secondary text-white border-2 border-secondary"
              : "bg-transparent border-2 border-secondary"
            } cursor-pointer font-semibold px-8 md:px-12 py-3 rounded-2xl transition-all duration-300 ease-in-out`}
          onClick={() => setIsActive("monthly")}
        >
          Monthly
        </button>

        <button
          className={`${isActive === "yearly"
              ? "bg-secondary text-white border-2 border-secondary"
              : "bg-transparent border-2 border-secondary"
            } cursor-pointer font-semibold px-8 md:px-12 py-3 rounded-2xl transition-all duration-300 ease-in-out`}
          onClick={() => setIsActive("yearly")}
        >
          Yearly
        </button>
      </div>

        {/* 14-Day Trial Banner */}
        <div className="relative overflow-hidden rounded-2xl p-[1px] mb-10 mt-10 md:mt-15">
          <div className="absolute inset-0 bg-gradient-to-r from-[#46D3FF] to-[#0ea5e9] opacity-90" />
          <div className="relative bg-white/70 backdrop-blur-md rounded-2xl p-5 md:p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-start gap-3">
                <Sparkles className="h-6 w-6 text-primary mt-0.5" />
                <div>
                  <p className="font-bold text-base md:text-lg">
                    14-Day Free Trial <span className="font-medium">(₹0 – No credit card required)</span>
                  </p>
                  <ul className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-700">
                    <li>Access to <b>Pro Plan</b> features for 14 days</li>
                    <li>No restriction on patient or visit count</li>
                    <li>All data saved — continue seamlessly after upgrade</li>
                    <li>Cancel anytime during trial without charges</li>
                  </ul>
                </div>
              </div>
              <button
                className="shrink-0 bg-textdark text-textlight px-5 py-3 rounded-xl shadow-md hover:shadow-lg active:shadow-inner cursor-pointer transform hover:-translate-y-1 transition-all duration-300 "
              >
                Start Free Trial
              </button>
            </div>
          </div>
        </div>

        {/* Annual Plans Note */}
        {isActive === "yearly" && <div className="text-center mb-6">
          <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs md:text-sm font-semibold text-primary shadow">
            Save 2 months — Pay for 10, get 12
          </span>
        </div>}

        <AnimatePresence mode="wait">
        {/* Pricing Cards */}
        {isActive==="yearly" ? 
        <motion.div
          key="yearly"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {/* Starter */}
          <div className="group relative rounded-2xl border border-gray-200 bg-white p-6 md:p-7 shadow-sm hover:shadow-lg transition-all">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg md:text-xl font-bold">Starter</h3>
            </div>
            <div className="mb-5">
              <div className="flex items-end gap-1">
                <span className="text-2xl md:text-3xl font-extrabold">₹24,990</span>
                <span className="text-sm text-placeholder">/year</span>
              </div>
              <div className="text-xs text-placeholder">≈ ₹2,082/month (billed annually)</div>
            </div>
            <ul className="space-y-3 mb-6">
              <Feature>Basic patient &amp; visit tracking</Feature>
              <Feature>SMS + email reminders</Feature>
              <Feature>Simple analytics dashboard</Feature>
            </ul>
            <button className="w-full bg-primary text-textlight py-3 rounded-xl shadow-md hover:shadow-lg active:shadow-inner transition-all">
              Choose Starter
            </button>
          </div>

          {/* Pro (Most Popular) */}
          <div className="group relative rounded-2xl border border-transparent bg-white p-[1px] shadow-lg">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-textlight shadow">
                <Star className="h-4 w-4" /> Most Popular
              </span>
            </div>
            {/* Gradient border wrapper */}
            <div className="rounded-2xl bg-gradient-to-b from-[#0F2650] to-[#0ea5e9] p-[4px]">
              <div className="rounded-2xl bg-white p-6 md:p-7">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg md:text-xl font-extrabold">Pro</h3>
                </div>
                <div className="mb-5">
                  <div className="flex items-end gap-1">
                    <span className="text-2xl md:text-3xl font-extrabold">₹49,990</span>
                    <span className="text-sm text-placeholder">/year</span>
                  </div>
                  <div className="text-xs text-placeholder">≈ ₹4,165/month (billed annually)</div>
                </div>
                <ul className="space-y-3 mb-6">
                  <Feature>Everything in Starter</Feature>
                  <Feature>AI-powered social posts + promotional emails</Feature>
                  <Feature>Advanced monthly reports (charts, revenue, etc.)</Feature>
                  <Feature>10 clinic users included</Feature>
                </ul>
                <button className="w-full bg-primary text-textlight py-3 rounded-xl shadow-md hover:shadow-lg active:shadow-inner transition-all">
                  Choose Pro
                </button>
              </div>
            </div>
          </div>

          {/* Premium */}
          <div className="group relative rounded-2xl border border-gray-200 bg-white p-6 md:p-7 shadow-sm hover:shadow-lg transition-all">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg md:text-xl font-bold">Premium</h3>
            </div>
            <div className="mb-5">
              <div className="flex items-end gap-1">
                <span className="text-2xl md:text-3xl font-extrabold">₹99,990</span>
                <span className="text-sm text-placeholder">/year</span>
              </div>
              <div className="text-xs text-placeholder">≈ ₹8,332/month (billed annually)</div>
            </div>
            <ul className="space-y-3 mb-6">
              <Feature>Everything in Pro</Feature>
              <Feature>Unlimited users &amp; locations</Feature>
              <Feature>Priority support + custom dashboards</Feature>
              <Feature>Add-ons: invoice generation, WhatsApp bot integration</Feature>
            </ul>
            <button className="w-full bg-primary text-textlight py-3 rounded-xl shadow-md hover:shadow-lg active:shadow-inner transition-all">
              Choose Premium
            </button>
          </div>
        </motion.div> : <motion.div key="monthly"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2, ease: "easeInOut" }} 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Starter */}
          <div className="group relative rounded-2xl border border-gray-200 bg-white p-6 md:p-7 shadow-sm hover:shadow-lg transition-all">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg md:text-xl font-bold">Starter</h3>
            </div>
            <div className="mb-5">
              <div className="flex items-end gap-1">
                <span className="text-2xl md:text-3xl font-extrabold">₹2,499</span>
                <span className="text-sm text-placeholder">/month</span>
              </div>
            </div>
            <ul className="space-y-3 mb-6">
              <Feature>Basic patient &amp; visit tracking</Feature>
              <Feature>SMS + email reminders</Feature>
              <Feature>Simple analytics dashboard</Feature>
            </ul>
            <button className="w-full bg-primary text-textlight py-3 rounded-xl shadow-md hover:shadow-lg active:shadow-inner transition-all">
              Choose Starter
            </button>
          </div>

          {/* Pro (Most Popular) */}
          <div className="group relative rounded-2xl border border-transparent bg-white p-[1px] shadow-lg">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-textlight shadow">
                <Star className="h-4 w-4" /> Most Popular
              </span>
            </div>
            {/* Gradient border wrapper */}
            <div className="rounded-2xl bg-gradient-to-b from-[#0F2650] to-[#0ea5e9] p-[4px]">
              <div className="rounded-2xl bg-white p-6 md:p-7">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg md:text-xl font-extrabold">Pro</h3>
                </div>
                <div className="mb-5">
                  <div className="flex items-end gap-1">
                    <span className="text-2xl md:text-3xl font-extrabold">₹4,999</span>
                    <span className="text-sm text-placeholder">/month</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-6">
                  <Feature>Includes Starter +</Feature>
                  <Feature>AI-powered social posts + promotional emails</Feature>
                  <Feature>Advanced monthly reports (charts, revenue, etc.)</Feature>
                  <Feature>10 clinic users included</Feature>
                </ul>
                <button className="w-full bg-primary text-textlight py-3 rounded-xl shadow-md hover:shadow-lg active:shadow-inner transition-all">
                  Choose Pro
                </button>
              </div>
            </div>
          </div>

          {/* Premium */}
          <div className="group relative rounded-2xl border border-gray-200 bg-white p-6 md:p-7 shadow-sm hover:shadow-lg transition-all">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg md:text-xl font-bold">Premium</h3>
            </div>
            <div className="mb-5">
              <div className="flex items-end gap-1">
                <span className="text-2xl md:text-3xl font-extrabold">₹9,999</span>
                <span className="text-sm text-placeholder">/month</span>
              </div>
            </div>
            <ul className="space-y-3 mb-6">
              <Feature>Includes Pro +</Feature>
              <Feature>Unlimited users &amp; locations</Feature>
              <Feature>Priority support + custom dashboards</Feature>
              <Feature>Add-ons: invoice generation, WhatsApp bot integration</Feature>
            </ul>
            <button className="w-full bg-primary text-textlight py-3 rounded-xl shadow-md hover:shadow-lg active:shadow-inner transition-all">
              Choose Premium
            </button>
          </div>
        </motion.div> 
        }
        </AnimatePresence>
       
    </div>
    </PageWrapper>
  )
}

export default Pricing
