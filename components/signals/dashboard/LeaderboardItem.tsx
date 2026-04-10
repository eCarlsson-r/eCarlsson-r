"use client";
import { motion } from "motion/react";

export default function LeaderboardItem({ project, index }: { project: any, index: number }) {
  const medals = ["🥇", "🥈", "🥉"];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 backdrop-blur border border-white/10">
      <div className="flex items-center gap-4">
        <div className="text-2xl w-8">
          {medals[index] || `#${project.rank}`}
        </div>

        <div>
          <div className="font-semibold">{project.title}</div>
          <div className="text-xs text-gray-400 mt-1 max-w-md">
            {project.explanation}
          </div>
        </div>
      </div>

      <div className="text-lg font-bold text-primary">
        {project.leaderboardScore}
      </div>
    </motion.div>
  );
}