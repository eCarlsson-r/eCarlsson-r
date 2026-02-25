interface Props {
  live: {
    activityPulse: string;
    executionVelocity: string;
    commitsLast30Days: number;
    lastCommit?: string;
    techFocus: Record<string, number>;
  };
}

export default function LiveExecutionPanel({ live }: Props) {
  const techEntries = Object.entries(live.techFocus)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  return (
    <div className="p-6 border rounded-2xl space-y-6">
      <h2 className="text-xl font-semibold">
        Live Execution Status
      </h2>

      {/* Status Grid */}
      <div className="grid md:grid-cols-4 gap-6">
        <Stat label="Activity Pulse" value={live.activityPulse} />
        <Stat label="Velocity" value={live.executionVelocity} />
        <Stat
          label="Commits (30d)"
          value={live.commitsLast30Days.toString()}
        />
        <Stat
          label="Last Commit"
          value={
            live.lastCommit
              ? new Date(live.lastCommit).toLocaleDateString()
              : "-"
          }
        />
      </div>

      {/* Tech Focus */}
      <div>
        <h3 className="text-sm font-medium mb-3 text-gray-500">
          Active Technology Focus
        </h3>

        <div className="flex flex-wrap gap-2">
          {techEntries.map(([tech, count]) => (
            <span
              key={tech}
              className="px-3 py-1 border rounded-full text-xs"
            >
              {tech} · {count}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Stat({
  label,
  value
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="text-center">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-lg font-semibold mt-1">{value}</p>
    </div>
  );
}