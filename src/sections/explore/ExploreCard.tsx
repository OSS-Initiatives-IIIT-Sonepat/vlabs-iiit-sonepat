import { styled } from '@linaria/react';

import {
  color,
  EASING,
  fontFamily,
  FONT_WEIGHT,
  radius,
  semanticColor,
  spacing,
  typeRampDeclarations,
  REDUCED_MOTION,
} from '@/tokens';
import { Body } from '@/ui';
import { ButtonShape } from '@/ui/ButtonShape';
import { ArrowRight } from '@/icons';

import { CardShape } from '../three-cards/CardShape';
import { CircuitModel } from './CircuitModel';
import { type ExploreSubjectCard } from './explore.data';

const ACTION_SIZE_PX = 40;

// ── Card container ────────────────────────────────────────────────────────
// Transparent — CardShape SVG provides the white fill + tab-notch border.
// overflow: hidden so the 3D stage bleeds cleanly to the card's bottom edge.
const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  isolation: isolate;
  min-height: 0;
  min-width: 0;
  overflow: hidden;
  padding: ${spacing(4)} ${spacing(4)} 0;
  position: relative;
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
// Negative horizontal margin cancels the parent padding so the canvas
// reaches the card edges exactly as in the reference.
const CardStage = styled.div`
  flex: 1;
  height: 220px;
  margin-inline: -${spacing(4)};
  overflow: hidden;
`;

// ── Footer (only shown when a lab route exists) ───────────────────────────
const CardFooter = styled.footer`
  align-items: center;
  column-gap: ${spacing(2)};
  display: grid;
  grid-template-columns: auto auto auto 1fr;
  padding: ${spacing(3)} 0 ${spacing(3)};
`;

const AttributionPipe = styled.span`
  border-left: 1px solid ${semanticColor.divider};
  display: block;
  height: 21px;
  width: 0;
`;

const TrailingAction = styled.div`
  justify-self: end;
`;

const ActionLink = styled.a`
  --button-fill: transparent;
  --button-stroke: ${color('black-20')};

  align-items: center;
  color: ${color('black-80')};
  display: inline-flex;
  flex-shrink: 0;
  height: ${ACTION_SIZE_PX}px;
  justify-content: center;
  overflow: hidden;
  position: relative;
  text-decoration: none;
  transition:
    color 0.2s ease,
    transform 0.2s ${EASING.spring};
  width: ${ACTION_SIZE_PX}px;

  &:is(:hover, :focus-visible) {
    color: ${color('black')};
  }

  &:is(:hover, :focus-visible) [data-slot='action-hover'] > span {
    transform: translateX(0);
  }

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.96);
  }

  &:focus-visible {
    outline: 1px solid ${color('blue')};
    outline-offset: 1px;
  }

  [data-slot='action-hover'] {
    --button-fill: ${color('black')};
    --button-stroke: transparent;

    inset: 0;
    opacity: 0.05;
    overflow: hidden;
    pointer-events: none;
    position: absolute;

    > span {
      display: block;
      height: 100%;
      transform: translateX(calc(-100% - ${spacing(4)}));
      transition: transform 260ms ${EASING.standard};
      width: 100%;
    }
  }

  ${REDUCED_MOTION} {
    [data-slot='action-hover'] > span {
      transition: none;
    }
  }

  [data-slot='action-glyph'] {
    align-items: center;
    display: inline-flex;
    justify-content: center;
    position: relative;
  }
`;

type Props = { card: ExploreSubjectCard };

export function ExploreCard({ card }: Props) {
  return (
    <CardContainer>
      {/* Tab-notched white card background + border */}
      <CardShape />

      <CardTop>
        <CardHeading>{card.title}</CardHeading>
        <CardRule aria-hidden />
        <Body size="sm" muted>{card.description}</Body>

        {card.labRoute && (
          <CardFooter>
            <Body size="xs" weight="medium">{card.category}</Body>
            <AttributionPipe aria-hidden />
            <Body size="xs">{card.tags.slice(0, 2).join(', ')}</Body>
            <TrailingAction>
              <ActionLink aria-label={`Open ${card.title} lab`} href={card.labRoute}>
                <ButtonShape heightPx={ACTION_SIZE_PX} outlined />
                <span data-slot="action-hover">
                  <span><ButtonShape heightPx={ACTION_SIZE_PX} /></span>
                </span>
                <span data-slot="action-glyph">
                  <ArrowRight sizePx={18} />
                </span>
              </ActionLink>
            </TrailingAction>
          </CardFooter>
        )}
      </CardTop>

      {/* 3D canvas bleeds to card bottom + sides */}
      <CardStage>
        <CircuitModel circuitId={card.circuitId} />
      </CardStage>
    </CardContainer>
  );
}
