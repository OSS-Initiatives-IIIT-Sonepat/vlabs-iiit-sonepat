'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';

import {
  color,
  DURATION,
  EASING,
  fontFamily,
  FONT_WEIGHT,
  radius,
  semanticColor,
  spacing,
  Z_INDEX,
  REDUCED_MOTION,
} from '@/tokens';
import { MathText } from '@/ui/Math';
import { type LabContent, type LabSection, type ProcedureStep } from '@/labs/lab-content.types';
import { styled } from '@linaria/react';

// ── Simulation component map ──────────────────────────────────────────────
const SimALU = dynamic(() => import('./simulations/SimALU').then((m) => m.SimALU), { ssr: false });
const SimMemory = dynamic(() => import('./simulations/SimMemory').then((m) => m.SimMemory), { ssr: false });
const SimCacheDirectMapped = dynamic(
  () => import('./simulations/SimCacheDirectMapped').then((m) => m.SimCacheDirectMapped),
  { ssr: false },
);
const SimCacheAssociative = dynamic(
  () => import('./simulations/SimCacheAssociative').then((m) => m.SimCacheAssociative),
  { ssr: false },
);
const SimCPU = dynamic(() => import('./simulations/SimCPU').then((m) => m.SimCPU), { ssr: false });

const SIM_COMPONENTS: Record<string, React.ComponentType<{ description?: string }>> = {
  alu: SimALU,
  memory: SimMemory,
  'cache-direct': SimCacheDirectMapped,
  'cache-assoc': SimCacheAssociative,
  cpu: SimCPU,
};

// ── Layout ────────────────────────────────────────────────────────────────
const Root = styled.div`
  display: flex;
  height: 100dvh;
  overflow: hidden;
  background: ${color('neutral')};
`;

const Sidebar = styled.aside<{ $collapsed: boolean }>`
  background: #fff;
  border-right: 1px solid ${color('black-10')};
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  overflow: hidden;
  transition: width ${DURATION.md} ${EASING.standard};
  width: ${({ $collapsed }) => ($collapsed ? '0px' : '248px')};
  ${REDUCED_MOTION} { transition: none; }
`;

const SidebarHeader = styled.div`
  align-items: center;
  border-bottom: 1px solid ${color('black-10')};
  display: flex;
  flex-shrink: 0;
  gap: ${spacing(2)};
  min-height: 52px;
  padding: 0 ${spacing(3)};
  white-space: nowrap;
`;

const CodeIcon = styled.span`
  color: ${semanticColor.inkMuted};
  font-family: ${fontFamily('mono')};
  font-size: 14px;
`;

const LabTitle = styled.span`
  color: ${semanticColor.ink};
  font-family: ${fontFamily('sans')};
  font-size: 13px;
  font-weight: ${FONT_WEIGHT.medium};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const CollapseBtn = styled.button`
  all: unset;
  align-items: center;
  border: 1px solid ${color('black-10')};
  border-radius: 4px;
  color: ${semanticColor.inkMuted};
  cursor: pointer;
  display: flex;
  height: 24px;
  justify-content: center;
  margin-left: auto;
  transition: color ${DURATION.sm} ${EASING.standard};
  width: 24px;
  &:hover { color: ${semanticColor.ink}; }
  ${REDUCED_MOTION} { transition: none; }
`;

const SearchWrap = styled.div`
  align-items: center;
  border-bottom: 1px solid ${color('black-10')};
  display: flex;
  flex-shrink: 0;
  gap: ${spacing(2)};
  padding: ${spacing(2)} ${spacing(3)};
`;

const SearchInput = styled.input`
  all: unset;
  box-sizing: border-box;
  color: ${semanticColor.ink};
  flex: 1;
  font-family: ${fontFamily('sans')};
  font-size: 12px;
  &::placeholder { color: ${semanticColor.inkSubtle}; }
