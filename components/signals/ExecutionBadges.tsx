import { getAllSignals } from "@/lib/signals/loadSignals";
import { generateBadges } from "@/lib/signals/generateBadges";
import { getTranslations } from "next-intl/server";

export default async function ExecutionBadges() {
  const signals = await getAllSignals();
  const badges = generateBadges(signals);
  const t = await getTranslations("signals");

  return (
    <section className="space-y-6">
      <h2 className="text-xl font-semibold">{t("badges.title")}</h2>

      <div className="flex flex-wrap gap-4">
        {badges.map((badge) => (
          <span key={badge} className="px-4 py-2 border rounded-full bg-chart-1 text-white text-sm">
            🏆 {badge}
          </span>
        ))}
      </div>
    </section>
  );
}