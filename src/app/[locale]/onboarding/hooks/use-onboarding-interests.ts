"use client";

import { useTranslations } from "next-intl";

export function useOnboardingInterests() {
  const t = useTranslations("onboarding.interests");

  const interests: { value: string; label: string }[] = [
    { value: "circuits", label: t("circuits") },
    { value: "signals", label: t("signals") },
    { value: "embedded", label: t("embedded") },
    { value: "robotics", label: t("robotics") },
    { value: "ml", label: t("ml") },
    { value: "cv", label: t("cv") },
    { value: "nlp", label: t("nlp") },
    { value: "algo", label: t("algo") },
    { value: "os", label: t("os") },
    { value: "networks", label: t("networks") },
    { value: "db", label: t("db") },
    { value: "webdev", label: t("webdev") },
    { value: "thermodynamics", label: t("thermodynamics") },
    { value: "fluid", label: t("fluid") },
    { value: "mechanics", label: t("mechanics") },
    { value: "quantum", label: t("quantum") },
    { value: "optics", label: t("optics") },
    { value: "chem_react", label: t("chem_react") },
    { value: "biotech", label: t("biotech") },
    { value: "genetics", label: t("genetics") },
    { value: "materials", label: t("materials") },
    { value: "control", label: t("control") },
    { value: "power", label: t("power") },
    { value: "vlsi", label: t("vlsi") },
    { value: "security", label: t("security") },
  ];

  return interests;
}
