import { css } from '@linaria/core';
import { styled } from '@linaria/react';

import { mediaUp, spacing } from '@/tokens';
import {
  Eyebrow,
  Heading,
  SectionIntro,
  SectionShell,
  SectionStack,
} from '@/ui';

import { FeatureCard } from './FeatureCard';
import { FEATURE_CARDS } from './feature-cards.data';

// Mobile reads the intro left-aligned; the centered composition only
// engages from md up (user-directed; the old site centered everywhere).
const centeredIntroClassName = css`
  ${mediaUp('md')} {
    justify-items: center;
    margin-inline: auto;
    max-width: 900px;
    text-align: center;
  }
`;

// minmax(0, 1fr) keeps the three columns equal regardless of any one
// card's min-content (ported rationale: a longer word would otherwise
// expand its track and break the aspect-locked frames' alignment).
const CardsGrid = styled.div`
  display: grid;
  gap: ${spacing(4)};
  grid-template-columns: minmax(0, 1fr);
  margin-inline: auto;
  max-width: 480px;
  width: 100%;

  ${mediaUp('md')} {
    grid-auto-columns: minmax(0, 1fr);
    grid-auto-flow: column;
    grid-template-columns: none;
    max-width: none;
  }
`;

export function FeatureCards() {
  return (
    <SectionShell scheme="light">
      <SectionStack>
        <SectionIntro className={centeredIntroClassName}>
          <Eyebrow>
            More components to explore.
          </Eyebrow>
          <Heading as="h2" size="lg" weight="light">
            Store, control and interact — *the next layer of ECE*
          </Heading>
        </SectionIntro>
        <CardsGrid>
          {FEATURE_CARDS.map((card) => (
            <FeatureCard card={card} key={card.component} />
          ))}
        </CardsGrid>
      </SectionStack>
    </SectionShell>
  );
}

