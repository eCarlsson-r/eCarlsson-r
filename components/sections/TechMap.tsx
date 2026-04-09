export default function TechMap() {
  const stacks = {
    frontend: ["Next.js", "Nuxt.js", "Angular"],
    backend: ["Laravel", ".NET Core", "FastAPI"],
    other: ["MySQL", "REST API"] 
  };

  return (
    <section className="max-w-4xl mx-auto px-2 py-8 text-center">
        <h2 className="text-2xl font-semibold">
          Tech Stack
        </h2>

        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          {Object.entries(stacks).map(([category, techList]) => (
            <div key={category}>
              <div className="md:flex md:flex-wrap gap-4 pt-3 justify-center items-center">
                <strong>{category.charAt(0).toUpperCase() + category.slice(1)}:</strong>
                <div className="flex flex-wrap gap-3 justify-center items-center">
                  {techList.map((tech) => (
                    <span key={tech} className="font-headline text-secondary italic text-on-surface-variant px-4 py-2 border rounded-full text-lg">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
  );
}
