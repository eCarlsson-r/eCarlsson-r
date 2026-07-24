"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

/**
 * Swaps the URL between /id and /en while staying on the same page.
 * next-intl's router persists the choice in the NEXT_LOCALE cookie, so the
 * selection survives future visits — mirroring the ThemeToggle pattern.
 * The button shows the language you'll switch TO (e.g. "EN" while on /id).
 */
export default function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("nav");

  const target = locale === "id" ? "en" : "id";

  const switchLocale = () => {
    router.replace(pathname, { locale: target });
  };

  return (
    <button
      onClick={switchLocale}
      aria-label={target === "en" ? t("switchToEnglish") : t("switchToIndonesian")}
      className="h-9 px-2 grid place-items-center rounded-md text-xs font-label uppercase tracking-widest text-secondary hover:text-primary transition focus:outline-none focus:ring-2 focus:ring-primary"
    >
      {target}
    </button>
  );
}
