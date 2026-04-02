export default function AboutPreview() {
  return (
    <section className="max-w-3xl mx-auto py-20">
      <div className="text-center">
        <span className="font-label text-xs uppercase tracking-[0.5em] text-tertiary block mb-10">
          — Approach —
        </span>
        <h2 className="text-5xl font-headline font-bold text-primary mb-12">
          Structure as Narrative
        </h2>
      </div>

      <div className="space-y-8 text-xl leading-relaxed text-on-surface-variant">
        <p>
          I believe that software architecture is a form of editorial curation.
          Every line of code should contribute to a cohesive story of stability,
          scalability, and user intent.
        </p>
        <p>
          My approach leverages the &quot;Editorial Red Pen&quot;—a commitment to stripping
          away unnecessary complexity until only the most functional and elegant
          solutions remain. Whether it&apos;s a Laravel backend or a React frontend,
          the goal is clarity.
        </p>
        <div className="flex justify-center pt-8">
          <span className="text-tertiary font-bold text-2xl">❧</span>
        </div>
      </div>
    </section>
  );
}
