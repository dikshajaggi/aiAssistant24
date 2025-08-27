import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    category: "General",
    items: [
      {
        q: "What is an AI dental assistant?",
        a: "Our AI dental assistant is a cloud-based platform designed to manage patients, appointments, treatments, payments, and marketing for your clinic—saving you time and improving efficiency."
      },
      {
        q: "Is this software only for dentists?",
        a: "Yes, it’s built specifically for dental clinics, with features that address the unique needs of dental practice management."
      },
      {
        q: "Do I need technical skills to use it?",
        a: "Not at all! The system is designed to be intuitive and user-friendly, with guided onboarding."
      }
    ]
  },
  {
    category: "Features & Usage",
    items: [
      {
        q: "Can I track my revenue and pending payments?",
        a: "Yes, the dashboard provides real-time tracking of total revenue, pending payments, and monthly trends."
      },
      {
        q: "Does it send appointment reminders?",
        a: "Absolutely! The system sends WhatsApp and email reminders automatically to reduce no-shows."
      },
      {
        q: "How does AI help with marketing?",
        a: "Our AI generates ready-to-use social media posts and promotional emails tailored to your dental services."
      },
      {
        q: "Can I customize treatment records and patient data?",
        a: "Yes, you can add, edit, and delete patient and treatment information at any time."
      }
    ]
  },
  {
    category: "Pricing & Support",
    items: [
      {
        q: "Do you offer a free trial?",
        a: "Yes, we offer a free trial so you can explore all features before committing."
      },
      {
        q: "What if I need help while using the system?",
        a: "We provide customer support via email, chat, and phone, along with tutorials and guides."
      },
      {
        q: "Can I upgrade or downgrade my plan later?",
        a: "Yes, you can switch plans anytime without losing your data."
      }
    ]
  }
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-neutral py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-extrabold text-center text-secondary mb-10">
          Frequently Asked Questions
        </h2>

        {faqs.map((section, secIdx) => (
          <div key={secIdx} className="mb-8">
            <h3 className="text-xl font-semibold text-textdark mb-4">{section.category}</h3>
            <div className="space-y-4">
              {section.items.map((item, idx) => {
                const currentIndex = `${secIdx}-${idx}`;
                const isOpen = openIndex === currentIndex;
                return (
                  <div
                    key={currentIndex}
                    className="border border-gray-300 rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFAQ(currentIndex)}
                      className="flex w-full items-center justify-between p-4 text-left text-base md:text-lg font-medium text-gray-800 hover:bg-primary/10 cursor-pointer"
                    >
                      {item.q}
                      <ChevronDown
                        className={`h-5 w-5 transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="p-4 bg-primary/10 text-gray-600 text-sm md:text-base">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
