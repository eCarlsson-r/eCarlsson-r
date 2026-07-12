import { Suspense } from "react";
import ProjectQuestionnaire from "@/components/start/ProjectQuestionnaire";

export const metadata = {
  title: "Start a Project | Carlsson Studio",
  description: "Answer a few questions about your business and get a recommended foundation matched to your operations.",
};

export default function StartAProjectPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-3xl px-6 py-20" />}>
      <ProjectQuestionnaire />
    </Suspense>
  );
}
