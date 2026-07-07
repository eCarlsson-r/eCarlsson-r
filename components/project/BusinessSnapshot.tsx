import { SnapshotRow } from "@/data/caseStudies";

export default function BusinessSnapshot({ rows }: { rows: SnapshotRow[] }) {
  if (rows.length === 0) return null;

  return (
    <div className="mt-8 divide-y divide-gray-200 dark:divide-white/10 rounded-2xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5">
      {rows.map((row) => (
        <div key={row.label} className="flex flex-col gap-1 px-5 py-3 sm:flex-row sm:items-center sm:gap-6">
          <span className="w-32 shrink-0 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {row.label}
          </span>
          <span className="flex flex-wrap items-center gap-2">
            {row.values.map((value) =>
              row.values.length > 1 ? (
                <span key={value} className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-white/10">
                  {value}
                </span>
              ) : (
                <span key={value} className="text-sm font-medium">
                  {value}
                </span>
              )
            )}
          </span>
        </div>
      ))}
    </div>
  );
}
