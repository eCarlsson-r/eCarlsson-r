import { getSignalById } from "@/lib/signals/loadSignals";
import SignalCard from "@/components/signals/SignalCard";
import SignalSummary from "@/components/signals/SignalSummary";

interface Props {
  projectId: string;
}

export default function SignalsSection({ projectId }: Props) {
  const signals = getSignalById(projectId);
  if (!signals) return null;
  return (
    <section className="grid md:grid-cols-2 gap-6 mt-12">
      <SignalCard signals={signals} />
      <SignalSummary signals={signals} />
    </section>
  );
}
