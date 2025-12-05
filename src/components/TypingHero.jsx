import React, { useEffect, useState, useRef } from "react";

export default function TypingHero({
  words = ["patients", "appointments", "payments", "treatments", "reminders"],
  typingSpeed = 120,
  deletingSpeed = 60,
  pauseTime = 1300,
}) {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopIndex, setLoopIndex] = useState(0);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (!mountedRef.current) return;

    const currentWord = words[loopIndex % words.length];
    let timeoutId;

    if (!isDeleting) {
      if (displayText.length < currentWord.length) {
        timeoutId = setTimeout(() => {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        }, typingSpeed);
      } else {
        timeoutId = setTimeout(() => {
          setIsDeleting(true);
        }, pauseTime);
      }
    } else {
      if (displayText.length > 0) {
        timeoutId = setTimeout(() => {
          setDisplayText(currentWord.slice(0, displayText.length - 1));
        }, deletingSpeed);
      } else {
        setIsDeleting(false);
        setLoopIndex((prev) => prev + 1);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [displayText, isDeleting, loopIndex, words, typingSpeed, deletingSpeed, pauseTime]);

  // Inline style for blinking cursor
  const blinkStyle = {
    display: "inline-block",
    width: "2px",
    height: "1.05em",
    marginLeft: "6px",
    background: "#0f172a",
    verticalAlign: "bottom",
    animation: "blink 1s steps(1) infinite",
  };

  return (
    <section className="text-center py-12 px-4 font-sans text-slate-900">
      {/* Inject keyframes via <style> */}
      <style>
        {`
          @keyframes blink {
            0%, 100% { opacity: 1 }
            50% { opacity: 0 }
          }
        `}
      </style>

      <h1 className="text-[clamp(1.6rem,4vw,2.4rem)] font-bold leading-tight">
        Let AI manage all your{" "}
        <span className="inline-block ml-1 font-bold text-[#0ea5e9]">
          {displayText}
          <span style={blinkStyle} />
        </span>
      </h1>
      <p className="mt-3 text-placeholder text-base font-medium md:text-lg">
       Automate Your Dental Practice — Appointments, Billing & EMR in One Place
      </p>
    </section>
  );
}
