'use client';

import { styled } from '@linaria/react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { VLabsLogo } from '@/icons';
import {
  color,
  DURATION,
  FONT_WEIGHT,
  fontFamily,
  radius,
  semanticColor,
  spacing,
  typeRampDeclarations,
} from '@/tokens';
import { Body, Button, Heading, StepIndicator } from '@/ui';

// ─── Storage key ────────────────────────────────────────────────────────────
const ONBOARDING_KEY = 'vlabs_onboarding_done';

// ─── Data ────────────────────────────────────────────────────────────────────

type Role = 'student' | 'professor' | 'explorer' | 'other';

const ROLES: { value: Role; label: string; description: string }[] = [
  {
    value: 'student',
    label: 'Student',
    description: 'Learning through courses, labs, and research',
  },
  {
    value: 'professor',
    label: 'Professor / Educator',
    description: 'Teaching courses and designing curricula',
  },
  {
    value: 'explorer',
    label: 'Curious Explorer',
    description: 'Self-directed learning out of pure curiosity',
  },
  {
    value: 'other',
    label: 'Other',
    description: 'Something else entirely',
  },
];

const DEPARTMENTS: { value: string; label: string }[] = [
  { value: 'cs', label: 'Computer Science' },
  { value: 'ee', label: 'Electrical Engineering' },
  { value: 'me', label: 'Mechanical Engineering' },
  { value: 'ce', label: 'Civil Engineering' },
  { value: 'che', label: 'Chemical Engineering' },
  { value: 'bio', label: 'Biology / Life Sciences' },
  { value: 'chem', label: 'Chemistry' },
  { value: 'phys', label: 'Physics' },
  { value: 'math', label: 'Mathematics' },
  { value: 'stats', label: 'Statistics / Data Science' },
  { value: 'ai', label: 'Artificial Intelligence / ML' },
  { value: 'cyber', label: 'Cybersecurity' },
  { value: 'env', label: 'Environmental Science' },
  { value: 'med', label: 'Medicine / Health Sciences' },
  { value: 'arch', label: 'Architecture' },
  { value: 'eco', label: 'Economics' },
  { value: 'psy', label: 'Psychology' },
  { value: 'edu', label: 'Education' },
];

const INTERESTS: { value: string; label: string }[] = [
  { value: 'circuits', label: 'Circuits & Electronics' },
  { value: 'signals', label: 'Signals & Systems' },
  { value: 'embedded', label: 'Embedded Systems' },
  { value: 'robotics', label: 'Robotics & Automation' },
  { value: 'ml', label: 'Machine Learning' },
  { value: 'cv', label: 'Computer Vision' },
  { value: 'nlp', label: 'NLP / LLMs' },
  { value: 'algo', label: 'Algorithms & Data Structures' },
  { value: 'os', label: 'Operating Systems' },
  { value: 'networks', label: 'Computer Networks' },
  { value: 'db', label: 'Databases' },
  { value: 'webdev', label: 'Web Development' },
  { value: 'thermodynamics', label: 'Thermodynamics' },
  { value: 'fluid', label: 'Fluid Mechanics' },
  { value: 'mechanics', label: 'Mechanics of Materials' },
  { value: 'quantum', label: 'Quantum Mechanics' },
  { value: 'optics', label: 'Optics & Photonics' },
  { value: 'chem_react', label: 'Chemical Reactions' },
  { value: 'biotech', label: 'Biotechnology' },
  { value: 'genetics', label: 'Genetics & Genomics' },
  { value: 'materials', label: 'Materials Science' },
  { value: 'control', label: 'Control Systems' },
  { value: 'power', label: 'Power Systems' },
  { value: 'vlsi', label: 'VLSI Design' },
  { value: 'security', label: 'Security & Cryptography' },
];

// ─── Styled primitives ───────────────────────────────────────────────────────

// Full-page centered shell — no card/box, just the background surface
const Shell = styled.div`
  align-items: center;
  background-color: ${semanticColor.surface};
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100dvh;
  padding: ${spacing(10)} ${spacing(6)};
`;

// Constrained content column, centered
const Inner = styled.div`
  max-width: 400px;
  width: 100%;
`;

const LogoRow = styled.div`
  align-items: center;
  display: flex;
  gap: ${spacing(2)};
  margin-bottom: ${spacing(10)};
`;

