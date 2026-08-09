import { HeroBackdrop } from './HeroBackdrop';
import { styled } from '@linaria/react';

import { SITE_URLS } from '@/platform/site-urls';
import { GRADIENT, HERO_COMPOSITION, spacing } from '@/tokens';
import { Body, Button, Heading, HeadingPair, SectionShell } from '@/ui';
import { HeroPreviewClient } from './hero-preview/HeroPreviewClient';

const GradientBackdrop = styled.div`
  background: ${GRADIENT.heroGlow};
  inset: 0 -20%;
  position: absolute;
`;

const IntroStack = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 100%;

  & > * + * {
    margin-top: ${spacing(8)};
  }
`;

const HeadingMeasure = styled.div`
  max-width: 672px;
  width: 100%;
`;

const BodyMeasure = styled.div`
  margin-inline: auto;
  max-width: 591px;
`;

const CtaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing(3)};
  justify-content: center;
`;

const PreviewStage = styled.div`
  margin-top: ${HERO_COMPOSITION.ctaToVisualGapPx}px;
  margin-inline: auto;
  max-width: 1040px;
  width: 100%;
`;

export function HomeHero() {
  return (
    <SectionShell
      background={
        <GradientBackdrop>
          <HeroBackdrop />
        </GradientBackdrop>
      }
      fullBleedBackground
      rhythm="hero"
      scheme="muted"
    >
      <IntroStack data-halftone-exclude="">
        <HeadingPair>
          <HeadingMeasure>
            <Heading as="h1" size="lg" weight="light">
              Experience Virtual Labs at a *Different Dimension*.
            </Heading>
          </HeadingMeasure>
          <BodyMeasure>
            <Body muted size="sm">
              Explore, interact, and experiment with complex engineering concepts
              through immersive virtual experiences built for the modern learner.
            </Body>
          </BodyMeasure>
        </HeadingPair>
        <CtaRow>
          <Button href={SITE_URLS.appWelcome} label="Get started" />
        </CtaRow>
      </IntroStack>

      <PreviewStage data-halftone-exclude="">
        <HeroPreviewClient />
      </PreviewStage>
    </SectionShell>
  );
}
