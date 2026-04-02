interface Props {
  label: string;
  score: number;
}

export default function SignalMeter({ label, score }: Props) {
  return (

    <div className="space-y-2">
      <div className="flex justify-between items-end mb-4">
        <span className="font-headline text-xl text-on-surface">{label}</span>
        <span className="font-label text-sm text-secondary">{score}%</span>
      </div>
      <div className="w-full h-1 bg-surface-container-highest">
        <div className="h-full bg-primary" style={{ width: `${score}%` }}></div>
      </div>
    </div>
  );
}
