import { domainAccents } from "@/data/brandAccents";

export default function DomainBadge({ domain }: { domain: string }) {
  if (!domain) return null;

  return (
    <span
      className="inline-block w-fit text-xs px-2 py-1 rounded text-white"
      style={{ backgroundColor: domainAccents[domain as keyof typeof domainAccents] ?? "#5d6f73" }}
    >
      {domain}
    </span>
  );
}
