import React from "react";
import PageWrapper from "./PageWrapper";
// import PagePageWrapper from "./PagePageWrapper"; // uncomment if you use it

const Privacy = ({
  companyName = "SmileLytics.AI",
  effectiveDate = "August 20, 2025",
  contactEmail = "privacy@smilelytics.com",
}) => {

  return (
    <PageWrapper>
      <main className="min-h-screen bg-neutral text-textdark px-6 md:px-10 lg:px-16 py-10 md:py-16">
        {/* Header */}
        <header className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-extrabold">Privacy Policy</h1>
          <p className="text-sm md:text-base text-gray-500 mt-2">
            Effective Date: <span className="font-medium">{effectiveDate}</span>
          </p>
          <p className="mt-6 text-gray-700">
            <span className="text-primary1 font-semibold">{companyName}</span> respects your privacy. This Privacy Policy
            explains how we collect, use, disclose, and protect information in connection with our
            website, platform, and related services (“Services”). By using the Services, you consent
            to the practices described here.
          </p>
        </header>

        {/* Content */}
        <section className="max-w-5xl mx-auto mt-10 space-y-10">
          <div>
            <h2 className="text-xl md:text-2xl font-bold">1) Information We Collect</h2>
            <ul className="list-disc pl-6 mt-3 space-y-2 text-gray-700">
              <li>
                <span className="font-medium">Account & Contact Data:</span> Name, email, phone,
                clinic details, and any information you provide when contacting us or booking a demo.
              </li>
              <li>
                <span className="font-medium">Usage & Device Data:</span> Log data, pages viewed,
                browser type, device information, and general location (via IP).
              </li>
              <li>
                <span className="font-medium">Patient Data:</span> If you input patient information
                (e.g., name, contact, treatment details), you remain the data owner; we process it
                solely to provide the Services.
              </li>
              <li>
                <span className="font-medium">Cookies & Similar Technologies:</span> Used to operate,
                secure, and improve the Services. You can manage cookies via your browser settings.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-bold">2) How We Use Information</h2>
            <ul className="list-disc pl-6 mt-3 space-y-2 text-gray-700">
              <li>Provide, operate, maintain, and improve the Services.</li>
              <li>Authenticate users, personalize experiences, and deliver features.</li>
              <li>Send operational messages (e.g., reminders, confirmations) and product updates.</li>
              <li>Monitor security, prevent misuse, and comply with legal obligations.</li>
              <li>Analyze trends to improve reliability and performance.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-bold">3) Legal Bases (Where Applicable)</h2>
            <p className="mt-3 text-gray-700">
              Depending on your location, we rely on legitimate interests, contract necessity,
              consent, and/or legal obligations as our legal bases for processing personal data.
            </p>
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-bold">4) Patient Data</h2>
            <p className="mt-3 text-gray-700">
              Patient data entered into the platform is owned by you (the clinic/practitioner). We
              process such data only per your instructions to provide the Services. We do not sell
              patient data. You are responsible for obtaining necessary consents and ensuring
              compliance with healthcare privacy laws in your jurisdiction.
            </p>
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-bold">5) Sharing & Disclosures</h2>
            <ul className="list-disc pl-6 mt-3 space-y-2 text-gray-700">
              <li>
                <span className="font-medium">Service Providers:</span> We may share data with
                vetted vendors (e.g., cloud hosting, analytics, messaging) under confidentiality and
                data-processing terms.
              </li>
              <li>
                <span className="font-medium">Legal:</span> We may disclose information where
                required by law, regulation, or valid legal process.
              </li>
              <li>
                <span className="font-medium">Business Transfers:</span> In connection with a merger,
                acquisition, or asset sale, your information may be transferred with appropriate
                safeguards.
              </li>
              <li>We do not sell personal data to advertisers.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-bold">6) Data Security</h2>
            <p className="mt-3 text-gray-700">
              We implement reasonable technical and organizational measures (e.g., encryption in
              transit, access controls) to protect information. However, no method of transmission or
              storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-bold">7) Data Retention</h2>
            <p className="mt-3 text-gray-700">
              We retain information for as long as necessary to provide the Services and for
              legitimate business or legal purposes. You may request deletion of your account and
              associated data, subject to applicable law and our data retention obligations.
            </p>
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-bold">8) Your Rights</h2>
            <p className="mt-3 text-gray-700">
              Depending on your location, you may have rights to access, correct, delete, or
              restrict processing of your personal data, and to object or withdraw consent. To
              exercise these rights, contact{" "}
              <a className="text-primary1 underline" href={`mailto:${contactEmail}`}>
                {contactEmail}
              </a>.
            </p>
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-bold">9) Children’s Privacy</h2>
            <p className="mt-3 text-gray-700">
              Our Services are not directed to individuals under the age of 18, and we do not
              knowingly collect personal data from children. If you believe a child has provided us
              personal data, please contact us to request deletion.
            </p>
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-bold">10) International Transfers</h2>
            <p className="mt-3 text-gray-700">
              Where information is transferred across borders, we implement appropriate safeguards
              consistent with applicable data protection laws.
            </p>
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-bold">11) Updates to This Policy</h2>
            <p className="mt-3 text-gray-700">
              We may update this Privacy Policy periodically. Material changes will be posted with
              a new Effective Date. Your continued use of the Services after changes become
              effective constitutes acceptance of the updated policy.
            </p>
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-bold">12) Contact</h2>
            <p className="mt-3 text-gray-700">
              Questions about privacy? Contact us at{" "}
              <a className="text-primary1 underline" href={`mailto:${contactEmail}`}>
                <span className="text-primary1 font-semibold">{contactEmail}</span>
              </a>. Postal address and data protection contact (if any) can be provided upon request.
            </p>
          </div>
        </section>
      </main>
    </PageWrapper>
  );
};

export default Privacy;
