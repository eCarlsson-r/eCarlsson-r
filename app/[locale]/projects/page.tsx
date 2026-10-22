import Projects from "@/components/sections/Projects";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const title =
    locale === "id"
      ? "Sistem Bisnis & Portofolio Software | Carlsson Studio"
      : "Business Systems & Solutions | Carlsson Studio";
  const description =
    locale === "id"
      ? "Portofolio sistem bisnis siap produksi: POS, CRM, ERP, HRIS & Payroll, dan platform AI kustom untuk bisnis berkembang."
      : "Production-ready business systems across retail, restaurant, property, insurance, wellness, HR & payroll, and AI.";

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/projects`,
      languages: {
        id: "/id/projects",
        en: "/en/projects",
      },
    },
    openGraph: {
      title,
      description,
      url: `https://carlssonstudio.com/${locale}/projects`,
    },
  };
}

export default function ProjectsPage() {
  return <Projects />;
}
