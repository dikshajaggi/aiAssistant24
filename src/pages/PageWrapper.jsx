import { motion } from "framer-motion";

const PageWrapper = ({ children }) => {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center w-full justify-start overflow-hidden"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
};

export default PageWrapper;