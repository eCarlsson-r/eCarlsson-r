interface LiveSignals {
  activityPulse: string;
  executionVelocity: string;
  commitsLast30Days: number;
  techFocus: Record<string, number>;
}

export default function LiveSignalsPanel({ live }: { live: LiveSignals }) {
  const tech = Object.entries(live.techFocus).sort((a, b) => b[1] - a[1]);

  return (
    <div className="p-6 border rounded-2xl bg-linear-to-br from-chart-5 to-white space-y-6">
      <h2 className="text-xl font-semibold">⚡ Live Execution Intelligence</h2>

      {/* Core Metrics */}
      <div className="grid md:grid-cols-3 gap-6">
        <Stat title="Activity Pulse" value={live.activityPulse} />
        <Stat title="Execution Velocity" value={live.executionVelocity} />
        <Stat title="Commits (30 Days)" value={live.commitsLast30Days} />
      </div>

      {/* Tech Focus */}
      <div>
        <h3 className="text-sm font-semibold text-gray-600 mb-3">
          Current Technical Focus
        </h3>

        <div className="flex flex-wrap gap-2">
          {tech.map(([name, score]) => (
            <span
              key={name}
              className="px-3 py-1 rounded-full text-sm bg-chart-1 text-white"
            >
              {name} ({score})
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Stat({ title, value }: { title: string; value: number | string }) {
  return (
    <div className="p-4 border rounded-xl text-center bg-white">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}