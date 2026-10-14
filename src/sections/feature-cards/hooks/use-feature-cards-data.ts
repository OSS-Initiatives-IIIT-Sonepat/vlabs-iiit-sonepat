"use client";

import { useTranslations } from "next-intl";
import { type FeatureCardRecord } from "../feature-cards.data";

export function useFeatureCardsData(): FeatureCardRecord[] {
  const t = useTranslations("home.featureCards");

  return [
    {
      heading: "Capacitor",
      body: t("capacitor.body"),
      component: "capacitor" as const,
      label: t("capacitor.label"),
    },
    {
      heading: "Potentiometer",
      body: t("potentiometer.body"),
      component: "potentiometer" as const,
      label: t("potentiometer.label"),
    },
    {
      heading: "Push Button",
      body: t("pushButton.body"),
      component: "push-button" as const,
      label: t("pushButton.label"),
    },
  ];
}