`;

const SearchKbd = styled.div`
  border: 1px solid ${color('black-10')};
  border-radius: 3px;
  color: ${semanticColor.inkMuted};
  font-family: ${fontFamily('sans')};
  font-size: 10px;
  height: 18px;
  padding: 0 4px;
`;

const SectionNav = styled.nav`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: ${spacing(2)} 0;
`;

const SectionBtn = styled.button<{ $active: boolean }>`
  all: unset;
  align-items: center;
  box-sizing: border-box;
  color: ${({ $active }) => ($active ? semanticColor.ink : semanticColor.inkMuted)};
  cursor: pointer;
  display: flex;
  font-family: ${fontFamily('sans')};
  font-size: 13.5px;
  font-weight: ${({ $active }) => ($active ? FONT_WEIGHT.medium : FONT_WEIGHT.regular)};
  gap: ${spacing(3)};
  padding: ${spacing(2.5)} ${spacing(4)};
  transition: color ${DURATION.sm} ${EASING.standard};
  white-space: nowrap;
  width: 100%;
  &:hover { color: ${semanticColor.ink}; }
  ${REDUCED_MOTION} { transition: none; }
`;

const SectionChevron = styled.span<{ $open: boolean }>`
  color: ${semanticColor.inkMuted};
  display: flex;
  margin-left: auto;
  transform: rotate(${({ $open }) => ($open ? '180deg' : '0deg')});
  transition: transform ${DURATION.sm} ${EASING.standard};
  ${REDUCED_MOTION} { transition: none; }
`;

const SubStepList = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: ${spacing(1)};
`;

const SubStepBtn = styled.button<{ $active: boolean }>`
  all: unset;
  background: ${({ $active }) => ($active ? color('black-5') : 'transparent')};
  box-sizing: border-box;
  color: ${semanticColor.inkMuted};
  cursor: pointer;
  display: block;
  font-family: ${fontFamily('sans')};
  font-size: 12px;
  overflow: hidden;
  padding: ${spacing(1.5)} ${spacing(4)} ${spacing(1.5)} ${spacing(11)};
  text-align: left;
  text-overflow: ellipsis;
  transition: background ${DURATION.sm} ${EASING.standard};
  white-space: nowrap;
  width: 100%;
  &::before { content: '– '; color: ${semanticColor.inkSubtle}; }
  &:hover { background: ${color('black-5')}; }
  ${REDUCED_MOTION} { transition: none; }
`;

const MainArea = styled.div`
  flex: 1;
  min-width: 0;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const ContentArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${spacing(6)};
  background: ${color('neutral')};
`;

const ExpandBtn = styled.button`
  all: unset;
  align-items: center;
  background: #fff;
  border: 1px solid ${color('black-10')};
  border-radius: 4px;
  color: ${semanticColor.inkMuted};
  cursor: pointer;
  display: flex;
  height: 28px;
  justify-content: center;
  margin: ${spacing(3)};
  transition: color ${DURATION.sm} ${EASING.standard};
  width: 28px;
  flex-shrink: 0;
  &:hover { color: ${semanticColor.ink}; }
  ${REDUCED_MOTION} { transition: none; }
`;

const ReadingCard = styled.div`
  background: #fff;
  border-radius: ${radius(3)};
  box-shadow: 0 2px 16px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04);
  max-width: 680px;
  padding: ${spacing(6)} ${spacing(7)};
`;

const Para = styled.p`
  color: ${semanticColor.ink};
  font-family: ${fontFamily('sans')};
  font-size: 14px;
  line-height: 1.75;
  margin: 0;
  & + & { margin-top: ${spacing(3)}; }
`;

const SectionHeading = styled.h2`
  color: ${semanticColor.ink};
  font-family: ${fontFamily('sans')};
  font-size: 16px;
  font-weight: ${FONT_WEIGHT.medium};
  margin: 0 0 ${spacing(4)};
`;

