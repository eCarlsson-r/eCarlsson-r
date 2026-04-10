"use client";
import Link from "next/link";
import SignalBadge from "./SignalBadge";
import ScoreBar from "./ScoreBar";
import { motion } from "motion/react";

function RankingBadge({ scores }: any) {
  let label = "";
  let color = "";

  if (scores.execution > 85) {
    label = "🔥 Top Execution";
    color = "bg-red-500";
  } else if (scores.complexity > 85) {
    label = "🧠 High Complexity";
    color = "bg-yellow-900";
  } else if (scores.ownership > 85) {
    label = "👑 Ownership";
    color = "bg-blue-500";
  }

  if (!label) return null;

  return (
    <div className={`absolute top-4 right-4 text-xs px-2 py-1 rounded text-white ${color}`}>
      {label}
    </div>
  );
}

function FocusBadge({ value }: { value: number }) {
  let label = "Distributed";

  if (value > 0.4) label = "Deep Focus";
  else if (value > 0.2) label = "Balanced";

  return (
    <div className="text-sm rounded-full bg-white/10 border-white/10">
      Focus: {label} ({value*100}%)
    </div>
  );
}

export default function ProjectCard({ slug, title, summary, signals, focus }: { slug: string; title: string; summary: string; signals?: any; focus?: number }) {

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.02 }}
      className="group relative rounded-2xl border border-gray-200 dark:border-white/10 
                 bg-white/70 dark:bg-white/5 backdrop-blur-xl 
                 p-6 shadow-sm hover:shadow-xl transition overflow-hidden"
    >
      {/* Glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition
                      bg-gradient-to-r from-red-500/10 to-blue-500/10 blur-xl" />



      {(focus !== undefined && focus > 0) && (
        <FocusBadge value={focus} />
      )}

      {/* Ranking Badge */}
      {signals && (
        <RankingBadge scores={signals.scores} />
      )}

      {/* Title */}
      <h3 className="text-lg font-semibold mb-2 relative z-10">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 relative z-10">
        {summary}
      </p>

      {/* Signals */}
      {signals && (
        <div className="flex flex-wrap gap-2 mb-4 relative z-10">
          <SignalBadge label="Exec" value={signals.summary.executionLevel} />
          <SignalBadge label="Comp" value={signals.summary.complexityLevel} />
          <SignalBadge label="Own" value={signals.summary.ownershipLevel} />
        </div>
      )}

      {/* Score bars */}
      {signals && (
        <div className="space-y-2 mb-4 relative z-10">
          <ScoreBar label="Execution" value={signals.scores.execution} />
          <ScoreBar label="Complexity" value={signals.scores.complexity} />
          <ScoreBar label="Ownership" value={signals.scores.ownership} />
        </div>
      )}

      {/* CTA */}
      <Link href={`/projects/${slug}`} className="text-sm font-medium underline relative z-10">
        View Project →
      </Link>
    </motion.div>
  );
}