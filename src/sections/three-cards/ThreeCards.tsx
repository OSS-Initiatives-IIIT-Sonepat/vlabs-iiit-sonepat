import { css } from '@linaria/core';
import { styled } from '@linaria/react';

import { mediaUp, BREAKPOINT_PX } from '@/tokens';
import {
  Body,
  Eyebrow,
  Heading,
  HeadingPair,
  SectionIntro,
  SectionShell,
  SectionStack,
} from '@/ui';

import { CardsGrid } from './CardsGrid';
import { IllustrationCard } from './IllustrationCard';
import { ILLUSTRATION_CARDS } from './three-cards.data';

// This heading tracks its sans accents lighter than the global -0.04em —
// ported from the original.
const headingMeasureClassName = css`
  ${mediaUp('md')} {
    max-width: ${BREAKPOINT_PX.md}px;
  }

  [data-accent] {
    letter-spacing: -0.02em;
  }
`;

const BodyMeasure = styled.div`
  ${mediaUp('md')} {
    max-width: 571px;
  }
`;

export function ThreeCards() {  return (
    <SectionShell scheme="light">
      <SectionStack>
        <SectionIntro>
           <Eyebrow>Core ECE components.</Eyebrow>
           <HeadingPair>
             <div className={headingMeasureClassName}>
               <Heading as="h2" size="lg" weight="light">
                 Explore the building blocks of every circuit
               </Heading>
             </div>
              <BodyMeasure>
                <Body muted size="sm">
                  From breadboard to LED to resistor — hands-on 3D interaction with the fundamentals of electronics.
                </Body>
              </BodyMeasure>
           </HeadingPair>
         </SectionIntro>
        <CardsGrid>
          {ILLUSTRATION_CARDS.map((card) => (
            <IllustrationCard card={card} key={card.illustration} />
          ))}
        </CardsGrid>
      </SectionStack>
    </SectionShell>
  );
}


