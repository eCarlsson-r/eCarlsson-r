"use client";

import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Faq() {
  const t = useTranslations("studio");
  const items = [1,2,3,4,5,6].map((i) => ({ q: t(`faq.items.${i}.q`), a: t(`faq.items.${i}.a`) }));

  return (
    <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
      <h2 className="text-2xl md:text-3xl font-semibold">{t("faq.title")}</h2>
      <div className="mt-8 divide-y divide-gray-200 dark:divide-white/10 rounded-2xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5">
        {items.map((faq) => (
          <details key={faq.q} className="group px-5 py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold">
              {faq.q}
              <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
            </summary>
            <p className="mt-3 text-sm text-muted-foreground">{faq.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
