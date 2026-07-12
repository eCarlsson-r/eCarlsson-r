import Link from "next/link";

const footerLinks = [
  { href: "/projects", label: "Solutions" },
  { href: "/about", label: "Studio" },
  { href: "/insights", label: "Insights" },
  { href: "/start-a-project", label: "Start a Project" },
];

export default function Footer() {
  return (
    <footer className="bg-surface-container-low p-6">
      <div className="mx-auto max-w-6xl flex flex-col gap-4">
        <nav className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 text-sm">
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-secondary hover:text-primary transition">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-col gap-2 md:flex-row justify-between text-sm text-center text-slate-600 dark:text-slate-400">
          <p>© {new Date().getFullYear()} Carlsson Studio. Custom Business Software.</p>
          <p>Independent Software Studio based in Indonesia.</p>
        </div>
      </div>
    </footer>
  );
}
