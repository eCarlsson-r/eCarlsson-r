import ScoreBar from "@/components/project/ScoreBar";
import { ProcessedProject } from "@/core/types";
import { getTranslations } from "next-intl/server";

interface Props {
  signals: ProcessedProject[];
}

export default async function SignalsStrengthChart({ signals }: Props) {
  const t = await getTranslations("signals");
  const total = (key: keyof ProcessedProject["scores"]) =>
    Math.round(
      signals.reduce((sum, s) => sum + s.scores[key], 0) / signals.length,
    );

  const data = [
    { label: t("strengths.execution"), value: total("execution") },
    { label: t("strengths.complexity"), value: total("complexity") },
    { label: t("strengths.ownership"), value: total("ownership") },
  ];

  return (
    <div className="p-6 border rounded-2xl space-y-6">
      <h2 className="text-xl font-semibold text-secondary">{t("strengths.title")}</h2>

      {data.map((d) => (
        <ScoreBar key={d.label} label={d.label} value={d.value} size="md" height={3} />
      ))}
    </div>
  );
}
