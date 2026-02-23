import Link from "next/link";

export default function Hero() {
  return (
    <section className="py-32">
      <div className="mx-auto max-w-4xl px-6 text-center">
        {/* Title */}
        <h1 className="text-5xl font-bold leading-tight text-gray-900">
          Full-Stack Software Engineer
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg text-gray-600 leading-relaxed">
          I build scalable business systems using Laravel, modern frontend
          frameworks, and clean architecture. Specialized in POS, commerce, and
          enterprise workflows.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex justify-center gap-4">
          <Link
            href="/projects"
            className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow hover:bg-blue-700"
          >
            View Projects
          </Link>

          <a
            href="/resume.pdf"
            className="rounded-lg border px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            Download Resume
          </a>
        </div>

        {/* Stack Badges */}
        <div className="mt-10 flex flex-wrap justify-center gap-3 text-sm text-gray-600">
          {[
            "Laravel",
            "React / Next.js",
            "Vue / Nuxt",
            "Angular",
            "REST APIs",
            "System Architecture",
          ].map((tech) => (
            <span key={tech} className="rounded-md bg-gray-100 px-3 py-1">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
