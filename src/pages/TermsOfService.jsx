import React from "react";
import PageWrapper from "./PageWrapper";

const TermsOfService = ({
  companyName = "SmileLytics.AI",
  effectiveDate = "August 20, 2025",
  contactEmail = "support@smilelytics.com",
  jurisdiction = "India",
}) => {

  return (
    <PageWrapper>
      <main className="min-h-screen bg-neutral text-textdark px-6 md:px-10 lg:px-16 py-10 md:py-16">
        {/* Header */}
        <header className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-extrabold">Terms of Service</h1>
          <p className="text-sm md:text-base text-gray-500 mt-2">
            Effective Date: <span className="font-medium">{effectiveDate}</span>
          </p>
          <p className="mt-6 text-gray-700">
            Welcome to <span className="text-primary1 font-semibold">{companyName}</span>. These Terms of Service
            (“Terms”) govern your access to and use of our website, platform, and related
            products and services (collectively, the “Services”). By accessing or using the
            Services, you agree to be bound by these Terms.
          </p>
        </header>

        {/* Content */}
        <section className="max-w-5xl mx-auto mt-10 space-y-10">
          <div>
            <h2 className="text-xl md:text-2xl font-bold">1) Eligibility & Acceptable Use</h2>
            <ul className="list-disc pl-6 mt-3 space-y-2 text-gray-700">
              <li>You must be at least 18 years old to use the Services.</li>
              <li>
                You agree not to misuse the Services, attempt unauthorized access, interfere with
                performance, reverse engineer, or use the platform in violation of applicable laws.
              </li>
              <li>
                You agree to provide accurate account information and keep it up to date.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-bold">2) Service Description</h2>
            <p className="mt-3 text-gray-700">
              {companyName} provides an AI-powered assistant for dental practices, including patient
              and visit management, appointment tracking, treatment records, dashboards and charts,
              and automated communications (e.g., WhatsApp/email reminders, AI-generated social posts
              and promotional emails). The Services are supportive tools and do <span className="font-semibold">not</span> constitute
              medical or dental advice. Professional judgment remains the sole responsibility of you
              and your practice.
            </p>
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-bold">3) Accounts & Security</h2>
            <ul className="list-disc pl-6 mt-3 space-y-2 text-gray-700">
              <li>You are responsible for maintaining the confidentiality of your credentials.</li>
              <li>You are responsible for all activities that occur under your account.</li>
              <li>Notify us immediately if you suspect any unauthorized use or security breach.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-bold">4) Subscriptions, Fees & Trials</h2>
            <ul className="list-disc pl-6 mt-3 space-y-2 text-gray-700">
              <li>
                Certain features may require paid subscriptions billed monthly or annually as shown
                at checkout or in your plan.
              </li>
              <li>
                Unless stated otherwise, fees are non-refundable except where required by law or
                under any explicit refund policy we make available.
              </li>
              <li>Trials (if any) are provided “as-is” and may be modified or discontinued.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-bold">5) Patient Data & Compliance</h2>
            <p className="mt-3 text-gray-700">
              You retain ownership of patient data you input into the Services. You represent that
              you have obtained all necessary consents and have lawful grounds to process such data.
              We process patient data solely to provide and improve the Services, consistent with our{" "}
              <a href="/privacy" className="text-primary1 underline">Privacy Policy</a>. You are
              responsible for ensuring your use complies with applicable privacy, data protection,
              and healthcare regulations in your jurisdiction.
            </p>
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-bold">6) Intellectual Property</h2>
            <p className="mt-3 text-gray-700">
              The Services, including all software, content, trademarks, and branding, are owned by
              {` ${companyName} `}or its licensors and are protected by intellectual property laws.
              Except as expressly permitted, you may not copy, modify, distribute, sell, lease, or
              create derivative works based on the Services.
            </p>
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-bold">7) Third-Party Services</h2>
            <p className="mt-3 text-gray-700">
              The Services may integrate third-party tools (e.g., hosting, analytics, messaging).
              We are not responsible for third-party content or services and disclaim liability for
              their availability or performance.
            </p>
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-bold">8) Disclaimers</h2>
            <p className="mt-3 text-gray-700">
              The Services are provided on an “as is” and “as available” basis. We disclaim all
              warranties, express or implied, including merchantability, fitness for a particular
              purpose, and non-infringement. We do not warrant that the Services will be error-free
              or uninterrupted or that results will meet your requirements.
            </p>
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-bold">9) Limitation of Liability</h2>
            <p className="mt-3 text-gray-700">
              To the maximum extent permitted by law, {companyName} and its affiliates will not be
              liable for any indirect, incidental, special, consequential, or exemplary damages, or
              loss of profits, data, or goodwill. Our aggregate liability for any claim relating to
              the Services will not exceed the amounts you paid to us in the twelve (12) months
              preceding the event giving rise to the claim.
            </p>
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-bold">10) Suspension & Termination</h2>
            <p className="mt-3 text-gray-700">
              We may suspend or terminate access to the Services if you violate these Terms or if
              your use poses security, legal, or operational risks. Upon termination, your rights to
              use the Services cease immediately. Certain obligations (e.g., payment, IP, disclaimers,
              limitations of liability) will survive termination.
            </p>
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-bold">11) Changes to Terms</h2>
            <p className="mt-3 text-gray-700">
              We may update these Terms from time to time. Material changes will be posted with an
              updated Effective Date. Your continued use of the Services after changes become
              effective constitutes acceptance of the new Terms.
            </p>
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-bold">12) Governing Law</h2>
            <p className="mt-3 text-gray-700">
              These Terms are governed by the laws of {jurisdiction}, without regard to conflict of
              law principles. Courts located in {jurisdiction} shall have exclusive jurisdiction,
              unless otherwise required by applicable law.
            </p>
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-bold">13) Contact</h2>
            <p className="mt-3 text-gray-700">
              Questions about these Terms? Contact us at{" "}
              <a className="text-primary1 underline" href={`mailto:${contactEmail}`}>
                <span className="text-primary1 font-semibold">{contactEmail}</span>
              </a>.
            </p>
          </div>
        </section>
      </main>
    </PageWrapper>
  );
};

export default TermsOfService;
