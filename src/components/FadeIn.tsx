import { motion } from "framer-motion";

export default function FadeIn({ children }: { children: React.ReactNode }) {
  return (
    <motion.b
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {children}
    </motion.b>
  );
}
