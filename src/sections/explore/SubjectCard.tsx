'use client';

import { styled } from '@linaria/react';

import {
  color,
  EASING,
  fontFamily,
  FONT_WEIGHT,
  semanticColor,
  spacing,
  typeRampDeclarations,
  REDUCED_MOTION,
} from '@/tokens';
import { Body } from '@/ui';

import { CardShape } from '../three-cards/CardShape';
import { CircuitModel } from './CircuitModel';
import { type ExploreSubject } from './explore.data';

// ── Card container ────────────────────────────────────────────────────────
const CardContainer = styled.button`
  all: unset;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 100%;
  isolation: isolate;
  min-height: 0;
  min-width: 0;
  overflow: hidden;
  padding: ${spacing(4)} ${spacing(4)} 0;
  position: relative;
  text-align: left;
  width: 100%;

  &:hover [data-slot='card-image'] {
    transform: scale(1.03);
  }

  &:focus-visible {
    outline: 2px solid ${color('blue')};
    outline-offset: 2px;
    border-radius: 4px;
  }
`;

// ── Text area (above the 3D stage) ───────────────────────────────────────
const CardTop = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing(3)};
  padding-bottom: ${spacing(4)};
`;

const CardHeading = styled.h3`
  ${typeRampDeclarations('headingXs')}
  font-family: ${fontFamily('sans')};
  font-weight: ${FONT_WEIGHT.medium};
  color: ${semanticColor.ink};
`;

const CardRule = styled.div`
  border-top: 1px dotted ${semanticColor.divider};
  height: 0;
  width: 100%;
`;

// ── 3D stage — no padding, bleeds to card edges ───────────────────────────
const CardStage = styled.div`
  flex: 1;
  height: 220px;
  margin-inline: -${spacing(4)};
  overflow: hidden;
  transition: transform 0.3s ${EASING.standard};

  ${REDUCED_MOTION} {
    transition: none;
  }
`;

type Props = {
  subject: ExploreSubject;
  onClick: (subject: ExploreSubject) => void;
};

export function SubjectCard({ subject, onClick }: Props) {
  return (
    <CardContainer onClick={() => onClick(subject)} aria-label={`Open ${subject.title} experiments`}>
      {/* Tab-notched white card background + border */}
      <CardShape />

      <CardTop>
        <CardHeading>{subject.title}</CardHeading>
        <CardRule aria-hidden />
        <Body size="sm" muted>{subject.description}</Body>
      </CardTop>

      {/* 3D canvas bleeds to card bottom + sides */}
      <CardStage data-slot="card-image">
        <CircuitModel circuitId={subject.circuitId} />
      </CardStage>
    </CardContainer>
  );
}
