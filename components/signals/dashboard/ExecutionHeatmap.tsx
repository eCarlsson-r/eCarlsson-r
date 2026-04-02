interface Point {
  date: string;
  count: number;
}

export default function ExecutionHeatmap({ data }: { data: Point[] }) {
  const max = Math.max(...data.map((d) => d.count), 1);

  function getColor(count: number) {
    const intensity = count / max;

    if (intensity === 0) return "bg-gray-100";
    if (intensity < 0.25) return "bg-primary-200";
    if (intensity < 0.5) return "bg-primary-400";
    if (intensity < 0.75) return "bg-primary-600";
    return "bg-primary-800";
  }

  return (
    <div className="p-6 border rounded-2xl space-y-6">
      <h2 className="text-xl font-semibold">Execution Timeline</h2>

      <div className="grid grid-cols-14 gap-1">
        {data.map((d) => (
          <div
            key={d.date}
            title={`${d.date}: ${d.count} executions`}
            className={`w-4 h-4 rounded-sm ${getColor(d.count)}`}
          />
        ))}
      </div>

      <p className="text-sm text-gray-500">
        Darker color indicates higher development activity.
      </p>
    </div>
  );
}