import React from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Calendar,
  CreditCard,
  BarChart3,
  MessageSquare,
  Mail,
  Sparkles,
} from "lucide-react";

const Walkthrough = () => {
  return (
    <div className="min-h-screen min-w-screen bg-neutral text-textdark px-10">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-16">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-primary">
          Meet Your AI Dental Assistant
        </h1>

         <p className="mt-4 text-center text-gray-600 text-sm md:text-lg max-w-2xl">
          See how our AI-powered assistant helps you manage patients, track revenue, 
          and send reminders — so you can focus on what truly matters: <span className="text-primary font-semibold">brighter smiles</span>
        </p>

        {/* Video Container */}
        <div className="mt-10 w-full max-w-4xl rounded-2xl overflow-hidden shadow-lg">
          <div className="relative pb-[56.25%] h-0">
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-2xl"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
              title="Promo Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>


        <Link to="/book-demo">
          <button className="mt-8 px-6 py-3 bg-secondary text-white font-bold rounded-xl shadow-md cursor-pointer transform hover:-translate-y-1 transition-all duration-300">
            Book a Free Demo
          </button>
        </Link>
      </section>

      {/* Step-by-Step Walkthrough */}
      <section className="px-6 py-12 space-y-16 max-w-6xl mx-auto">
        {/* Step 1 */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          <Users className="w-16 h-16 text-primary flex-shrink-0" />
          <div>
            <h2 className="text-2xl font-bold">1. Manage Patients with Ease</h2>
            <p className="text-placeholder mt-2 text-base md:text-lg">
              Add, update, and organize patient details in seconds. From medical
              history to contact info — everything is stored securely in one
              place.
            </p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          <Calendar className="w-16 h-16 text-primary flex-shrink-0" />
          <div>
            <h2 className="text-2xl font-bold">2. Smarter Appointment Tracking</h2>
            <p className="text-placeholder mt-2 text-base md:text-lg">
              Schedule visits seamlessly and never worry about no-shows. Get
              automated reminders via WhatsApp & Email.
            </p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          <CreditCard className="w-16 h-16 text-primary flex-shrink-0" />
          <div>
            <h2 className="text-2xl font-bold">3. Revenue & Payments in One Place</h2>
            <p className="text-placeholder mt-2 text-base md:text-lg">
              Track revenue, manage pending payments, and keep your finances
              transparent — without messy spreadsheets.
            </p>
          </div>
        </div>

        {/* Step 4 */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          <BarChart3 className="w-16 h-16 text-primary flex-shrink-0" />
          <div>
            <h2 className="text-2xl font-bold">4. Insights at a Glance</h2>
            <p className="text-placeholder mt-2 text-base md:text-lg">
              See total patients, total visits, monthly revenue, and your most
              popular treatments with interactive dashboards.
            </p>
          </div>
        </div>

        {/* Step 5 */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          <MessageSquare className="w-16 h-16 text-primary flex-shrink-0" />
          <div>
            <h2 className="text-2xl font-bold">5. Automated Patient Engagement</h2>
            <p className="text-placeholder mt-2 text-base md:text-lg">
              Send timely WhatsApp & Email reminders so your patients stay
              connected and never miss a visit.
            </p>
          </div>
        </div>

        {/* Step 6 */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          <Sparkles className="w-16 h-16 text-primary flex-shrink-0" />
          <div>
            <h2 className="text-2xl font-bold">6. AI Superpowers for Growth</h2>
            <p className="text-placeholder mt-2 text-base md:text-lg">
              Generate ready-to-post social media content and promotional emails
              with one click — helping your practice attract and retain patients.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-primary text-white py-12 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 text-center">
          <div className="bg-white/25 p-6 rounded-xl">
            <h3 className="font-bold text-lg">Save Time</h3>
            <p className="text-base mt-2">Spend more time with patients, less on admin work.</p>
          </div>
          <div className="bg-white/25 p-6 rounded-xl">
            <h3 className="font-bold text-lg">Grow Revenue</h3>
            <p className="text-base mt-2">Stay on top of payments and maximize earnings.</p>
          </div>
          <div className="bg-white/25 p-6 rounded-xl">
            <h3 className="font-bold text-lg">Engage Patients</h3>
            <p className="text-base mt-2">Smart reminders keep patients loyal & consistent.</p>
          </div>
          <div className="bg-white/25 p-6 rounded-xl">
            <h3 className="font-bold text-lg">Stress-Free Clinic</h3>
            <p className="text-base mt-2">AI handles the busywork so you can focus on smiles.</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 text-center px-6">
        <h2 className="text-2xl md:text-4xl font-extrabold mb-4">
          Ready to Transform Your Practice?
        </h2>
        <p className="text-placeholder max-w-xl mx-auto mb-6">
          Book a free demo today and see how our AI Dental Assistant can make
          your clinic smarter, faster, and more connected.
        </p>
        <Link to="/book-demo">
          <button className="px-8 py-4 bg-secondary text-white font-bold rounded-xl shadow-md cursor-pointer transform hover:-translate-y-1 transition-all duration-300">
            Book Your Demo
          </button>
        </Link>
      </section>
    </div>
  );
};

export default Walkthrough;
