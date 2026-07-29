/**
 * Prospect-facing WhatsApp: a "message us" button on the results screen
 * that pre-fills the same summary the studio already gets by email
 * (see EmailTemplateService#buildLeadNotificationHtml on the backend) —
 * contact details, project details, problems, features, and the top
 * recommendation — as plain WhatsApp text (*bold* section headers).
 */

import type { Recommendation } from "./api";

export interface WhatsAppMessageAnswers {
  name: string;
  email: string;
  phone: string;
  company: string;
  companySize: string;
  industry: string;
  buildType: string;
  problems: string[];
  features: string[];
}

export interface WhatsAppMessageLabels {
  industry: (value: string) => string;
  buildType: (value: string) => string;
  problem: (value: string) => string;
  feature: (value: string) => string;
  companySize: (value: string) => string;
}

const DASH = "-";

function joinOrDash(items: string[]): string {
  return items.length > 0 ? items.join(", ") : DASH;
}

export function buildLeadWhatsAppMessage(
  answers: WhatsAppMessageAnswers,
  top: Pick<Recommendation, "foundationName" | "matchScore" | "matchReason">,
  labels: WhatsAppMessageLabels,
  locale: string = "id"
): string {
  let lines: string[];

  if (locale === "id") {
    lines = [
      "Halo Carlsson Studio! Saya baru saja mengisi formulir Start a Project.",
      "",
      "*Detail Kontak*",
      `Nama: ${answers.name || DASH}`,
      `Email: ${answers.email || DASH}`,
      `WhatsApp: ${answers.phone || DASH}`,
      `Bisnis: ${answers.company || DASH}`,
      `Jumlah Karyawan: ${answers.companySize ? labels.companySize(answers.companySize) : DASH}`,
      "",
      "*Detail Proyek*",
      `Industri: ${labels.industry(answers.industry)}`,
      `Jenis Sistem: ${labels.buildType(answers.buildType)}`,
      "",
      "*Masalah yang Ingin Diselesaikan*",
      joinOrDash(answers.problems.map(labels.problem)),
      "",
      "*Fitur yang Dibutuhkan*",
      joinOrDash(answers.features.map(labels.feature)),
      "",
      "*Rekomendasi Teratas*",
      `${top.foundationName} — ${Math.round(top.matchScore)}% kecocokan`,
      top.matchReason,
      "",
      "Mohon info lebih lanjut, terima kasih!",
    ];
  } else {
    lines = [
      "Hi Carlsson Studio — I just completed the Start a Project form.",
      "",
      "*Contact Details*",
      `Name: ${answers.name || DASH}`,
      `Email: ${answers.email || DASH}`,
      `WhatsApp: ${answers.phone || DASH}`,
      `Business: ${answers.company || DASH}`,
      `Company size: ${answers.companySize ? labels.companySize(answers.companySize) : DASH}`,
      "",
      "*Project Details*",
      `Industry: ${labels.industry(answers.industry)}`,
      `System type: ${labels.buildType(answers.buildType)}`,
      "",
      "*Problems to Solve*",
      joinOrDash(answers.problems.map(labels.problem)),
      "",
      "*Required Features*",
      joinOrDash(answers.features.map(labels.feature)),
      "",
      "*Top Recommendation*",
      `${top.foundationName} — ${Math.round(top.matchScore)}% match`,
      top.matchReason,
      "",
      "Please share more info — thanks!",
    ];
  }

  return lines.join("\n");
}

const STUDIO_NUMBER = process.env.NEXT_PUBLIC_STUDIO_WHATSAPP_NUMBER;

/** Renders nothing (returns null) until a studio number is configured —
 *  mirrors MetaPixel.tsx's inert-when-unset pattern. */
export function getStudioWhatsAppLink(message: string): string | null {
  if (!STUDIO_NUMBER) return null;
  return `https://wa.me/${STUDIO_NUMBER}?text=${encodeURIComponent(message)}`;
}
