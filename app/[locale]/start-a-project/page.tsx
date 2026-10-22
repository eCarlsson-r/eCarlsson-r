import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ProjectQuestionnaire from "@/components/start/ProjectQuestionnaire";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "startPage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: `/${locale}/start-a-project`,
      languages: {
        id: "/id/start-a-project",
        en: "/en/start-a-project",
      },
    },
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      url: `https://carlssonstudio.com/${locale}/start-a-project`,
    },
  };
}

export default async function StartAProjectPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <Suspense fallback={<div className="mx-auto max-w-3xl px-6 py-20" />}>
      <ProjectQuestionnaire />
    </Suspense>
  );
}
