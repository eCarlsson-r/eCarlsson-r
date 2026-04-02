import Link from "next/link";

export default function Hero() {
  return (
    <section className="py-32">
      <div className="mx-auto max-w-4xl px-6 text-center">
        {/* Title */}
        <h1 className="text-5xl font-headline font-bold leading-tight text-primary">
          Full-Stack Software Engineer
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg text-on-surface-variant leading-relaxed">
          I build scalable business systems using Laravel, modern frontend
          frameworks, and clean architecture. Specialized in POS, commerce, and
          enterprise workflows.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex justify-center gap-4">
          <Link
            href="/projects"
            className="rounded-none bg-primary px-6 py-3 text-sm font-label text-on-primary hover:bg-primary-container transition-opacity duration-200"
          >
            View Projects
          </Link>

          <a
            href="/resume.pdf"
            className="rounded-none border border-outline px-6 py-3 text-sm font-label text-on-surface hover:bg-surface-container-low transition-colors duration-200"
          >
            Download Resume
          </a>
        </div>

        {/* Stack Badges */}
        <div className="mt-10 flex flex-wrap justify-center gap-3 text-sm text-on-surface-variant">
          {[
            "Laravel",
            "React / Next.js",
            "Vue / Nuxt",
            "Angular",
            "REST APIs",
            "System Architecture",
          ].map((tech) => (
            <span key={tech} className="rounded-md bg-surface-container-high px-3 py-1 text-tertiary">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
