import React, { useEffect, useState } from "react";
import { Calendar, Clock } from "lucide-react";
import { motion } from "framer-motion";

const DateTimeDisplay = () => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000); // update every second
    return () => clearInterval(timer);
  }, []);

  const formattedDate = dateTime.toLocaleDateString(undefined, {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const formattedTime = dateTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: -2 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex items-center mt-6 md:mt-0 gap-6 bg-secondary shadow-md rounded-xl px-5 py-3"
    >
      {/* Date */}
      <div className="flex items-center gap-2 text-textdark/90">
        <Calendar size={20} className="text-neutral" />
        <span className="font-bold text-neutral">{formattedDate}</span>
      </div>

      {/* Divider */}
      <div className="h-6 w-px bg-gray-200"></div>

      {/* Time */}
      <div className="flex items-center gap-2 text-textdark/90">
        <Clock size={20} className="text-neutral" />
        <span className="font-semibold text-neutral text-lg">{formattedTime}</span>
      </div>
    </motion.div>
  );
};

export default DateTimeDisplay;
