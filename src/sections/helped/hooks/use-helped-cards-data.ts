"use client";

import { useTranslations } from "next-intl";
import { type HelpedCardRecord } from "../helped.data";

export function useHelpedCardsData(): HelpedCardRecord[] {
  const t = useTranslations("home.helped");

  return [
    {
      wordmark: "IC Meter",
      heading: t("cards.0.heading"),
      body: t("cards.0.body"),
      illustration: "target" as const,
      href: "/labs/half-adder",
    },
    {
      wordmark: "DC Power Supply",
      heading: t("cards.1.heading"),
      body: t("cards.1.body"),
      illustration: "spaceship" as const,
      href: "/labs/half-adder",
    },
    {
      wordmark: "MCU Trainer",
      heading: t("cards.2.heading"),
      body: t("cards.2.body"),
      illustration: "money" as const,
      href: "/labs/half-adder",
    },
  ];
}
