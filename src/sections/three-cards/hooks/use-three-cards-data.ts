"use client";

import { useTranslations } from "next-intl";
import { type IllustrationCardRecord } from "../three-cards.data";

export function useThreeCardsData(): IllustrationCardRecord[] {
  const t = useTranslations("home.threeCards");

  return [
    {
      heading: "Breadboard",
      body: t("breadboard.body"),
      attribution: {
        role: t("breadboard.role"),
        company: t("breadboard.company"),
      },
      illustration: "breadboard" as const,
    },
    {
      heading: "LED",
      body: t("led.body"),
      attribution: {
        role: t("led.role"),
        company: t("led.company"),
      },
      illustration: "led" as const,
    },
    {
      heading: "Resistor",
      body: t("resistor.body"),
      attribution: {
        role: t("resistor.role"),
        company: t("resistor.company"),
      },
      illustration: "resistor" as const,
    },
  ];
}
