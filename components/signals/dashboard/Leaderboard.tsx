import { loadLeaderboard } from "@/lib/hooks/loadLeaderboard";
import LeaderboardItem from "./LeaderboardItem";

export default async function Leaderboard() {
  const leaderboard = await loadLeaderboard(); 
  const ranked = leaderboard.slice(0, 5);

  return (
    <section>
      <h2 className="text-2xl font-semibold text-center text-primary mb-10">
        Top Projects Leaderboard
      </h2>

      <div className="max-w-3xl mx-auto space-y-2">
        {ranked.map((project: any, i: number) => (
          <LeaderboardItem key={project.slug} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}