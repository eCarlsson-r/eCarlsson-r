export default function SignalBadge({ label, value }: any) {
  const color =
    value === "High"
      ? "bg-green-100 text-green-700 dark:bg-green-900/30"
      : value === "Medium"
      ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30"
      : "bg-gray-100 text-gray-600 dark:bg-gray-800";

  return (
    <span className={`text-xs px-2 py-1 rounded-full ${color}`}>
      {label}: {value}
    </span>
  );
}
