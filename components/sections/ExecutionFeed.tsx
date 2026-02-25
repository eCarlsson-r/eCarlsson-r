import { getLiveSignals } from "@/lib/signals/loadLiveSignals";
import { getAllSignals } from "@/lib/signals/loadSignals";

export default function ExecutionFeed() {
  const signals = getAllSignals();

  const live = getLiveSignals() ?? {
    activityPulse: "Inactive",
    executionVelocity: "Low",
    commitsLast30Days: 0,
    lastCommit: "",
    techFocus: {}
  };

  const sortedProjects = [...signals].sort(
    (a, b) => b.scores.execution - a.scores.execution
  );

  const techEntries = Object.entries(live.techFocus)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <section className="max-w-6xl mx-auto py-24 space-y-12">
      <h2 className="text-3xl font-bold">Live Execution Intelligence</h2>

      {/* LIVE STATUS */}
      <div className="grid md:grid-cols-4 gap-6">
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
              className="px-4 py-2 border rounded-full text-sm"
            >
              {tech} · {count}
            </span>
          ))}
        </div>
      </div>

      {/* PROJECT EXECUTION */}
      <div>
        <h3 className="text-xl font-semibold mb-6">
          Active Project Signals
        </h3>

        <div className="grid md:grid-cols-3 gap-6">
          {sortedProjects.map((s) => (
            <div
              key={s.id}
              className="p-6 border rounded-xl space-y-2"
            >
              <h4 className="font-semibold">{s.id}</h4>

              <Metric
                label="Execution"
                value={s.scores.execution}
              />

              <Metric
                label="Complexity"
                value={s.scores.complexity}
              />
            </div>
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
    <div className="p-6 border rounded-xl">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-xl font-semibold mt-2">{value}</p>
    </div>
  );
}

function Metric({
  label,
  value
}: {
  label: string;
  value: number;
}) {
  return (
    <p className="text-sm">
      {label}:{" "}
      <span className="font-semibold">{value}</span>
    </p>
  );
}