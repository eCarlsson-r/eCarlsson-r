export default function TechBadge({ name }: { name: string }) {
  return (
    <span className="px-3 py-1 text-xs border rounded-full bg-gray-100">
      {name}
    </span>
  );
}
