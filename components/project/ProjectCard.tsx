import Link from "next/link";

interface Props {
  slug: string;
  title: string;
  summary: string;
  backend: string[];
  frontend: string[];
}

export default function ProjectCard({
  slug,
  title,
  summary,
  backend,
  frontend,
}: Props) {
  return (
    <Link
      href={`/projects/${slug}`}
      className="group block rounded-xl border border-gray-200 bg-white p-6 transition hover:shadow-lg"
    >
      {/* Title */}
      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600">
        {title}
      </h3>

      {/* Summary */}
      <p className="mt-3 text-sm text-gray-600 leading-relaxed">
        {summary}
      </p>

      {/* Stack */}
      <div className="mt-5 flex flex-wrap gap-2">
        {[...backend, ...frontend].map((tech) => (
          <span
            key={tech}
            className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-6 text-sm font-medium text-blue-600">
        View Case Study →
      </div>
    </Link>
  );
}