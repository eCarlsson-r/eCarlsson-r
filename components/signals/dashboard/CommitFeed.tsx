"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

type FeedItem = {
  repo: string;
  message: string;
  date: string;
  url: string;
};

function formatTimeAgo(date: string) {
  const now = new Date().getTime();
  const past = new Date(date).getTime();

  const diff = (now - past) / 1000;

  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;

  return new Date(date).toLocaleDateString();
}

function CommitItem({ item, index }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="relative flex gap-4 items-start group"
    >
      {/* Dot */}
      <div className="relative z-10">
        <div className="w-3 h-3 rounded-full bg-blue-500 mt-2" />
      </div>

      {/* Content */}
      <div className="flex-1 border rounded-xl p-4 
                      bg-white dark:bg-white/5 
                      backdrop-blur hover:shadow-lg transition">

        {/* Repo */}
        <p className="text-xs text-gray-500 mb-1">
          {item.repo}
        </p>

        {/* Message */}
        <p className="text-sm font-medium mb-2">
          {item.message}
        </p>

        {/* Footer */}
        <div className="flex justify-between items-center text-xs text-gray-400">
          <span>{formatTimeAgo(item.date)}</span>

          <a
            href={item.url}
            target="_blank"
            className="opacity-0 group-hover:opacity-100 transition underline"
          >
            View →
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function CommitFeed() {
  const [feed, setFeed] = useState<FeedItem[]>([]);

  useEffect(() => {
    fetch("/data/commit-feed.json")
      .then((res) => res.json())
      .then(setFeed);
  }, []);

  return (
    <section>
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-2xl font-semibold mb-10 text-primary text-center">
          Live Development Activity
        </h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-300 dark:bg-gray-700" />

          <div className="space-y-8">
            {feed.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((item, i) => (
              <CommitItem key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}