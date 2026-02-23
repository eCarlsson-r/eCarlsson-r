interface Props {
  label: string;
  score: number;
}

export default function SignalMeter({ label, score }: Props) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm font-medium text-gray-700">
        <span>{label}</span>
        <span>{score}/100</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full"
          style={{ width: `${score}%` }}
        ></div>
      </div>
    </div>
  );
}
