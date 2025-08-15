import React from "react";
import PageWrapper from "./PageWrapper";
import contactus from "../assets/contactus.png";
import blob from "../assets/blob.gif"
import { Mail, Phone } from "lucide-react";

const Contact = () => {
  return (
    <PageWrapper>
      <div className="bg-neutral min-h-screen min-w-screen flex flex-col items-center justify-start py-12 px-4">
        
        {/* Heading Section */}
        <div className="text-center mb-16 mt-[-20px] w-full">
          <h1 className="font-bold bg-gradient-to-r from-[#01CFC9] to-[#0ea5e9] bg-clip-text text-transparent text-4xl md:text-5xl mb-4">
            Hello Let’s Talk!
          </h1>
          <h4 className="text-lg md:text-xl font-bold text-gray-700">
            Your thoughts, questions, and ideas are always welcome
          </h4>
        </div>

        {/* Contact Info + Image */}
        <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl gap-10">
          
          {/* Contact Info */}
          <div className="flex flex-col gap-6 w-full">
            <h1 className="font-bold md:text-3xl">Contact Us</h1>
            <div className="flex items-center gap-4 bg-white shadow p-4 rounded-lg">
              <Mail className="text-primary w-6 h-6" />
              <span className="text-lg font-medium">support@example.com</span>
            </div>
            <div className="flex items-center gap-4 bg-white shadow p-4 rounded-lg">
              <Phone className="text-primary w-6 h-6" />
              <span className="text-lg font-medium">+1 (234) 567-890</span>
            </div>
          </div>

          {/* Contact Image */}
          <div className="relative flex justify-center w-full">
            {/* Blob GIF as background */}
            <img
              src={blob} // your blob gif path
              alt="Background Blob"
              className="absolute top-1/2 left-1/2 w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 object-cover z-0 opacity-45"
            />

            {/* Foreground Contact Us Image */}
            <img
              src={contactus}
              alt="Contact Us"
              className="relative w-80 md:w-[450px] lg:w-[500px] h-auto object-contain z-10"
            />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Contact;
