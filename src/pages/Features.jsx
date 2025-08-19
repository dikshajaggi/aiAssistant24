import React from "react"
import PageWrapper from "./PageWrapper"
import {
  User,
  CalendarDays,
  ClipboardList,
  FileText,
  DollarSign,
  LayoutDashboard,
  BarChart3,
  Bell,
  Megaphone,
} from "lucide-react"

const features = [
  {
    icon: <User className="w-8 h-8 text-secondary" />,
    title: "Patient Management",
    desc: "Add, edit, and organize patient records with ease.",
  },
  {
    icon: <ClipboardList className="w-8 h-8 text-secondary" />,
    title: "Visit Management",
    desc: "Track every visit like a perfectly filled cavity.",
  },
  {
    icon: <CalendarDays className="w-8 h-8 text-secondary" />,
    title: "Appointment Tracking",
    desc: "Never miss a booking again.",
  },
  {
    icon: <FileText className="w-8 h-8 text-secondary" />,
    title: "Treatment Records",
    desc: "Keep a detailed history of treatments for quick reference.",
  },
  {
    icon: <DollarSign className="w-8 h-8 text-secondary" />,
    title: "Revenue & Payments",
    desc: "See what’s paid, pending, and planned.",
  },
  {
    icon: <LayoutDashboard className="w-8 h-8 text-secondary" />,
    title: "Smart Dashboards",
    desc: "Instant insights into patients, visits, revenue, and pending payments.",
  },
  {
    icon: <BarChart3 className="w-8 h-8 text-secondary" />,
    title: "Charts That Speak",
    desc: "Visualize visits, revenue trends, and top treatments.",
  },
  {
    icon: <Bell className="w-8 h-8 text-secondary" />,
    title: "Smart Reminders",
    desc: "Gentle nudges to patients via WhatsApp & email.",
  },
  {
    icon: <Megaphone className="w-8 h-8 text-secondary" />,
    title: "AI Marketing Boost",
    desc: "Auto-generated social posts and promotional emails to keep your practice thriving.",
  },
]

const Features = () => {
  return (
    <PageWrapper>
      <div className="mt-10 flex flex-col justify-start min-h-screen w-full px-4 md:px-10">
        
        {/* Heading */}
        <h1 className="text-[clamp(1.6rem,3vw,2rem)] font-bold text-center">
          Powerful Features to Grow Your Practice
        </h1>

        <p className="mt-3 text-placeholder text-base md:text-lg font-medium text-center max-w-2xl mx-auto">
          Our AI Dental Assistant simplifies patient care, clinic management, and business growth — all in one smart platform.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 mb-20">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="flex flex-col items-start gap-3 bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow duration-200"
            >
              <div className="p-3 bg-secondary/10 rounded-xl">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-textdark">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  )
}

export default Features
