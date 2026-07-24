"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const t = useTranslations("nav");
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
    setMounted(true);
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* storage may be blocked; the class change still applies for this session */
    }
  };

  return (
    <button
      onClick={toggle}
      aria-label={mounted ? (isDark ? t("switchToLight") : t("switchToDark")) : t("toggleTheme")}
      className="grid h-9 w-9 place-items-center rounded-md text-secondary hover:text-primary transition focus:outline-none focus:ring-2 focus:ring-primary"
    >
      {/* Render nothing until mounted so SSR (always light) can't mismatch the icon */}
      {mounted && (isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />)}
    </button>
  );
}
