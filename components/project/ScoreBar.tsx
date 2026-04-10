"use client"
import { motion } from "motion/react";

export default function ScoreBar({ label, value, height, size }: any) {
  return (
    <div>
      {label && (<div className={`flex justify-between text-${size || "xs"} mb-1`}>
        <span>{label}</span>
        <span>{value}</span>
      </div>)}

      <div className={`h-${height || 3} bg-gray-200 dark:bg-gray-800 rounded`}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          transition={{ duration: 0.6 }}
          className={`h-${height || 3} bg-gradient-to-r from-red-700 to-blue-500 rounded`}
        />
      </div>
    </div>
  );
}