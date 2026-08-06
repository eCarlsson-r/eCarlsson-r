import assert from "node:assert/strict";
import test from "node:test";
import { buildOperationalAssessment } from "./assessment-engine.ts";

test("buildOperationalAssessment lowers readiness as complexity increases", () => {
  const basic = buildOperationalAssessment(
    {
      problems: ["Manual spreadsheets"],
      features: ["Dashboard"],
      companySize: "1-5",
      businessStatus: "PLANNING",
    },
    "en"
  );

  const complex = buildOperationalAssessment(
    {
      problems: ["Manual spreadsheets", "No inventory", "WhatsApp chaos"],
      features: ["Dashboard", "Inventory", "Reports", "AI"],
      companySize: "100+",
      businessStatus: "RUNNING",
    },
    "en"
  );

  assert.ok(basic.score > complex.score);
  assert.ok(basic.findings.length >= 1);
  assert.ok(complex.priorities.length >= 3);
  assert.ok(complex.recommendationBenefits.length >= 3);
});
