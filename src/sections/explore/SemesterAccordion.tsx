'use client';

import { useState } from 'react';
import { styled } from '@linaria/react';

import {
  color,
  DURATION,
  EASING,
  fontFamily,
  FONT_WEIGHT,
  mediaUp,
  semanticColor,
  spacing,
  typeRampDeclarations,
  REDUCED_MOTION,
} from '@/tokens';
import { Container } from '@/ui/Container';

import { ExploreCard } from './ExploreCard';
import { type ExploreSemester } from './explore.data';

// ── Outer section ─────────────────────────────────────────────────────────
const SemestersWrap = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${spacing(6)};
  padding-bottom: ${spacing(20)};
`;

// ── Accordion item — NO background, sits directly on the grid bg ──────────
const AccordionItem = styled.div`
  display: flex;
  flex-direction: column;
`;

// The semester label row: just text + chevron, no card bg
const AccordionTrigger = styled.button`
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  gap: ${spacing(4)};
  justify-content: space-between;
  padding: ${spacing(5)} ${spacing(2)} ${spacing(4)};
  text-align: left;
  width: 100%;

  &:focus-visible {
    outline: 1px solid ${color('blue')};
    outline-offset: 2px;
    border-radius: 4px;
  }
`;

const AccordionLabel = styled.span`
  ${typeRampDeclarations('headingMd')}
  color: ${semanticColor.inkMuted};
  font-family: ${fontFamily('sans')};
  font-weight: ${FONT_WEIGHT.regular};
`;

const ChevronWrap = styled.span<{ $open: boolean }>`
  color: ${semanticColor.inkMuted};
  display: flex;
  flex-shrink: 0;
  transform: rotate(${({ $open }) => ($open ? '180deg' : '0deg')});
  transition: transform ${DURATION.md} ${EASING.standard};

  ${REDUCED_MOTION} {
    transition: none;
  }
`;

// Cards grid — each card is its own white island on the grid bg
const CardsGrid = styled.div`
  display: grid;
  gap: ${spacing(6)};
  grid-template-columns: 1fr;
  padding-bottom: ${spacing(2)};

  ${mediaUp('md')} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

// ── Chevron icon ──────────────────────────────────────────────────────────
function Chevron() {
  return (
    <svg
      aria-hidden
      fill="none"
      height="20"
      viewBox="0 0 20 20"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

// ── Single semester block ─────────────────────────────────────────────────
function SemesterItem({
  semester,
  defaultOpen,
}: {
  semester: ExploreSemester;
  defaultOpen: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <AccordionItem>
      <AccordionTrigger
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        <AccordionLabel>{semester.label}</AccordionLabel>
        <ChevronWrap $open={open} aria-hidden>
          <Chevron />
        </ChevronWrap>
      </AccordionTrigger>

      {open && (
        <CardsGrid>
          {semester.subjects.map((card) => (
            <ExploreCard key={card.id} card={card} />
          ))}
        </CardsGrid>
      )}
    </AccordionItem>
  );
}

// ── Exported section ──────────────────────────────────────────────────────
type Props = { semesters: readonly ExploreSemester[] };

export function SemesterAccordion({ semesters }: Props) {
  return (
    <SemestersWrap aria-label="Explore by semester">
      <Container>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: spacing(2),
          }}
        >
          {semesters.map((semester, index) => (
            <SemesterItem
              key={semester.id}
              semester={semester}
              defaultOpen={index === 0}
            />
          ))}
        </div>
      </Container>
    </SemestersWrap>
  );
}