const LogoName = styled.span`
  ${typeRampDeclarations('bodySm')}
  color: ${semanticColor.ink};
  font-family: ${fontFamily('sans')};
  font-weight: ${FONT_WEIGHT.medium};
`;



const IndicatorRow = styled.div`
  margin-bottom: ${spacing(6)};
`;

const StepHeader = styled.div`
  margin-bottom: ${spacing(6)};

  & > * + * {
    margin-top: ${spacing(2)};
  }
`;

const RoleGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing(2)};
`;

const RoleCard = styled.button`
  align-items: center;
  background: none;
  border: 1px solid ${semanticColor.lineStrong};
  border-radius: ${radius(2)};
  cursor: pointer;
  display: flex;
  padding: ${spacing(3)} ${spacing(4)};
  text-align: left;
  transition:
    border-color ${DURATION.xs} ease,
    background ${DURATION.xs} ease;
  width: 100%;

  &[data-selected] {
    background: ${color('blue-5')};
    border-color: ${color('blue')};
  }

  &:focus-visible {
    outline: 2px solid ${color('blue')};
    outline-offset: 2px;
  }

  &:not([data-selected]):hover {
    background: ${color('black-5')};
  }
`;

const RoleTexts = styled.span`
  display: flex;
  flex-direction: column;
  gap: ${spacing(0.5)};
  min-width: 0;
`;

const RoleLabel = styled.span`
  ${typeRampDeclarations('bodySm')}
  color: ${semanticColor.ink};
  font-family: ${fontFamily('sans')};
  font-weight: ${FONT_WEIGHT.medium};
`;

const RoleDesc = styled.span`
  ${typeRampDeclarations('bodyXs')}
  color: ${semanticColor.inkMuted};
  font-family: ${fontFamily('sans')};
`;

const FieldStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing(3)};
`;

const FieldLabel = styled.label`
  ${typeRampDeclarations('bodyXs')}
  color: ${semanticColor.inkMuted};
  display: block;
  font-family: ${fontFamily('sans')};
  font-weight: ${FONT_WEIGHT.medium};
  letter-spacing: 0.04em;
  margin-bottom: ${spacing(1.5)};
  text-transform: uppercase;
`;

const DeptGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing(1.5)};
  max-height: 220px;
  overflow-y: auto;
  padding-right: ${spacing(1)};

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: ${semanticColor.line};
    border-radius: 2px;
  }
`;

const DeptRow = styled.button`
  align-items: center;
  background: none;
  border: 1px solid ${semanticColor.lineStrong};
  border-radius: ${radius(2)};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  padding: ${spacing(2)} ${spacing(3)};
  text-align: left;
  transition:
    border-color ${DURATION.xs} ease,
    background ${DURATION.xs} ease;
  width: 100%;

  &[data-selected] {
    background: ${color('blue-5')};
    border-color: ${color('blue')};
  }

  &:not([data-selected]):hover {
    background: ${color('black-5')};
  }

  &:focus-visible {
    outline: 2px solid ${color('blue')};
    outline-offset: 2px;
  }
`;

const DeptLabel = styled.span`
  ${typeRampDeclarations('bodySm')}
  color: ${semanticColor.ink};
  font-family: ${fontFamily('sans')};
`;

const CheckDot = styled.span`
  background: ${color('blue')};
  border-radius: 50%;
  flex: none;
  height: 7px;
  width: 7px;
`;

const ChipWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing(2)};
  max-height: 240px;
  overflow-y: auto;
  padding-right: ${spacing(1)};

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: ${semanticColor.line};
    border-radius: 2px;
  }
`;

const Chip = styled.button`
  background: none;
  border: 1px solid ${semanticColor.lineStrong};
  border-radius: ${radius(8)};
  color: ${semanticColor.ink};
  cursor: pointer;
  font-family: ${fontFamily('sans')};
  font-size: 13px;
  font-weight: ${FONT_WEIGHT.regular};
  line-height: 1.2;
  padding: ${spacing(1.5)} ${spacing(3)};
  transition:
    border-color ${DURATION.xs} ease,
    background ${DURATION.xs} ease,
    color ${DURATION.xs} ease;

  &[data-selected] {
    background: ${color('black')};
    border-color: ${color('black')};
    color: ${color('white')};
  }

  &:not([data-selected]):hover {
    border-color: ${color('black')};
  }

  &:focus-visible {
    outline: 2px solid ${color('blue')};
    outline-offset: 2px;
  }
`;

