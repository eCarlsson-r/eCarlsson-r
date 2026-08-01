import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-surface-container-low p-6">
      <div className="mx-auto max-w-6xl flex flex-col gap-4">
        <div className="flex flex-col gap-2 md:flex-row justify-between text-sm text-center text-slate-600 dark:text-slate-400">
          <p>{t("copyright", { year: new Date().getFullYear() })}</p>
          <p>{t("tagline")}</p>
        </div>
      </div>
    </footer>
  );
}
