export interface AssessmentFinding {
  title: string;
  description: string;
}

export interface AssessmentPriority {
  title: string;
  description: string;
  icon: "workflow" | "layers" | "sparkles";
}

export interface OperationalAssessment {
  score: number;
  summary: string;
  findings: AssessmentFinding[];
  priorities: AssessmentPriority[];
  recommendationBenefits: string[];
}

interface AnswersLike {
  problems: string[];
  features: string[];
  companySize: string;
  businessStatus: "RUNNING" | "PLANNING" | "";
}

type Locale = "en" | "id";

type AssessmentConfigEntry = {
  weight: number;
  content: Record<Locale, { title: string; description: string }>;
};

type BenefitConfigEntry = Record<Locale, string>;

const config = {
  problemMapping: {
    "Duplicate work": {
      weight: 7,
      content: {
        en: {
          title: "There is still repetitive work in daily operations.",
          description: "Manual handoffs and repeated input are creating friction across the team.",
        },
        id: {
          title: "Masih ada pekerjaan yang berulang dalam operasional harian.",
          description: "Pindah tangan data dan input berulang menciptakan hambatan di tim.",
        },
      },
    },
    "Manual spreadsheets": {
      weight: 8,
      content: {
        en: {
          title: "The business still depends on spreadsheets and manual follow-up.",
          description: "Operational visibility is limited because critical data is still spread across manual tools.",
        },
        id: {
          title: "Bisnis masih bergantung pada spreadsheet dan follow-up manual.",
          description: "Visibilitas operasional terbatas karena data penting masih tersebar di alat manual.",
        },
      },
    },
    "No dashboard": {
      weight: 6,
      content: {
        en: {
          title: "Leadership does not have a live view of business performance.",
          description: "The team is missing a simple way to understand what is happening in real time.",
        },
        id: {
          title: "Pimpinan belum punya gambaran real-time performa bisnis.",
          description: "Tim belum punya cara sederhana untuk melihat apa yang sedang terjadi secara real time.",
        },
      },
    },
    "No reporting": {
      weight: 7,
      content: {
        en: {
          title: "Reporting is still delayed or inconsistent.",
          description: "Decision-making is slower because reports are not yet available when the team needs them.",
        },
        id: {
          title: "Pelaporan masih tertunda atau tidak konsisten.",
          description: "Pengambilan keputusan lebih lambat karena laporan belum tersedia tepat saat dibutuhkan.",
        },
      },
    },
    "No inventory": {
      weight: 7,
      content: {
        en: {
          title: "Inventory is at risk of becoming disconnected.",
          description: "Stock movement is harder to track, which creates risk for ordering and fulfillment.",
        },
        id: {
          title: "Stok berpotensi tidak sinkron.",
          description: "Pergerakan stok lebih sulit dilacak sehingga menimbulkan risiko di pemesanan dan fulfillment.",
        },
      },
    },
    "No booking": {
      weight: 7,
      content: {
        en: {
          title: "Reservations are still managed manually.",
          description: "Booking flow is vulnerable to missed steps and inconsistent customer experience.",
        },
        id: {
          title: "Reservasi masih dilakukan secara manual.",
          description: "Alur booking rentan terhadap langkah yang terlewat dan pengalaman pelanggan yang tidak konsisten.",
        },
      },
    },
    "WhatsApp chaos": {
      weight: 8,
      content: {
        en: {
          title: "Communication is still spread across chat threads.",
          description: "Orders, requests, and follow-up are too easy to lose inside messaging apps.",
        },
        id: {
          title: "Komunikasi masih tersebar di banyak thread chat.",
          description: "Pesanan, permintaan, dan follow-up terlalu mudah hilang di aplikasi chat.",
        },
      },
    },
  } satisfies Record<string, AssessmentConfigEntry>,
  featureMapping: {
    AI: {
      weight: 4,
      content: {
        en: {
          title: "There is room to automate repetitive decisions.",
          description: "AI can support faster responses and less manual handling in the workflow.",
        },
        id: {
          title: "Ada peluang otomasi pada keputusan yang berulang.",
          description: "AI dapat mempercepat respons dan mengurangi penanganan manual di alur kerja.",
        },
      },
    },
    Dashboard: {
      weight: 3,
      content: {
        en: {
          title: "Leadership needs a clearer operational view.",
          description: "A shared dashboard will make business performance easier to read and act on.",
        },
        id: {
          title: "Pimpinan butuh gambaran operasional yang lebih jelas.",
          description: "Dashboard bersama akan membuat performa bisnis lebih mudah dibaca dan ditindaklanjuti.",
        },
      },
    },
    Inventory: {
      weight: 4,
      content: {
        en: {
          title: "Stock control needs to become more reliable.",
          description: "Operational accuracy improves when inventory is tracked from a single source of truth.",
        },
        id: {
          title: "Kontrol stok perlu lebih andal.",
          description: "Akurasi operasional meningkat saat stok dilacak dari satu sumber kebenaran.",
        },
      },
    },
    Reports: {
      weight: 3,
      content: {
        en: {
          title: "Real-time reporting should become part of the operating rhythm.",
          description: "The business needs better visibility for planning and fast decisions.",
        },
        id: {
          title: "Pelaporan real-time harus menjadi bagian dari ritme operasional.",
          description: "Bisnis perlu visibilitas yang lebih baik untuk perencanaan dan keputusan cepat.",
        },
      },
    },
    Scheduling: {
      weight: 3,
      content: {
        en: {
          title: "Operational coordination needs clearer structure.",
          description: "Scheduling will help reduce missed steps and manual follow-up.",
        },
        id: {
          title: "Koordinasi operasional perlu struktur yang lebih jelas.",
          description: "Penjadwalan membantu mengurangi langkah yang terlewat dan follow-up manual.",
        },
      },
    },
  } satisfies Record<string, AssessmentConfigEntry>,
  companySizeWeight: {
    "1-5": 3,
    "5-20": 6,
    "20-100": 10,
    "100+": 14,
  },
  businessStatusWeight: {
    RUNNING: 8,
    PLANNING: 4,
  },
  scoreFloor: 35,
  scoreCeiling: 100,
  summaryByStatus: {
    RUNNING: {
      en: "Your business has grown and now needs a more integrated system so operations stay efficient.",
      id: "Bisnis Anda telah berkembang dan mulai membutuhkan sistem yang lebih terintegrasi agar operasional tetap efisien.",
    },
    PLANNING: {
      en: "Your business is still forming, so building the right operational foundation early will reduce friction later.",
      id: "Bisnis Anda masih dalam tahap pembentukan, sehingga membangun fondasi operasional yang tepat sejak awal akan mengurangi hambatan di kemudian hari.",
    },
  },
  priorities: [
    {
      key: "workflow",
      icon: "workflow" as const,
      content: {
        en: {
          title: "Workflow clarity",
          description: "Standardize how work moves between people, tools, and decisions.",
        },
        id: {
          title: "Kejelasan alur kerja",
          description: "Standarisasi bagaimana pekerjaan bergerak di antara orang, alat, dan keputusan.",
        },
      },
    },
    {
      key: "standardization",
      icon: "layers" as const,
      content: {
        en: {
          title: "Operational standardization",
          description: "Define shared rules, data, and handoffs so the business scales more predictably.",
        },
        id: {
          title: "Standarisasi operasional",
          description: "Tentukan aturan, data, dan handoff bersama agar bisnis tumbuh lebih terprediksi.",
        },
      },
    },
    {
      key: "implementation",
      icon: "sparkles" as const,
      content: {
        en: {
          title: "System implementation",
          description: "Introduce a foundation that supports growth without making the team dependent on manual work.",
        },
        id: {
          title: "Implementasi sistem",
          description: "Perkenalkan fondasi yang mendukung pertumbuhan tanpa membuat tim bergantung pada kerja manual.",
        },
      },
    },
  ],
  benefitMapping: {
    "Duplicate work": {
      en: "Reduce repetitive input across the team",
      id: "Mengurangi input berulang di seluruh tim",
    },
    "Manual spreadsheets": {
      en: "Move away from manual spreadsheets",
      id: "Mengurangi ketergantungan pada spreadsheet manual",
    },
    "No dashboard": {
      en: "Create a shared view of business performance",
      id: "Menyediakan gambaran performa bisnis yang dibagi bersama",
    },
    "No reporting": {
      en: "Provide real-time reporting and visibility",
      id: "Memberikan pelaporan dan visibilitas real-time",
    },
    "No inventory": {
      en: "Keep inventory and stock data aligned",
      id: "Menjaga data stok dan inventori tetap sinkron",
    },
    "No booking": {
      en: "Streamline reservations and customer flow",
      id: "Memudahkan proses reservasi dan alur pelanggan",
    },
    "WhatsApp chaos": {
      en: "Bring customer communication into one structured flow",
      id: "Mengumpulkan komunikasi pelanggan ke satu alur yang terstruktur",
    },
    AI: {
      en: "Create room for automation and AI-driven support",
      id: "Membuka peluang otomasi dan dukungan berbasis AI",
    },
    Dashboard: {
      en: "Unify operational data in one place",
      id: "Menyatukan data operasional di satu tempat",
    },
    Inventory: {
      en: "Improve stock accuracy and control",
      id: "Meningkatkan akurasi dan kontrol stok",
    },
    Reports: {
      en: "Support better decisions with live reporting",
      id: "Mendukung keputusan yang lebih baik dengan pelaporan langsung",
    },
    Scheduling: {
      en: "Reduce missed steps and improve coordination",
      id: "Mengurangi langkah yang terlewat dan meningkatkan koordinasi",
    },
  } satisfies Record<string, BenefitConfigEntry>,
};

