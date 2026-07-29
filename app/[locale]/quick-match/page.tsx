import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import QuickMatchPage from "../../quick-match/page";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "quickMatch" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function LocalizedQuickMatchPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <Suspense fallback={<div className="mx-auto max-w-3xl px-6 py-20" />}>
      {/* Client component renders the form and uses client-side translations */}
      {/* @ts-expect-error Server -> Client component import */}
      <QuickMatchPage />
    </Suspense>
  );
}
