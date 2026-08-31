'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import { styled } from '@linaria/react';

import {
  color,
  fontFamily,
  FONT_WEIGHT,
  mediaUp,
  semanticColor,
  spacing,
  typeRampDeclarations,
  Z_INDEX,
  DURATION,
  EASING,
  REDUCED_MOTION,
} from '@/tokens';
import { Body } from '@/ui';

import { CircuitModel } from './CircuitModel';
import { type ExploreSubject, type ExploreExperiment } from './explore.data';

// ── Backdrop ──────────────────────────────────────────────────────────────
const Backdrop = styled.div`
  align-items: center;
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
  background: rgba(28, 28, 28, 0.55);
  display: flex;
  inset: 0;
  justify-content: center;
  padding: ${spacing(4)};
  position: fixed;
  z-index: ${Z_INDEX.modal};
`;

// ── Modal panel ───────────────────────────────────────────────────────────
const Panel = styled.div`
  background: #fff;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - ${spacing(8)});
  max-width: calc(100vw - ${spacing(8)});
  overflow: hidden;
  position: relative;
  width: min(100%, 900px);

  ${mediaUp('md')} {
    flex-direction: row;
    min-height: 520px;
  }
`;

// ── Close button ──────────────────────────────────────────────────────────
const CloseBtn = styled.button`
  all: unset;
  box-sizing: border-box;
  color: ${semanticColor.inkMuted};
  cursor: pointer;
  font-size: 20px;
  line-height: 1;
  padding: ${spacing(3)};
  position: absolute;
  right: ${spacing(2)};
  top: ${spacing(2)};
  transition: color ${DURATION.sm} ${EASING.standard};
  z-index: 1;

  &:hover { color: ${semanticColor.ink}; }

  &:focus-visible {
    outline: 1px solid ${color('blue')};
    outline-offset: 2px;
    border-radius: 2px;
  }

  ${REDUCED_MOTION} { transition: none; }
`;

// ── Left panel ────────────────────────────────────────────────────────────
const LeftPanel = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  padding: ${spacing(6)};
  width: 100%;

  ${mediaUp('md')} {
    width: 340px;
  }
`;

const ImageWrap = styled.div`
  background: ${color('neutral')};
  border: 1px solid ${color('black-10')};
  border-radius: 4px;
  height: 260px;
  overflow: hidden;
  width: 100%;
`;

const LeftMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing(2)};
  margin-top: ${spacing(4)};
`;

const ExperimentLabel = styled.span`
  color: ${semanticColor.inkMuted};
  font-family: ${fontFamily('sans')};
  font-size: 13px;
  font-weight: ${FONT_WEIGHT.regular};
`;

const LeftHeading = styled.h2`
  ${typeRampDeclarations('headingMd')}
  color: ${semanticColor.ink};
  font-family: ${fontFamily('serif')};
  font-weight: ${FONT_WEIGHT.regular};
`;

const OpenLabBtn = styled.button`
  all: unset;
  box-sizing: border-box;
  background: ${semanticColor.ink};
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  font-family: ${fontFamily('sans')};
  font-size: 13px;
  font-weight: ${FONT_WEIGHT.medium};
  margin-top: ${spacing(4)};
  padding: ${spacing(2.5)} ${spacing(5)};
  text-align: center;
  transition: opacity ${DURATION.sm} ${EASING.standard};
  width: 100%;

  &:hover { opacity: 0.82; }
  &:focus-visible { outline: 2px solid ${color('blue')}; outline-offset: 2px; }
  ${REDUCED_MOTION} { transition: none; }
`;

const ComingSoonBadge = styled.span`
  border: 1px solid ${color('black-10')};
  border-radius: 20px;
  color: ${semanticColor.inkMuted};
  display: inline-block;
  font-family: ${fontFamily('sans')};
  font-size: 11px;
  margin-top: ${spacing(3)};
  padding: ${spacing(1)} ${spacing(3)};
`;

