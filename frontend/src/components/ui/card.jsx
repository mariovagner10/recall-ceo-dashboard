import React from "react";
import { motion } from "framer-motion";

export function Card({ title, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-darkCard p-5 rounded-2xl shadow-lg border border-gray-800"
    >
      {title && <h2 className="text-lg mb-3">{title}</h2>}
      {children}
    </motion.div>
  );
}
