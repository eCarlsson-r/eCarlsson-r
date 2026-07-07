const domainColors: Record<string, string> = {
  "Retail": "bg-blue-600",
  "Restaurant": "bg-orange-600",
  "Property": "bg-teal-600",
  "Insurance": "bg-indigo-600",
  "Wellness": "bg-pink-600",
  "HR & Payroll": "bg-sky-700",
  "AI": "bg-emerald-700",
};

export default function DomainBadge({ domain }: { domain: string }) {
  if (!domain) return null;

  return (
    <span className={`inline-block w-fit text-xs px-2 py-1 rounded text-white ${domainColors[domain] ?? "bg-gray-600"}`}>
      {domain}
    </span>
  );
}
