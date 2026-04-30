import { getAllSignals } from "@/lib/signals/loadSignals";

export default async function TrustBar() {
  const signals = await getAllSignals();

  return (
    <div className="border-y py-6 bg-gray-50">
      <div className="max-w-6xl mx-auto flex justify-around text-sm">
        <Stat label="Production Systems Built" value={signals.length} />
        <Stat label="Frontend + Backend + API" value="Full-Stack" />
        <Stat label="SaaS · AI" value="POS · CRM · Payroll" />
        <Stat label="Project Ownership" value="100%" />
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="text-center">
      <p className="font-semibold">{value}</p>
      <p className="text-gray-500">{label}</p>
    </div>
  );
}
