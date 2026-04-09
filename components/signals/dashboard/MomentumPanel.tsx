import ScoreBar from "@/components/project/ScoreBar";

interface Props {
  momentum: string;
  consistencyScore: number;
}

export default function MomentumPanel({
  momentum,
  consistencyScore
}: Props) {
  const color =
    momentum === "Accelerating"
      ? "text-green-600"
      : momentum === "Slowing"
      ? "text-red-600"
      : "text-yellow-600";

  return (
    <div className="p-6 border rounded-2xl space-y-6">
      <h2 className="text-xl font-semibold text-secondary">
        Execution Momentum
      </h2>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">Trend</p>
          <p className={`text-2xl font-bold ${color}`}>
            {momentum}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Consistency Score
          </p>
          <p className="text-2xl font-bold">
            {consistencyScore}/100
          </p>
        </div>
      </div>

      <ScoreBar value={consistencyScore} height={3} />
    </div>
  );
}