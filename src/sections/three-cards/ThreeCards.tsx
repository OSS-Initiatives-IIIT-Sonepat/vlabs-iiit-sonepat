"use client";

import { useTranslations } from "next-intl";
import { ArrowRight } from "@/icons";
import {
  Body,
  Button,
  Eyebrow,
  Heading,
  HeadingPair,
  SectionIntro,
  SectionShell,
  SectionStack,
} from "@/ui";

import { CardsGrid } from "./CardsGrid";
import { IllustrationCard } from "./IllustrationCard";
import { useThreeCardsData } from "./hooks/use-three-cards-data";

export function ThreeCards() {
  const t = useTranslations("home.threeCards");
  const cards = useThreeCardsData();

  return (
    <SectionShell scheme="light">
      <SectionStack>
        <SectionIntro>
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <HeadingPair>
            {/* headingMeasureClassName — BREAKPOINT_PX.md = 921px */}
            <div className="md:max-w-[921px] [&_[data-accent]]:tracking-[-0.02em]">
              <Heading as="h2" size="lg" weight="light">
                {t("heading")}
              </Heading>
            </div>
            {/* BodyMeasure */}
            <div className="md:max-w-[571px]">
              <Body muted size="sm">
                {t("body")}
              </Body>
            </div>
          </HeadingPair>
          <div className="flex flex-wrap gap-3">
            <Button
              href="/components"
              label={t("cta")}
              variant="outlined"
              trailingIcon={
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight sizePx={16} />
                </span>
              }
            />
          </div>
        </SectionIntro>
        <CardsGrid>
          {cards.map((card) => (
            <IllustrationCard card={card} key={card.illustration} />
          ))}
        </CardsGrid>
      </SectionStack>
    </SectionShell>
  );
}