// ── Right panel ───────────────────────────────────────────────────────────
const RightPanel = styled.div`
  border-top: 1px solid ${color('black-10')};
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow-y: auto;
  padding: ${spacing(6)};

  ${mediaUp('md')} {
    border-left: 1px solid ${color('black-10')};
    border-top: none;
  }
`;

const ListHeading = styled.h2`
  ${typeRampDeclarations('headingMd')}
  color: ${semanticColor.ink};
  font-family: ${fontFamily('serif')};
  font-weight: ${FONT_WEIGHT.regular};
  margin-bottom: ${spacing(4)};
`;

// ── Experiment list item ──────────────────────────────────────────────────
const ExperimentItem = styled.button<{ $active: boolean }>`
  all: unset;
  box-sizing: border-box;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: ${spacing(1)};
  padding: ${spacing(3)};
  text-align: left;
  transition: background ${DURATION.sm} ${EASING.standard};
  width: 100%;
  background: ${({ $active }) => ($active ? color('neutral') : 'transparent')};

  &:hover { background: ${color('neutral')}; }

  &:focus-visible {
    outline: 1px solid ${color('blue')};
    outline-offset: 2px;
  }

  ${REDUCED_MOTION} { transition: none; }
`;

const ExperimentNumber = styled.span`
  color: ${semanticColor.inkMuted};
  font-family: ${fontFamily('sans')};
  font-size: 12px;
`;

const ExperimentTitle = styled.span`
  ${typeRampDeclarations('headingXs')}
  color: ${semanticColor.ink};
  font-family: ${fontFamily('serif')};
  font-weight: ${FONT_WEIGHT.regular};
`;

const ItemDivider = styled.div`
  border-top: 1px solid ${color('black-10')};
  margin: 0 ${spacing(3)};
`;

// ── Component ─────────────────────────────────────────────────────────────
type Props = {
  subject: ExploreSubject;
  onClose: () => void;
};

export function SubjectModal({ subject, onClose }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();

  const activeExp: ExploreExperiment = subject.experiments[activeIndex];

  // Lock body scroll while open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose();
  }

  function handleOpenLab() {
    if (activeExp.labRoute) {
      router.push(activeExp.labRoute);
    }
  }

  const modal = (
    <Backdrop onClick={handleBackdropClick} role="dialog" aria-modal aria-label={subject.title}>
      <Panel>
        <CloseBtn onClick={onClose} aria-label="Close">×</CloseBtn>

        {/* ── Left: preview of selected experiment ── */}
        <LeftPanel>
          <ImageWrap>
            <CircuitModel circuitId={activeExp.circuitId} />
          </ImageWrap>

          <LeftMeta>
            <ExperimentLabel>Experiment - {activeIndex + 1}</ExperimentLabel>
            <LeftHeading>{activeExp.title}</LeftHeading>
            <Body size="sm" muted>{activeExp.description}</Body>

            {activeExp.labRoute ? (
              <OpenLabBtn onClick={handleOpenLab}>
                Open Lab →
              </OpenLabBtn>
            ) : (
              <ComingSoonBadge>Coming soon</ComingSoonBadge>
            )}
          </LeftMeta>
        </LeftPanel>

        {/* ── Right: numbered list of all experiments ── */}
        <RightPanel>
          <ListHeading>List of Experiments</ListHeading>

          {subject.experiments.map((exp, i) => (
            <div key={exp.id}>
              <ExperimentItem
                $active={i === activeIndex}
                onClick={() => setActiveIndex(i)}
              >
                <ExperimentNumber>Experiment - {i + 1}</ExperimentNumber>
                <ExperimentTitle>{exp.title}</ExperimentTitle>
              </ExperimentItem>
              {i < subject.experiments.length - 1 && <ItemDivider />}
            </div>
          ))}
        </RightPanel>
      </Panel>
    </Backdrop>
  );

  return createPortal(modal, document.body);
}
