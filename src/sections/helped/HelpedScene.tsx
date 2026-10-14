"use client";

import { useTranslations } from "next-intl";
import { useCallback, useRef } from "react";

import { useScheduledOnScroll } from "@/platform/motion";
import { Eyebrow, GuideCrosshair, Heading } from "@/ui";

import { HelpedCard } from "./HelpedCard";
import {
  applyHelpedSceneLayout,
  type HelpedSceneLayoutState,
} from "./helped-scene-layout";
import { useHelpedCardsData } from "./hooks/use-helped-cards-data";

export function HelpedScene() {
  const t = useTranslations("home.helped");
  const cards = useHelpedCardsData();
  const sectionRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const layoutStateRef = useRef<HelpedSceneLayoutState>({
    measurements: null,
  });

  const runLayout = useCallback(() => {
    applyHelpedSceneLayout(
      { cardRefs, innerRef, sectionRef },
      cards.length,
      layoutStateRef.current,
    );
  }, [cards.length]);

  useScheduledOnScroll(runLayout);

  return (
    <div
      className="relative h-[280vh] w-full"
      aria-label="Customer stories"
      id="homepage-cases"
      ref={sectionRef}
      role="region"
    >
      {/* StageGuide */}
      <div
        className="hidden md:block bg-[var(--color-black-10)] absolute left-1/2 top-0 -bottom-[19px] w-px pointer-events-none"
        aria-hidden
      />

      {/* StickyInner */}
      <div
        className="grid grid-cols-1 grid-rows-[1fr] items-center justify-items-center min-h-screen overflow-hidden sticky top-0"
        ref={innerRef}
      >
        <GuideCrosshair crossX="50%" crossY="176px" verticalLines={false} />

        {/* HeadlineBlock */}
        <div className="grid grid-cols-1 justify-items-center max-w-[688px] px-[calc(var(--spacing-base)*4)] text-center w-full z-[1] [&>*+*]:mt-[calc(var(--spacing-base)*6)]">
          {/* EyebrowExitTarget */}
          <div className="grid justify-items-center" data-helped-exit-target>
            <Eyebrow>{t("eyebrow")}</Eyebrow>
          </div>

          {/* headlineMeasureClassName */}
          <div className="mx-auto md:mx-[calc(var(--spacing-base)*-4)] md:max-w-[688px] [&_h2[data-size]]:text-[clamp(calc(var(--font-base)*8),9.5vw,calc(var(--font-base)*15))] [&_h2[data-size]]:leading-[1.1] [&_h2[data-size]]:[text-wrap:wrap] md:[&_h2[data-size]]:text-[calc(var(--font-base)*20)] md:[&_h2[data-size]]:leading-[calc(var(--font-base)*21.5)]">
            <Heading as="h2" size="lg" weight="light">
              {t("heading")}
            </Heading>
          </div>
        </div>

        {/* CardsLayer */}
        <div className="absolute inset-0 pointer-events-none z-[2] [&_article]:pointer-events-auto">
          {cards.map((card, index) => (
            <div
              className="absolute left-0 top-0 opacity-0 will-change-[transform,opacity]"
              key={card.wordmark}
              ref={(element) => {
                cardRefs.current[index] = element;
              }}
            >
              <HelpedCard card={card} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