const ObsTable = styled.table`
  border-collapse: collapse;
  font-family: ${fontFamily('sans')};
  font-size: 13px;
  margin-top: ${spacing(4)};
  width: 100%;
`;
const ObsTh = styled.th`
  border-bottom: 1px solid ${color('black-10')};
  color: ${semanticColor.inkMuted};
  font-size: 11px;
  font-weight: ${FONT_WEIGHT.medium};
  letter-spacing: 0.04em;
  padding: ${spacing(1.5)} ${spacing(2)};
  text-align: left;
  text-transform: uppercase;
`;
const ObsTd = styled.td`
  border-bottom: 1px solid ${color('black-10')};
  color: ${semanticColor.ink};
  padding: ${spacing(1.5)} ${spacing(2)};
`;

const AppRow = styled.div`
  display: flex;
  gap: ${spacing(3)};
  margin-bottom: ${spacing(2)};
`;
const AppDot = styled.span`
  color: #e6502e;
  flex-shrink: 0;
  font-size: 18px;
  line-height: 1.3;
`;
const AppName = styled.span`
  color: ${semanticColor.ink};
  font-family: ${fontFamily('sans')};
  font-size: 13px;
  font-weight: ${FONT_WEIGHT.medium};
`;
const AppSpec = styled.span`
  color: ${semanticColor.inkMuted};
  font-family: ${fontFamily('sans')};
  font-size: 12px;
`;

const SimWrap = styled.div`
  display: flex;
  justify-content: center;
  padding: ${spacing(2)} 0;
`;

// ── Icons ─────────────────────────────────────────────────────────────────
function GridIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="1" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.2"/>
      <rect x="9" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.2"/>
      <rect x="1" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.2"/>
      <rect x="9" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.2"/>
    </svg>
  );
}
function ChevronDownIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M9.5 9.5L12.5 12.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.2"/>
    </svg>
  );
}
function CollapseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M9 2L5 7L9 12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function ExpandIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M5 2L9 7L5 12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// ── Content renderer ──────────────────────────────────────────────────────
function SectionContent({
  section,
  procedureStepIndex,
}: {
  section: LabSection;
  procedureStepIndex: number;
}) {
  const sec = section as any;

  if (sec.type === 'simulation') {
    const SimComp = SIM_COMPONENTS[sec.simType];
    if (!SimComp) return <Para>Unknown simulation type: {sec.simType}</Para>;
    return (
      <SimWrap>
        <SimComp description={sec.description} />
      </SimWrap>
    );
  }

  if (section.type === 'text') {
    return (
      <ReadingCard>
        <SectionHeading>{section.title}</SectionHeading>
        {section.paragraphs.map((p, i) => (
          <Para key={i}><MathText text={p} /></Para>
        ))}
      </ReadingCard>
    );
  }

  if (section.type === 'apparatus') {
    return (
      <ReadingCard>
        <SectionHeading>{section.title}</SectionHeading>
        {section.items.map((item, i) => (
          <AppRow key={i}>
            <AppDot>·</AppDot>
            <div>
              <AppName><MathText text={item.name} /></AppName>
              {item.specification && <> — <AppSpec><MathText text={item.specification} /></AppSpec></>}
              {item.quantity && <AppSpec> ×{item.quantity}</AppSpec>}
            </div>
          </AppRow>
        ))}
      </ReadingCard>
    );
  }

  if (section.type === 'procedure') {
    const step = section.steps[procedureStepIndex];
    return (
      <ReadingCard>
        <SectionHeading>{section.title}</SectionHeading>
        {step ? (
          step.body.split('\n').map((line, i) => (
            <Para key={i}><MathText text={line} /></Para>
          ))
        ) : (
          <Para>Select a step to begin.</Para>
        )}
      </ReadingCard>
    );
  }

  if (section.type === 'observation') {
    return (
      <ReadingCard>
        <SectionHeading>{section.title}</SectionHeading>
        {section.paragraphs.map((p, i) => (
          <Para key={i}><MathText text={p} /></Para>
        ))}
        {section.table && (
          <ObsTable>
            <thead>
              <tr>{section.table.headers.map((h) => <ObsTh key={h}><MathText text={h} /></ObsTh>)}</tr>
            </thead>
            <tbody>
              {section.table.rows.map((row, ri) => (
                <tr key={ri}>{row.map((cell, ci) => <ObsTd key={ci}><MathText text={String(cell)} /></ObsTd>)}</tr>
              ))}
            </tbody>
          </ObsTable>
        )}
      </ReadingCard>
    );
  }

  if (section.type === 'conclusion') {
    return (
      <ReadingCard>
        <SectionHeading>{section.title}</SectionHeading>
        {section.paragraphs.map((p, i) => <Para key={i}><MathText text={p} /></Para>)}
      </ReadingCard>
    );
  }

  return null;
}

