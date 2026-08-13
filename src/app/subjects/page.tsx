import { type Metadata } from 'next';
import { styled } from '@linaria/react';

import { color, fontFamily, FONT_WEIGHT, radius, semanticColor, spacing, typeRampDeclarations } from '@/tokens';
import { Body, Button, Heading } from '@/ui';

export const metadata: Metadata = {
  title: 'Subjects — VedaAI',
};

const Shell = styled.div`
  align-items: center;
  background-color: ${semanticColor.surface};
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100dvh;
  padding: ${spacing(8)} ${spacing(4)};
`;

const Inner = styled.div`
  max-width: 720px;
  text-align: center;
  width: 100%;

  & > * + * {
    margin-top: ${spacing(4)};
  }
`;

const Badge = styled.span`
  ${typeRampDeclarations('bodyXs')}
  background: ${color('blue-10')};
  border: 1px solid ${color('blue-20')};
  border-radius: ${radius(8)};
  color: ${color('blue')};
  display: inline-block;
  font-family: ${fontFamily('mono')};
  font-weight: ${FONT_WEIGHT.medium};
  letter-spacing: 0.06em;
  padding: ${spacing(1)} ${spacing(3)};
  text-transform: uppercase;
`;

export default function SubjectsPage() {
  return (
    <Shell data-scheme="light">
      <Inner>
        <Badge>Coming soon</Badge>
        <Heading as="h1" size="md" weight="light" family="sans">
          Your subjects are being prepared
        </Heading>
        <Body muted size="sm">
          We&apos;re building personalised virtual labs for your area of
          interest. Check back soon — or explore our existing labs in the
          meantime.
        </Body>
        <div>
          <Button href="/labs/half-adder" label="Explore Half Adder Lab" />
        </div>
      </Inner>
    </Shell>
  );
}