const OtherInput = styled.input`
  ${typeRampDeclarations('bodySm')}
  background: none;
  border: 1px solid ${semanticColor.lineStrong};
  border-radius: ${radius(2)};
  box-sizing: border-box;
  color: ${semanticColor.ink};
  font-family: ${fontFamily('sans')};
  height: 44px;
  padding: ${spacing(1)} ${spacing(3)};
  width: 100%;

  &::placeholder {
    color: ${semanticColor.inkSubtle};
  }

  &:focus-visible {
    border-color: ${color('blue')};
    outline: none;
  }
`;

const Actions = styled.div`
  margin-top: ${spacing(8)};
`;

const BackLink = styled.button`
  background: none;
  border: none;
  color: ${semanticColor.inkMuted};
  cursor: pointer;
  display: block;
  font-family: ${fontFamily('sans')};
  font-size: 13px;
  margin-top: ${spacing(3)};
  text-align: center;
  text-decoration: underline;
  transition: color ${DURATION.xs} ease;
  width: 100%;

  &:hover {
    color: ${semanticColor.ink};
  }
`;

const SlideWrap = styled.div<{ direction: 'forward' | 'back' | 'none' }>`
  animation: ${({ direction }) =>
    direction === 'none'
      ? 'none'
      : direction === 'forward'
        ? 'slideIn 0.28s cubic-bezier(0.22, 1, 0.36, 1) both'
        : 'slideInBack 0.28s cubic-bezier(0.22, 1, 0.36, 1) both'};

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(24px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideInBack {
    from {
      opacity: 0;
      transform: translateX(-24px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

// ─── Component ───────────────────────────────────────────────────────────────

export function OnboardingFlow() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState<'forward' | 'back' | 'none'>(
    'none',
  );
  const [role, setRole] = useState<Role | null>(null);
  const [otherRole, setOtherRole] = useState('');
  const [institution, setInstitution] = useState('');
  const [department, setDepartment] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const animKey = useRef(0);

  // Redirect immediately if already completed
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem(ONBOARDING_KEY)) {
        router.replace('/subjects');
      }
    }
  }, [router]);

  const goForward = () => {
    animKey.current += 1;
    setDirection('forward');
    setStep((s) => s + 1);
  };

  const goBack = () => {
    animKey.current += 1;
    setDirection('back');
    setStep((s) => s - 1);
  };

  const finish = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(ONBOARDING_KEY, '1');
    }
    router.push('/subjects');
  };

  // Step 0 — Role: one-click advance except "other"
  const handleRoleSelect = (value: Role) => {
    setRole(value);
    if (value !== 'other') {
      setTimeout(() => {
        animKey.current += 1;
        setDirection('forward');
        setStep(1);
      }, 120);
    }
  };

  // Step 1 — adaptive copy per role
  const isExplorer = role === 'explorer';

  const step1Title = isExplorer
    ? 'What sparks your curiosity?'
    : role === 'student'
      ? 'Where do you study?'
      : role === 'professor'
        ? 'Where do you teach?'
        : 'Where do you work?';

  const step1Subtitle = isExplorer
    ? 'Tell us a bit about your background (optional)'
    : 'Help us tailor your experience';

  // Step 2 — adaptive copy per role
  const step2Title =
    role === 'professor'
      ? 'What do you primarily teach?'
      : 'What are your areas of interest?';

  const step2Subtitle =
    role === 'professor'
      ? 'Select all subjects you cover'
      : 'Pick as many as you like';

  const toggleInterest = (val: string) => {
    setInterests((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val],
    );
  };

  const step1Valid = isExplorer ? true : institution.trim().length > 0;

  return (
    <Shell data-scheme="light">
      <Inner>
        {/* Logo */}
        <LogoRow>
          <VLabsLogo sizePx={40} />
          <LogoName>VLabs IIIT Sonepat</LogoName>
        </LogoRow>

        {/* Progress dots */}
        <IndicatorRow>
          <StepIndicator activeStepIndex={step} stepCount={3} />
        </IndicatorRow>

        {/* ── Step 0: Role ─────────────────────────────────────────────── */}
        {step === 0 && (
          <SlideWrap direction={direction} key={`step-0-${animKey.current}`}>
            <StepHeader>
              <Heading as="h1" size="sm" weight="light" family="sans">
                Tell us about yourself
              </Heading>
              <Body muted size="sm">
                Help us personalise your VLabs experience.
              </Body>
            </StepHeader>

            <RoleGrid>
              {ROLES.map((r) => (
                <RoleCard
                  data-selected={role === r.value ? '' : undefined}
                  key={r.value}
                  onClick={() => handleRoleSelect(r.value)}
                  type="button"
                >
                  <RoleTexts>
                    <RoleLabel>{r.label}</RoleLabel>
                    <RoleDesc>{r.description}</RoleDesc>
                  </RoleTexts>
                </RoleCard>
              ))}
            </RoleGrid>

            {/* "Other" free-text */}
            {role === 'other' && (
              <FieldStack style={{ marginTop: spacing(4) }}>
                <div>
                  <FieldLabel htmlFor="other-role">Tell us more</FieldLabel>
                  <OtherInput
                    autoFocus
                    id="other-role"
                    onChange={(e) => setOtherRole(e.target.value)}
                    placeholder="Your role..."
                    value={otherRole}
                  />
                </div>
                <Actions>
                  <Button
                    disabled={otherRole.trim().length === 0}
                    label="Continue"
                    onClick={goForward}
                  />
                </Actions>
              </FieldStack>
            )}
          </SlideWrap>
        )}

        {/* ── Step 1: Institution / Background ─────────────────────────── */}
        {step === 1 && (
          <SlideWrap direction={direction} key={`step-1-${animKey.current}`}>
            <StepHeader>
              <Heading as="h2" size="sm" weight="light" family="sans">
                {step1Title}
              </Heading>
              <Body muted size="sm">
                {step1Subtitle}
              </Body>
            </StepHeader>

            <FieldStack>
              {!isExplorer && (
                <div>
                  <FieldLabel htmlFor="institution">
                    {role === 'student'
                      ? 'Institution name'
                      : role === 'professor'
                        ? 'Institution / University'
                        : 'Organisation / Company'}
                  </FieldLabel>
                  <OtherInput
                    autoFocus
                    id="institution"
                    onChange={(e) => setInstitution(e.target.value)}
                    placeholder={
                      role === 'student'
                        ? 'e.g. MIT, IIT Delhi…'
                        : role === 'professor'
                          ? 'e.g. Stanford University…'
                          : 'e.g. Google, NASA…'
                    }
                    value={institution}
                  />
                </div>
              )}

              <div>
                <FieldLabel as="div">
                  {isExplorer
                    ? 'Your background (optional)'
                    : 'Department / Field'}
                </FieldLabel>
                <DeptGrid>
                  {DEPARTMENTS.map((d) => (
                    <DeptRow
                      data-selected={department === d.value ? '' : undefined}
                      key={d.value}
                      onClick={() => setDepartment(d.value)}
                      type="button"
                    >
                      <DeptLabel>{d.label}</DeptLabel>
                      {department === d.value && <CheckDot aria-hidden />}
                    </DeptRow>
                  ))}
                </DeptGrid>
              </div>
            </FieldStack>

            <Actions>
              <Button
                disabled={!step1Valid}
                label="Continue"
                onClick={goForward}
              />
              <BackLink onClick={goBack} type="button">
                Back
              </BackLink>
            </Actions>
          </SlideWrap>
        )}

        {/* ── Step 2: Interests ────────────────────────────────────────── */}
        {step === 2 && (
          <SlideWrap direction={direction} key={`step-2-${animKey.current}`}>
            <StepHeader>
              <Heading as="h2" size="sm" weight="light" family="sans">
                {step2Title}
              </Heading>
              <Body muted size="sm">
                {step2Subtitle}
              </Body>
            </StepHeader>

            <ChipWrap>
              {INTERESTS.map((interest) => (
                <Chip
                  data-selected={
                    interests.includes(interest.value) ? '' : undefined
                  }
                  key={interest.value}
                  onClick={() => toggleInterest(interest.value)}
                  type="button"
                >
                  {interest.label}
                </Chip>
              ))}
            </ChipWrap>

            <Actions>
              <Button label="Get started" onClick={finish} />
              <BackLink onClick={goBack} type="button">
                Back
              </BackLink>
            </Actions>
          </SlideWrap>
        )}
      </Inner>
    </Shell>
  );
}
