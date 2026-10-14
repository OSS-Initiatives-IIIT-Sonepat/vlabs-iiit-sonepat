"use client";

import { useTranslations } from "next-intl";

export function useOnboardingDepartments() {
  const t = useTranslations("onboarding.departments");

  const departments: { value: string; label: string }[] = [
    { value: "cs", label: t("cs") },
    { value: "ee", label: t("ee") },
    { value: "me", label: t("me") },
    { value: "ce", label: t("ce") },
    { value: "che", label: t("che") },
    { value: "bio", label: t("bio") },
    { value: "chem", label: t("chem") },
    { value: "phys", label: t("phys") },
    { value: "math", label: t("math") },
    { value: "stats", label: t("stats") },
    { value: "ai", label: t("ai") },
    { value: "cyber", label: t("cyber") },
    { value: "env", label: t("env") },
    { value: "med", label: t("med") },
    { value: "arch", label: t("arch") },
    { value: "eco", label: t("eco") },
    { value: "psy", label: t("psy") },
    { value: "edu", label: t("edu") },
  ];

  return departments;
}
