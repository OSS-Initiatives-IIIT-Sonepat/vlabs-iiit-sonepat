"use client";

import { useTranslations } from "next-intl";

type Role = "student" | "professor" | "explorer" | "other";

export function useOnboardingRoles() {
  const t = useTranslations("onboarding.roles");

  const roles: { value: Role; label: string; description: string }[] = [
    {
      value: "student",
      label: t("student.label"),
      description: t("student.description"),
    },
    {
      value: "professor",
      label: t("professor.label"),
      description: t("professor.description"),
    },
    {
      value: "explorer",
      label: t("explorer.label"),
      description: t("explorer.description"),
    },
    {
      value: "other",
      label: t("other.label"),
      description: t("other.description"),
    },
  ];

  return roles;
}

export type { Role };
