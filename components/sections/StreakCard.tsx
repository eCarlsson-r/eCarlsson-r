"use client";

import { motion } from "motion/react";
import { useActivity } from "@/lib/hooks/useActivity";

function Metric({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="p-4 rounded-xl bg-blur bg-linear-to-r from-red-500/10 to-blue-500/10 text-center">
      <p className="text-4xl font-bold">{value}</p>
      <p className="text-gray-500">{label}</p>
    </div>
  );
}

export default function StreakCard() {
  const activity = useActivity();

  if (!activity) return null;

  return (
    <div className="rounded-2xl bg-blur bg-linear-to-r from-blue-500/10 to-green-500/10 p-6 text-center">
        <h3 className="text-lg font-semibold mb-4">
            Activity Intelligence
        </h3>

        <div className="grid grid-cols-3 gap-4 max-w-6xl mx-auto text-center">
            <Metric label="Current Streak" value={`${activity.currentStreak} days`} />
            <Metric label="Longest Streak" value={`${activity.longestStreak} days`} />
            <Metric label="Active Days" value={`${activity.totalActiveDays} days`} />
        </div>

        <div className="mt-6 text-center">
            <motion.div initial={{scale: 0.8, opacity: 1}} animate={{scale: 1, opacity: 1}} className="text-3xl font-bold">
                {activity.score}
            </motion.div>
            <div className="text-sm text-gray-400">
                Activity Score ({activity.level})
            </div>
        </div>
    </div>
  );
}