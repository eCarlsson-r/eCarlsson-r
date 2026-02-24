import { getSignalById } from "@/lib/signals/loadSignals";
import SignalsRadar from "@/components/signals/SignalsRadar";
import SignalsBreakdown from "@/components/signals/SignalsBreakdown";
import SignalSummary from "@/components/signals/SignalSummary";
import ExecutionTimeline from "@/components/signals/ExecutionTimeline";

interface Props {
  projectId: string;
}

export default function SignalsSection({ projectId }: Props) {
  const signals = getSignalById(projectId);
  if (!signals) return null;

  return (
    <section className="space-y-10 mt-16">
      <h2 className="text-2xl font-semibold">Execution Signals</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <SignalsRadar signals={signals} />
        <SignalsBreakdown signals={signals} />
      </div>

      <ExecutionTimeline />

      <SignalSummary signals={signals} />
    </section>
  );
}