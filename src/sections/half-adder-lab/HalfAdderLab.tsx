'use client';

import { useState } from 'react';
import { css } from '@linaria/core';
import { styled } from '@linaria/react';
import dynamic from 'next/dynamic';

import {
  color,
  EASING,
  FONT_WEIGHT,
  fontFamily,
  fontSize,
  mediaUp,
  radius,
  semanticColor,
  spacing,
  typeRampDeclarations,
} from '@/tokens';
import { Body, Eyebrow, Heading, SectionShell, SectionStack, StepperProgressRail } from '@/ui';
import { HalfAdder } from '@/labs/circuits/half-adder';
import { type Circuit } from '@/labs/types';

// Three.js scene is client-only
const LabSceneCanvas = dynamic(
  () => import('@/labs/LabScene').then((m) => m.LabSceneCanvas),
  { ssr: false },
);

// ── Layout ────────────────────────────────────────────────────────────────────
const LabGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${spacing(10)};

  ${mediaUp('md')} {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: ${spacing(12)};
    align-items: start;
  }
`;

// Left column: stepper text
const StepperCol = styled.div`
  min-width: 0;

  ${mediaUp('md')} {
    position: sticky;
    top: ${spacing(20)};
  }
`;

const StepperInner = styled.div`
  display: grid;
  gap: ${spacing(6)};
  grid-template-columns: auto 1fr;
  align-items: start;
`;

const StepContent = styled.div`
  display: grid;
  gap: ${spacing(4)};
`;

const StepTitle = styled.h3`
  ${typeRampDeclarations('headingXs')}
  font-family: ${fontFamily('sans')};
  font-weight: ${FONT_WEIGHT.medium};
`;

const NavRow = styled.div`
  display: flex;
  gap: ${spacing(2)};
  align-items: center;
  margin-top: ${spacing(4)};
`;

const NavBtn = styled.button<{ $disabled?: boolean }>`
  font-family: ${fontFamily('sans')};
  font-size: ${fontSize(1)};
  font-weight: ${FONT_WEIGHT.medium};
  color: ${({ $disabled }) => $disabled ? color('gray', 400) : semanticColor.ink};
  background: none;
  border: 1px solid ${({ $disabled }) => $disabled ? color('gray', 200) : semanticColor.line};
  border-radius: ${radius(5)};
  padding: ${spacing(2)} ${spacing(4)};
  cursor: ${({ $disabled }) => $disabled ? 'default' : 'pointer'};
  transition: background 0.15s ${EASING.standard};
  pointer-events: ${({ $disabled }) => $disabled ? 'none' : 'auto'};

  &:hover {
    background: ${semanticColor.surface};
  }
`;

const StepCounter = styled.span`
  font-size: ${fontSize(1)};
  color: ${color('gray', 400)};
  font-variant-numeric: tabular-nums;
`;

// Right column: 3D scene + panels
const VisualCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing(4)};
`;

const SceneFrame = styled.div`
  border: 1px solid ${semanticColor.line};
  border-radius: ${radius(2)};
  background: ${color('gray', 50)};
  height: 340px;
  overflow: hidden;
  position: relative;

  ${mediaUp('md')} {
    height: 420px;
  }
`;

// ── I/O panel ─────────────────────────────────────────────────────────────────
const IOPanel = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${spacing(3)};
`;

const IOGroup = styled.div`
  border: 1px solid ${semanticColor.line};
  border-radius: ${radius(2)};
  padding: ${spacing(4)};
  display: flex;
  flex-direction: column;
  gap: ${spacing(3)};
`;

const IOLabel = styled.span`
  font-size: ${fontSize(1)};
  font-weight: ${FONT_WEIGHT.medium};
  color: ${color('gray', 500)};
  text-transform: uppercase;
  letter-spacing: 0.06em;
`;

const BitRow = styled.div`
  display: flex;
  gap: ${spacing(2)};
  align-items: center;
`;

const BitLabel = styled.span`
  font-size: ${fontSize(2)};
  font-weight: ${FONT_WEIGHT.medium};
  font-family: ${fontFamily('mono')};
  color: ${semanticColor.ink};
  min-width: 20px;
`;

const BitBulb = styled.div<{ $on: boolean; $color?: string }>`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1.5px solid ${({ $on, $color }) =>
    $on ? ($color ?? color('green')) : semanticColor.line};
  background: ${({ $on, $color }) =>
    $on ? ($color ?? color('green')) : semanticColor.surface};
  transition: background 0.2s ${EASING.standard}, border-color 0.2s ${EASING.standard};
  flex-shrink: 0;
`;

// ── Truth table ───────────────────────────────────────────────────────────────
const TruthTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: ${fontSize(1)};
  font-family: ${fontFamily('mono')};
`;

const TruthTh = styled.th`
  font-weight: ${FONT_WEIGHT.medium};
  font-family: ${fontFamily('sans')};
  color: ${color('gray', 500)};
  text-align: center;
  padding: ${spacing(2)} ${spacing(3)};
  border-bottom: 1px solid ${semanticColor.line};
  font-size: ${fontSize(1)};
  letter-spacing: 0.04em;
`;

