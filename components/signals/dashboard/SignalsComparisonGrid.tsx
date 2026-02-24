import { ProjectSignals } from "@/lib/signals/types";

interface Props {
  signals: ProjectSignals[];
}

export default function SignalsComparisonGrid({ signals }: Props) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Project Comparison</h2>

      <div className="overflow-x-auto border rounded-2xl">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Project</th>
              <th>Execution</th>
              <th>Complexity</th>
              <th>Ownership</th>
            </tr>
          </thead>

          <tbody>
            {signals.map((s) => (
              <tr key={s.id} className="border-t">
                <td className="p-4 font-medium">{s.id}</td>
                <td className="text-center">{s.scores.execution}</td>
                <td className="text-center">{s.scores.complexity}</td>
                <td className="text-center">{s.scores.ownership}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
