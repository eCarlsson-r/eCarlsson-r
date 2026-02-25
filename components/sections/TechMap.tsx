export default function TechMap() {
  const stacks = [
    "Laravel",
    "Next.js",
    "Nuxt.js",
    "Angular",
    "ASP.NET Core",
    "FastAPI",
  ];

  return (
    <section className="max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-8">Technology Map</h2>

      <div className="flex flex-wrap gap-4">
        {stacks.map((tech) => (
          <span key={tech} className="px-4 py-2 border rounded-full text-sm">
            {tech}
          </span>
        ))}
      </div>
    </section>
  );
}
