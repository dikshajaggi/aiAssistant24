import React, { useState } from "react";

const PaymentModal = ({ planInfo, isOpen, toggle }) => {
  const [showPayment, setShowPayment] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black opacity-60" onClick={toggle} />

      {/* Modal Box */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl md:flex z-10 overflow-hidden">
        {/* Left Section - Order Summary */}
        <div className="bg-gray-50 p-6 w-full md:w-1/2 border-r border-gray-200 relative">
          <h3 className="text-gray-600 text-sm uppercase font-semibold mb-2">
            Order summary
          </h3>

          <h2 className="text-xl font-extrabold text-secondary1">
            14 days free
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            then {planInfo.displayPrice}{" "}
            {planInfo.billingPeriod === "Yearly" ? "yearly" : "monthly"}
          </p>

          <div className="flex items-center gap-3 mt-3 mb-5">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-indigo-100 text-textdark font-bold">
              {planInfo.name[0]}
            </div>
            <div>
              <p className="font-medium text-gray-800">{planInfo.name}</p>
              <p className="text-xs text-gray-500">{planInfo.billingPeriod}</p>
            </div>
          </div>

          <a href="#" className="text-textdark text-sm underline block">
            Add discount
          </a>
          <a href="#" className="text-textdark text-sm underline block mt-1">
            Add GST number
          </a>

          <div className="mt-6 border-t border-gray-200 pt-3">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Due today</span>
              <span className="font-medium">₹0</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Due after trial</span>
              <span className="font-bold">{planInfo.displayPrice}</span>
            </div>
          </div>

          <p className="text-xs text-gray-400 mt-3">
            Cancel anytime before trial ends.
          </p>
        </div>

        {/* Right Section - Conditionally Rendered */}
        <div className="p-6 w-full md:w-1/2">
           <button
            onClick={toggle}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl font-bold"
          >
            &times;
          </button>

          {!showPayment ? (
            <>
            {/* step indicator */}
            <h3 className="text-gray-800 font-semibold text-base mb-4 cursor-pointer flex items-center">
                <span
                onClick={() => setShowPayment(false)}
                className={`transition ${
                    !showPayment
                    ? "text-secondary1 font-bold"
                    : "text-gray-500 hover:text-secondary1/80"
                }`}
                >
                Your details
                </span>
                <span className="mx-2">➤</span>
                <span
                onClick={() => setShowPayment(true)}
                className={`transition ${
                    showPayment
                    ? "text-secondary1 font-bold"
                    : "text-gray-500 hover:text-secondary1/80"
                }`}
                >
                Payment
                </span>
            </h3>

              <form className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary1"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Country
                  </label>
                  <select
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary1"
                  >
                    <option>India</option>
                    <option>United States</option>
                    <option>United Kingdom</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    ZIP / Postcode
                  </label>
                  <input
                    type="text"
                    placeholder="110078"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary1"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4 text-textdark" />
                  <p className="text-xs text-gray-600">
                    Send me product updates and offers via email.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowPayment(true)}
                  className="w-full bg-secondary1 hover:bg-secondary1/80 text-white font-semibold py-2 px-4 rounded-lg mt-4 transition cursor-pointer"
                >
                  Continue
                </button>
              </form>
            </>
          ) : (
            <>
               <h3 className="text-gray-800 font-semibold text-base mb-4 cursor-pointer flex items-center">
                <span
                onClick={() => setShowPayment(false)}
                className={`transition ${
                    !showPayment
                    ? "text-secondary1 font-bold"
                    : "text-gray-500 hover:text-secondary1/80"
                }`}
                >
                Your details
                </span>
                <span className="mx-2">➤</span>
                <span
                onClick={() => setShowPayment(true)}
                className={`transition ${
                    showPayment
                    ? "text-secondary1 font-bold"
                    : "text-gray-500 hover:text-secondary1/80"
                }`}
                >
                Payment
                </span>
            </h3>

              <form className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Card number
                  </label>
                  <input
                    type="text"
                    placeholder="xxxx xxxx xxxx xxxx"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary1"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Name on card
                  </label>
                  <input
                    type="text"
                    placeholder="Full name"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary1"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Expiration date
                    </label>
                    <input
                      type="text"
                      placeholder="MM / YY"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Security code
                    </label>
                    <input
                      type="text"
                      placeholder="CVV"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary1"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  className="w-full bg-secondary1 hover:bg-secondary1/80 text-white font-semibold py-2 px-4 rounded-lg mt-4 transition"
                >
                  Start your free trial
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
