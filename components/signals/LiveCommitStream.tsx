import { getCommitFeed } from "@/lib/signals/loadCommitFeed";
import { FeedItem } from "@/signals-engine";

export default function LiveCommitStream() {
  const commits = getCommitFeed();

  return (
    <section className="p-8 border rounded-2xl space-y-6">
      <h2 className="text-xl font-semibold">
        Live Engineering Activity
      </h2>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {commits.map((c: FeedItem, i: number) => (
          <div
            key={i}
            className="p-4 border rounded-lg hover:bg-gray-50 transition"
          >
            <p className="text-sm font-medium">
              {c.message}
            </p>

            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>{c.repo}</span>
              <span>
                {new Date(c.date!).toLocaleDateString()}
              </span>
            </div>

            <a
              href={c.url}
              target="_blank"
              className="text-xs text-indigo-600 mt-1 inline-block"
            >
              View Commit →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}