const TruthTd = styled.td<{ $active: boolean }>`
  text-align: center;
  padding: ${spacing(2)} ${spacing(3)};
  border-bottom: 1px solid ${semanticColor.line};
  font-weight: ${({ $active }) => $active ? FONT_WEIGHT.medium : FONT_WEIGHT.regular};
  color: ${({ $active }) => $active ? semanticColor.ink : color('gray', 400)};
  background: ${({ $active }) => $active ? color('blue', 50) : 'transparent'};
  transition: background 0.2s ${EASING.standard};
`;

// ── Component ─────────────────────────────────────────────────────────────────
export function HalfAdderLab() {
  const circuit: Circuit = HalfAdder;
  const [stepIndex, setStepIndex] = useState(0);

  const step = circuit.steps[stepIndex];
  const inputs = step.activeInputs ?? { A: 0, B: 0 };
  const sumOut   = (inputs.A ^ inputs.B) as 0 | 1;
  const carryOut = (inputs.A & inputs.B) as 0 | 1;

  const activeRow = circuit.truthTable?.rows.findIndex(
    (r) => r.inputs.A === inputs.A && r.inputs.B === inputs.B,
  ) ?? -1;

  return (
    <SectionShell scheme="light">
      <SectionStack>
        {/* Header */}
        <div>
          <Eyebrow>Virtual Lab — ECE 101</Eyebrow>
          <Heading as="h2" size="lg" weight="light">
            {circuit.title}
          </Heading>
          <Body muted size="sm" style={{ marginTop: spacing(3), maxWidth: '540px' }}>
            {circuit.description}
          </Body>
        </div>

        <LabGrid>
          {/* Left — stepper */}
          <StepperCol>
            <StepperInner>
              <StepperProgressRail
                activeStepIndex={stepIndex}
                localProgress={0}
                stepCount={circuit.steps.length}
              />
              <StepContent>
                <StepTitle>{step.title}</StepTitle>
                <Body muted size="sm">{step.body}</Body>
                <NavRow>
                  <NavBtn
                    $disabled={stepIndex === 0}
                    onClick={() => setStepIndex((i) => Math.max(0, i - 1))}
                  >
                    ← Back
                  </NavBtn>
                  <NavBtn
                    $disabled={stepIndex === circuit.steps.length - 1}
                    onClick={() => setStepIndex((i) => Math.min(circuit.steps.length - 1, i + 1))}
                  >
                    Next →
                  </NavBtn>
                  <StepCounter>
                    {stepIndex + 1} / {circuit.steps.length}
                  </StepCounter>
                </NavRow>
              </StepContent>
            </StepperInner>

            {/* Truth table */}
            {circuit.truthTable && (
              <div style={{ marginTop: spacing(8) }}>
                <Body size="xs" weight="medium" style={{ color: color('gray', 500), marginBottom: spacing(3), textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Truth Table
                </Body>
                <TruthTable>
                  <thead>
                    <tr>
                      {circuit.truthTable.inputs.map((h) => (
                        <TruthTh key={h}>{h}</TruthTh>
                      ))}
                      <TruthTh style={{ borderLeft: `1px solid ${semanticColor.line}` }}>—</TruthTh>
                      {circuit.truthTable.outputs.map((h) => (
                        <TruthTh key={h}>{h}</TruthTh>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {circuit.truthTable.rows.map((row, i) => {
                      const isActive = i === activeRow && stepIndex >= 3;
                      return (
                        <tr key={i}>
                          {circuit.truthTable!.inputs.map((k) => (
                            <TruthTd key={k} $active={isActive}>{row.inputs[k]}</TruthTd>
                          ))}
                          <TruthTd $active={false} style={{ borderLeft: `1px solid ${semanticColor.line}` }}></TruthTd>
                          {circuit.truthTable!.outputs.map((k) => (
                            <TruthTd key={k} $active={isActive}>{row.outputs[k]}</TruthTd>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </TruthTable>
              </div>
            )}
          </StepperCol>

          {/* Right — 3D scene + I/O */}
          <VisualCol>
            <SceneFrame>
              <LabSceneCanvas circuit={circuit} activeStepIndex={stepIndex} />
            </SceneFrame>

            {/* I/O indicators — only show when wires are placed (step 4+) */}
            {stepIndex >= 3 && (
              <IOPanel>
                <IOGroup>
                  <IOLabel>Inputs</IOLabel>
                  <BitRow>
                    <BitBulb $on={inputs.A === 1} $color={color('red')} />
                    <BitLabel>A = {inputs.A}</BitLabel>
                  </BitRow>
                  <BitRow>
                    <BitBulb $on={inputs.B === 1} $color={color('blue')} />
                    <BitLabel>B = {inputs.B}</BitLabel>
                  </BitRow>
                </IOGroup>
                <IOGroup>
                  <IOLabel>Outputs</IOLabel>
                  <BitRow>
                    <BitBulb $on={sumOut === 1} $color={color('green')} />
                    <BitLabel>Sum = {sumOut}</BitLabel>
                  </BitRow>
                  <BitRow>
                    <BitBulb $on={carryOut === 1} $color={color('yellow')} />
                    <BitLabel>Carry = {carryOut}</BitLabel>
                  </BitRow>
                </IOGroup>
              </IOPanel>
            )}
          </VisualCol>
        </LabGrid>
      </SectionStack>
    </SectionShell>
  );
}
