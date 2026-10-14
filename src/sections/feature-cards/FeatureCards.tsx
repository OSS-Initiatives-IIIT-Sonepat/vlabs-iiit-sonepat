"use client";

import { useTranslations } from "next-intl";
import {
  Eyebrow,
  Heading,
  SectionIntro,
  SectionShell,
  SectionStack,
} from "@/ui";

import { FeatureCard } from "./FeatureCard";
import { useFeatureCardsData } from "./hooks/use-feature-cards-data";

const centeredIntroClassName =
  "md:justify-items-center md:mx-auto md:max-w-[900px] md:text-center";

export function FeatureCards() {
  const t = useTranslations("home.featureCards");
  const cards = useFeatureCardsData();

  return (
    <SectionShell scheme="light">
      <SectionStack>
        <SectionIntro className={centeredIntroClassName}>
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <Heading as="h2" size="lg" weight="light">
            {t("heading")}
          </Heading>
        </SectionIntro>
        <div className="grid gap-4 grid-cols-[minmax(0,1fr)] mx-auto max-w-[480px] w-full md:grid-flow-col md:auto-cols-[minmax(0,1fr)] md:grid-cols-none md:max-w-none">
          {cards.map((card) => (
            <FeatureCard card={card} key={card.component} />
          ))}
        </div>
      </SectionStack>
    </SectionShell>
  );
}
