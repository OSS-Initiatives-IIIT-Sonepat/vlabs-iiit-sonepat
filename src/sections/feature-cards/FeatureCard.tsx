'use client';

import { styled } from '@linaria/react';
import { color, FONT_WEIGHT, fontFamily, radius, spacing, typeRampDeclarations } from '@/tokens';
import { Body } from '@/ui';
import { EceViewer } from '@/labs/components/EceViewer';
import { type FeatureCardRecord } from './feature-cards.data';

const CardContainer = styled.div`
  background-color: ${color('black-5')};
  border: 1px solid ${color('black-20')};
  border-radius: ${radius(2)};
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto;
  height: 100%;
  min-width: 0;
  overflow: hidden;
`;

const CardImage = styled.div`
  box-sizing: border-box;
  padding: ${spacing(4)} ${spacing(4)} 0;
  width: 100%;
`;

const CardImageFrame = styled.div`
  aspect-ratio: 411 / 360;
  background-color: ${color('black-10')};
  border-radius: 2px;
  overflow: hidden;
  position: relative;
  width: 100%;
`;

const CardContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  padding: ${spacing(3)} ${spacing(4)} ${spacing(4)};

  & > * + * {
    margin-top: ${spacing(2)};
  }
`;

const CardTitleRow = styled.div`
  align-items: center;
  column-gap: ${spacing(2)};
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
`;

const LabelChip = styled.span`
  background: ${color('blue')};
  border-radius: ${radius(1)};
  color: ${color('white')};
  font-family: ${fontFamily('mono')};
  font-size: 10px;
  font-weight: ${FONT_WEIGHT.medium};
  letter-spacing: 0.05em;
  padding: 2px 7px;
  white-space: nowrap;
`;

const CardHeading = styled.h3`
  ${typeRampDeclarations('headingXs')}
  font-family: ${fontFamily('sans')};
  font-weight: ${FONT_WEIGHT.medium};
  min-width: 0;
`;

export function FeatureCard({ card }: { card: FeatureCardRecord }) {
  return (
    <CardContainer>
      <CardImage>
        <CardImageFrame>
          <EceViewer kind={card.component} background="#ffffff" />
        </CardImageFrame>
      </CardImage>
      <CardContent>
        <CardTitleRow>
          <LabelChip>{card.label}</LabelChip>
          <CardHeading>{card.heading}</CardHeading>
        </CardTitleRow>
        <Body size="sm">{card.body}</Body>
      </CardContent>
    </CardContainer>
  );
}
