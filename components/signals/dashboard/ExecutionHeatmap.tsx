"use client";

import { useEffect, useState } from "react";

function generateLast365Days() {
  const days: string[] = [];
  const today = new Date();

  for (let i = 364; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    days.push(d.toISOString().split("T")[0]);
  }

  return days;
}

function getColor(count: number) {
  if (count === 0) return "bg-gray-200 dark:bg-gray-800";
  if (count < 3) return "bg-green-200";
  if (count < 6) return "bg-green-400";
  if (count < 10) return "bg-green-600";
  return "bg-green-800";
}

import { useTranslations } from "next-intl";

export default function ExecutionHeatmap() {
  const t = useTranslations("signals");
  const [data, setData] = useState<Record<string, number>>({});

  useEffect(() => {
    fetch("/data/contributions.json")
      .then(res => res.json())
      .then(setData);
  }, []);

  const days = generateLast365Days();

  return (
    <section>
      <h2 className="text-2xl font-semibold text-center text-primary mb-10">{t("heatmap.title")}</h2>

      <div className="overflow-x-auto">
        <div className="grid grid-cols-52 gap-1 w-max mx-auto">
          {days.map((date) => {
            const count = data[date] || 0;

            return (
              <div
                key={date}
                title={`${date} — ${count} commits`}
                className={`w-3 h-3 rounded-sm ${getColor(count)}`}
                style={{animationDelay: "0.5s"}}
              />
            );
          })}
        </div>
      </div>
      
      <div className="flex justify-center gap-2 mt-4 text-xs text-gray-500">
      <span>{t("heatmap.less")}</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 bg-gray-200" />
          <div className="w-3 h-3 bg-green-200" />
          <div className="w-3 h-3 bg-green-400" />
          <div className="w-3 h-3 bg-green-600" />
          <div className="w-3 h-3 bg-green-800" />
        </div>
        <span>{t("heatmap.more")}</span>
      </div>
    </section>
  );
}