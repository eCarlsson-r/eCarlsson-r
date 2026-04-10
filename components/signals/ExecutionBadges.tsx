import { getAllSignals } from "@/lib/signals/loadSignals";
import { generateBadges } from "@/lib/signals/generateBadges";

export default async function ExecutionBadges() {
  const signals = await getAllSignals();
  const badges = generateBadges(signals);

  return (
    <section className="space-y-6">
      <h2 className="text-xl font-semibold">Performance Badges</h2>

      <div className="flex flex-wrap gap-4">
        {badges.map((badge) => (
          <span
            key={badge}
            className="px-4 py-2 border rounded-full bg-chart-1 text-white text-sm"
          >
            🏆 {badge}
          </span>
        ))}
      </div>
    </section>
  );
}