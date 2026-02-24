import { getAllSignals } from "@/lib/signals/loadSignals";
import SignalsOverview from "@/components/signals/dashboard/SignalsOverview";
import SignalsComparisonGrid from "@/components/signals/dashboard/SignalsComparisonGrid";
import SignalsStrengthChart from "@/components/signals/dashboard/SignalsStrengthChart";
import SignalsInsightsPanel from "@/components/signals/dashboard/SignalsInsightsPanel";

export default function SignalsPage() {
  const signals = getAllSignals();

  return (
    <div className="max-w-6xl mx-auto py-16 space-y-16">
      <h1 className="text-4xl font-bold">Developer Execution Dashboard</h1>

      <SignalsOverview signals={signals} />
      <SignalsStrengthChart signals={signals} />
      <SignalsComparisonGrid signals={signals} />
      <SignalsInsightsPanel signals={signals} />
    </div>
  );
}
