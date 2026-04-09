import { getLiveSignals } from "@/lib/signals/loadLiveSignals";

export default function ExecutionFeed() {
  const live = getLiveSignals() ?? {
    activityPulse: "Inactive",
    executionVelocity: "Low",
    commitsLast30Days: 0,
    lastCommit: "",
    techFocus: {}
  };

  const techEntries = Object.entries(live.techFocus)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <section className="max-w-6xl mx-auto space-y-12">
      <h2 className="text-3xl font-bold text-secondary">Live Execution Intelligence</h2>

      {/* LIVE STATUS */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 bg-outline-variant/20 rounded-lg overflow-hidden">
        <StatusCard
          label="Activity Pulse"
          value={live.activityPulse}
        />
        <StatusCard
          label="Execution Velocity"
          value={live.executionVelocity}
        />
        <StatusCard
          label="Commits (30d)"
          value={live.commitsLast30Days.toString()}
        />
        <StatusCard
          label="Last Commit"
          value={
            live.lastCommit
              ? new Date(live.lastCommit).toLocaleDateString()
              : "-"
          }
        />
      </div>

      {/* TECH FOCUS */}
      <div>
        <h3 className="text-xl font-semibold mb-4">
          Current Technology Focus
        </h3>

        <div className="flex flex-wrap gap-3">
          {techEntries.map(([tech, count]) => (
            <span
              key={tech}
              className="px-4 py-2 border rounded-full"
            >
              <i className="text-secondary">{tech}</i> · <b className="text-tertiary">{count}</b>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- UI HELPERS ---------- */

function StatusCard({
  label,
  value
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="bg-surface-container-low p-6 rounded-lg text-center">
      <span className="font-label text-[10px] uppercase tracking-[0.4em] text-secondary block mb-8">{label}</span>
      <p className="text-3xl font-headline font-bold text-primary">{value}</p>
    </div>
  );
}