function normalizeLocale(locale: string): Locale {
  return locale.startsWith("id") ? "id" : "en";
}

export function buildOperationalAssessment(answers: AnswersLike, locale: string): OperationalAssessment {
  const lang = normalizeLocale(locale);
  const problems = answers.problems.filter(Boolean);
  const features = answers.features.filter(Boolean);

  const penalty =
    problems.reduce((acc, item) => acc + (config.problemMapping[item]?.weight ?? 0), 0) +
    features.reduce((acc, item) => acc + (config.featureMapping[item]?.weight ?? 0), 0) +
    (config.companySizeWeight[answers.companySize] ?? 0) +
    (config.businessStatusWeight[answers.businessStatus as keyof typeof config.businessStatusWeight] ?? 0);

  const score = Math.max(
    config.scoreFloor,
    Math.min(config.scoreCeiling, config.scoreCeiling - penalty)
  );

  const summary = config.summaryByStatus[answers.businessStatus === "RUNNING" ? "RUNNING" : "PLANNING"][lang];

  const findings = [
    ...problems.slice(0, 3).map((problem) => config.problemMapping[problem]?.content[lang]).filter(Boolean),
    ...features.slice(0, 2).map((feature) => config.featureMapping[feature]?.content[lang]).filter(Boolean),
  ].slice(0, 3).map((entry) => ({
    title: entry.title,
    description: entry.description,
  }));

  const fallbackFindings = [
    {
      title: lang === "id" ? "Ada peluang untuk memperkuat fondasi operasional" : "There is room to strengthen the operational foundation",
      description:
        lang === "id"
          ? "Kebutuhan bisnis Anda menunjukkan bahwa sistem yang lebih terstruktur akan membantu pertumbuhan."
          : "Your business needs suggest that a more structured system will support growth.",
    },
  ];

  const priorities = config.priorities.map((priority) => ({
    title: priority.content[lang].title,
    description: priority.content[lang].description,
    icon: priority.icon,
  }));

  const recommendationBenefits = Array.from(
    new Set([
      ...problems.flatMap((problem) => (config.benefitMapping[problem]?.[lang] ? [config.benefitMapping[problem][lang]] : [])),
      ...features.flatMap((feature) => (config.benefitMapping[feature]?.[lang] ? [config.benefitMapping[feature][lang]] : [])),
    ])
  ).slice(0, 5);

  return {
    score,
    summary,
    findings: findings.length > 0 ? findings : fallbackFindings,
    priorities,
    recommendationBenefits:
      recommendationBenefits.length > 0
        ? recommendationBenefits
        : [
            lang === "id" ? "Menyatukan data operasional" : "Unify operational data",
            lang === "id" ? "Mengurangi ketergantungan pada kerja manual" : "Reduce dependence on manual work",
          ],
  };
}
