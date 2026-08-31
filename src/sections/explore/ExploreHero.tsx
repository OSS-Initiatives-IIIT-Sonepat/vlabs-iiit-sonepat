import { styled } from '@linaria/react';

import {
  mediaUp,
  semanticColor,
  spacing,
} from '@/tokens';
import { Body } from '@/ui';
import { Container } from '@/ui/Container';

import { CardShape } from '../three-cards/CardShape';
import { CircuitModel } from './CircuitModel';
import { type ExploreExperiment } from './explore.data';

// ── Hero layout ───────────────────────────────────────────────────────────
const HeroWrap = styled.section`
  padding-block: ${spacing(14)} ${spacing(10)};
`;

// Right column is wider to give the featured card more room.
// Left column uses align-self: stretch so both columns are the same height,
// letting the left content distribute vertically with space-between.
const HeroGrid = styled.div`
  align-items: stretch;
  display: grid;
  gap: ${spacing(10)};
  grid-template-columns: 1fr;

  ${mediaUp('md')} {
    gap: ${spacing(14)};
    grid-template-columns: 1fr 420px;
  }
`;

// Left: heading at top, dividers + body anchored to match card height.
// space-between pushes the heading flush-top and the rule pair flush-bottom.
const HeroLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const HeroLeftTop = styled.div``;

// Inria Serif Light, -7% letter-spacing (Figma spec).
const HeroHeading = styled.h1`
  color: ${semanticColor.ink};
  font-family: var(--font-inria), serif;
  font-size: clamp(1.75rem, 1.1rem + 2.8vw, 2.75rem);
  font-weight: 300;
  letter-spacing: -0.07em;
  line-height: 1.15;
  max-width: 22ch;
`;

const HeroLeftBottom = styled.div`
  display: flex;
  flex-direction: column;
`;

// Dashed rule matching the design reference
const HeroDivider = styled.div`
  border-top: 1px dashed ${semanticColor.divider};
  height: 0;
  width: 100%;
`;

const HeroBodyText = styled.div`
  padding-block: ${spacing(5)};
  max-width: 52ch;
`;

// ── Featured card (right column) ──────────────────────────────────────────
// Transparent container — CardShape SVG provides white fill + tab-notch border.
const FeaturedCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing(3)};
  isolation: isolate;
  overflow: hidden;
  padding: ${spacing(4)} ${spacing(4)} 0;
  position: relative;
`;

const FeaturedLabel = styled.p`
  color: ${semanticColor.ink};
  font-family: var(--font-sans), sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  line-height: 1.3;
  margin: 0;
`;

const FeaturedRule = styled.div`
  border-top: 1px dotted ${semanticColor.divider};
  height: 0;
  width: 100%;
`;

const FeaturedBodyText = styled.p`
  color: ${semanticColor.inkMuted};
  font-family: var(--font-sans), sans-serif;
  font-size: 0.8125rem;
  line-height: 1.85;
  margin: 0;
`;

// 3D canvas — bleeds to card bottom + sides (negative inline margin cancels padding)
const FeaturedStage = styled.div`
  flex: 1;
  height: 260px;
  margin-inline: -${spacing(4)};
  overflow: hidden;
`;

// ── Component ─────────────────────────────────────────────────────────────
type Props = { featured: ExploreExperiment & { category: string } };

export function ExploreHero({ featured }: Props) {
  return (
    <HeroWrap>
      <Container>
        <HeroGrid>
          {/* Left: heading flush-top, rules + body flush-bottom */}
          <HeroLeft>
            <HeroLeftTop>
              <HeroHeading>
                Explore all the tools you want here, watch all tutorials step by
                step, enjoy your 3D experience.
              </HeroHeading>
            </HeroLeftTop>

            <HeroLeftBottom>
              <HeroDivider aria-hidden />
              <HeroBodyText>
                <Body size="sm" muted>
                  Browse every circuit, component, and lab organised by semester. Each card ships with a live 3D scene you can drag and rotate — no installation required.
                </Body>
              </HeroBodyText>
              <HeroDivider aria-hidden />
            </HeroLeftBottom>
          </HeroLeft>

          {/* Right: featured card — larger, with 3D bleeding to bottom */}
          <FeaturedCard>
            <CardShape />
            <FeaturedLabel>Try {featured.title}</FeaturedLabel>
            <FeaturedRule aria-hidden />
            <FeaturedBodyText>{featured.description}</FeaturedBodyText>
            <FeaturedStage>
              <CircuitModel circuitId={featured.circuitId} />
            </FeaturedStage>
          </FeaturedCard>
        </HeroGrid>
      </Container>
    </HeroWrap>
  );
}
