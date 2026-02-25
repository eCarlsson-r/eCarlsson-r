interface LiveSignals {
  activityPulse: string;
  executionVelocity: string;
  commitsLast30Days: number;
  techFocus: Record<string, number>;
}

export default function LiveExecutionStatus({
  live,
}: {
  live: LiveSignals;
}) {
  const topTech = Object.entries(live.techFocus)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  return (
    <section className="p-8 border rounded-2xl bg-gradient-to-br from-indigo-50 to-white">
      <h2 className="text-xl font-semibold mb-6">
        Live Execution Status
      </h2>

      <div className="grid md:grid-cols-4 gap-6 text-center">
        <Stat label="Activity Pulse" value={live.activityPulse} />
        <Stat label="Execution Velocity" value={live.executionVelocity} />
        <Stat label="Commits (30 days)" value={live.commitsLast30Days} />
        <div>
          <p className="text-sm text-gray-500 mb-2">Current Focus</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {topTech.map(([tech]) => (
              <span
                key={tech}
                className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: any }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
}