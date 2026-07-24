import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Footer() {
  const t = useTranslations("footer");
  const footerLinks = [
    { href: "/projects", label: t("solutions") },
    { href: "/about", label: t("studio") },
    { href: "/insights", label: t("insights") },
    { href: "/start-a-project", label: t("startProject") },
  ];

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
          <p>{t("copyright", { year: new Date().getFullYear() })}</p>
          <p>{t("tagline")}</p>
        </div>
      </div>
    </footer>
  );
}
