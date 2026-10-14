"use client";

import { useTranslations } from "next-intl";
import { HeroBackdrop } from "./HeroBackdrop";

import { SITE_URLS } from "@/platform/site-urls";
import { GRADIENT, HERO_COMPOSITION } from "@/tokens";
import { APP_PREVIEW_STAGE } from "@/tokens/app-preview/app-preview-stage";
import { Body, Button, Heading, HeadingPair, SectionShell } from "@/ui";
import { HeroPreviewClient } from "./hero-preview/HeroPreviewClient";

const MOCKUP_WIDTH_PX = APP_PREVIEW_STAGE.windowScene.widthPx;

export function HomeHero() {
  const t = useTranslations("home.hero");

  return (
    <SectionShell
      background={
        <div
          className="absolute inset-0 -inset-x-[20%]"
          style={{ background: GRADIENT.heroGlow }}
        >
          <HeroBackdrop />
        </div>
      }
      fullBleedBackground
      rhythm="hero"
      scheme="muted"
    >
      <div
        className="flex w-full flex-col items-center text-center [&>*+*]:mt-8"
        data-halftone-exclude=""
      >
        <HeadingPair>
          <div className="w-full max-w-[672px]">
            <Heading as="h1" size="lg" weight="light">
              {t("title")}
            </Heading>
          </div>
          <div className="mx-auto max-w-[591px]">
            <Body muted size="sm">
              {t("description")}
            </Body>
          </div>
        </HeadingPair>
        <div className="flex flex-wrap justify-center gap-3">
          <Button href={SITE_URLS.appWelcome} label={t("cta")} />
        </div>
      </div>

      <div
        className="relative max-w-full"
        data-halftone-exclude=""
        data-mockup-stage=""
        style={{
          width: MOCKUP_WIDTH_PX,
          marginLeft: `max(0px, calc((100% - ${MOCKUP_WIDTH_PX}px) / 2))`,
          marginTop: HERO_COMPOSITION.ctaToVisualGapPx,
        }}
      >
        <HeroPreviewClient />
      </div>
    </SectionShell>
  );
}