// ── Main component ────────────────────────────────────────────────────────
type Props = { content: LabContent };

export function SimLabPage({ content }: Props) {
  const [collapsed, setCollapsed] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState(content.sections[0]?.id ?? '');
  const [expandedProcedureId, setExpandedProcedureId] = useState<string | null>(
    content.sections.find((s) => s.type === 'procedure')?.id ?? null,
  );
  const [procedureStepIndex, setProcedureStepIndex] = useState(0);

  const activeSection = content.sections.find((s) => s.id === activeSectionId) ?? content.sections[0];

  const handleSectionClick = useCallback((section: LabSection) => {
    setActiveSectionId(section.id);
    if (section.type === 'procedure') {
      setExpandedProcedureId((prev) => (prev === section.id ? null : section.id));
    }
  }, []);

  return (
    <Root>
      {/* Sidebar */}
      <Sidebar $collapsed={collapsed}>
        <SidebarHeader>
          <CodeIcon>{'<>'}</CodeIcon>
          <LabTitle>{content.title}</LabTitle>
          <CollapseBtn onClick={() => setCollapsed(true)} aria-label="Collapse">
            <CollapseIcon />
          </CollapseBtn>
        </SidebarHeader>

        <SearchWrap>
          <SearchIcon />
          <SearchInput placeholder="Search" />
          <SearchKbd>⌘S</SearchKbd>
        </SearchWrap>

        <SectionNav>
          {content.sections.map((section) => {
            const isActive    = section.id === activeSectionId;
            const isExpanded  = section.id === expandedProcedureId;
            const isProcedure = section.type === 'procedure';
            return (
              <div key={section.id}>
                <SectionBtn $active={isActive} onClick={() => handleSectionClick(section)}>
                  <GridIcon />
                  {section.title}
                  {isProcedure && (
                    <SectionChevron $open={isExpanded}><ChevronDownIcon /></SectionChevron>
                  )}
                </SectionBtn>
                {isProcedure && isExpanded && section.type === 'procedure' && (
                  <SubStepList>
                    {section.steps.map((step: ProcedureStep, i: number) => (
                      <SubStepBtn
                        key={i}
                        $active={isActive && procedureStepIndex === i}
                        onClick={() => { setActiveSectionId(section.id); setProcedureStepIndex(i); }}
                      >
                        {step.label}
                      </SubStepBtn>
                    ))}
                  </SubStepList>
                )}
              </div>
            );
          })}
        </SectionNav>
      </Sidebar>

      {/* Main area */}
      <MainArea>
        {collapsed && (
          <ExpandBtn onClick={() => setCollapsed(false)} aria-label="Expand sidebar">
            <ExpandIcon />
          </ExpandBtn>
        )}
        <ContentArea>
          {activeSection && (
            <SectionContent
              section={activeSection}
              procedureStepIndex={procedureStepIndex}
            />
          )}
        </ContentArea>
      </MainArea>
    </Root>
  );
}
