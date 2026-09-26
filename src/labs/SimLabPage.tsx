"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";

import { MathText } from "@/ui/Math";
import { StreamingTheoryParagraphs } from "@/ui/StreamingMathText";
import {
  type LabContent,
  type LabSection,
  type ProcedureStep,
} from "@/labs/lab-content.types";
import { LabSidebar } from "@/labs/LabSidebar";

// ── Simulation component map ──────────────────────────────────────────────
const SimALU = dynamic(
  () => import("./simulations/SimALU").then((m) => m.SimALU),
  { ssr: false },
);
const SimMemory = dynamic(
  () => import("./simulations/SimMemory").then((m) => m.SimMemory),
  { ssr: false },
);
const SimCacheDirectMapped = dynamic(
  () =>
    import("./simulations/SimCacheDirectMapped").then(
      (m) => m.SimCacheDirectMapped,
    ),
  { ssr: false },
);
const SimCacheAssociative = dynamic(
  () =>
    import("./simulations/SimCacheAssociative").then(
      (m) => m.SimCacheAssociative,
    ),
  { ssr: false },
);
const SimCPU = dynamic(
  () => import("./simulations/SimCPU").then((m) => m.SimCPU),
  { ssr: false },
);

const SIM_COMPONENTS: Record<
  string,
  React.ComponentType<{ description?: string }>
> = {
  alu: SimALU,
  memory: SimMemory,
  "cache-direct": SimCacheDirectMapped,
  "cache-assoc": SimCacheAssociative,
  cpu: SimCPU,
};

// ── Icons ─────────────────────────────────────────────────────────────────
function GridIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect
        x="1"
        y="1"
        width="6"
        height="6"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <rect
        x="9"
        y="1"
        width="6"
        height="6"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <rect
        x="1"
        y="9"
        width="6"
        height="6"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <rect
        x="9"
        y="9"
        width="6"
        height="6"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}
function ChevronDownIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path
        d="M3 4.5L6 7.5L9 4.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M9.5 9.5L12.5 12.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.2"
      />
    </svg>
  );
}
function CollapseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M9 2L5 7L9 12"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function ExpandIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M5 2L9 7L5 12"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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

  if (sec.type === "simulation") {
    const SimComp = SIM_COMPONENTS[sec.simType];
    if (!SimComp)
      return (
        <p className="text-[var(--ink)] font-sans text-sm leading-[1.75] m-0">
          Unknown simulation type: {sec.simType}
        </p>
      );
    return (
      <div className="flex justify-center py-[calc(var(--spacing-base)*2)]">
        <SimComp description={sec.description} />
      </div>
    );
  }

  if (section.type === "text") {
    return (
      <div
        className="bg-white rounded-[calc(var(--radius-base)*3)] shadow-[0_2px_16px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.04)] max-w-[680px]"
        style={{
          padding:
            "calc(var(--spacing-base) * 6) calc(var(--spacing-base) * 7)",
        }}
      >
        <h2 className="text-[var(--ink)] font-sans text-base font-medium mb-[calc(var(--spacing-base)*4)] mt-0">
          {section.title}
        </h2>
        <StreamingTheoryParagraphs
          streamKey={section.id}
          paragraphs={section.paragraphs}
          paragraphClassName="text-[var(--ink)] font-sans text-sm leading-[1.75] m-0 [&+&]:mt-[calc(var(--spacing-base)*3)]"
        />
      </div>
    );
  }

  if (section.type === "apparatus") {
    return (
      <div
        className="bg-white rounded-[calc(var(--radius-base)*3)] shadow-[0_2px_16px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.04)] max-w-[680px]"
        style={{
          padding:
            "calc(var(--spacing-base) * 6) calc(var(--spacing-base) * 7)",
        }}
      >
        <h2 className="text-[var(--ink)] font-sans text-base font-medium mb-[calc(var(--spacing-base)*4)] mt-0">
          {section.title}
        </h2>
        {section.items.map((item, i) => (
          <div
            key={i}
            className="flex gap-[calc(var(--spacing-base)*3)] mb-[calc(var(--spacing-base)*2)]"
          >
            <span className="text-[#e6502e] shrink-0 text-[18px] leading-[1.3]">
              ·
            </span>
            <div>
              <span className="text-[var(--ink)] font-sans text-[13px] font-medium">
                <MathText text={item.name} />
              </span>
              {item.specification && (
                <>
                  {" "}
                  —{" "}
                  <span className="text-[var(--ink-muted)] font-sans text-[12px]">
                    <MathText text={item.specification} />
                  </span>
                </>
              )}
              {item.quantity && (
                <span className="text-[var(--ink-muted)] font-sans text-[12px]">
                  {" "}
                  ×{item.quantity}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (section.type === "procedure") {
    const step = section.steps[procedureStepIndex];
    return (
      <div
        className="bg-white rounded-[calc(var(--radius-base)*3)] shadow-[0_2px_16px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.04)] max-w-[680px]"
        style={{
          padding:
            "calc(var(--spacing-base) * 6) calc(var(--spacing-base) * 7)",
        }}
      >
        <h2 className="text-[var(--ink)] font-sans text-base font-medium mb-[calc(var(--spacing-base)*4)] mt-0">
          {section.title}
        </h2>
        {step ? (
          step.body.split("\n").map((line, i) => (
            <p
              key={i}
              className="text-[var(--ink)] font-sans text-sm leading-[1.75] m-0 [&+&]:mt-[calc(var(--spacing-base)*3)]"
            >
              <MathText text={line} />
            </p>
          ))
        ) : (
          <p className="text-[var(--ink)] font-sans text-sm leading-[1.75] m-0">
            Select a step to begin.
          </p>
        )}
      </div>
    );
  }

  if (section.type === "observation") {
    return (
      <div
        className="bg-white rounded-[calc(var(--radius-base)*3)] shadow-[0_2px_16px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.04)] max-w-[680px]"
        style={{
          padding:
            "calc(var(--spacing-base) * 6) calc(var(--spacing-base) * 7)",
        }}
      >
        <h2 className="text-[var(--ink)] font-sans text-base font-medium mb-[calc(var(--spacing-base)*4)] mt-0">
          {section.title}
        </h2>
        {section.paragraphs.map((p, i) => (
          <p
            key={i}
            className="text-[var(--ink)] font-sans text-sm leading-[1.75] m-0 [&+&]:mt-[calc(var(--spacing-base)*3)]"
          >
            <MathText text={p} />
          </p>
        ))}
        {section.table && (
          <table className="border-collapse font-sans text-[13px] mt-[calc(var(--spacing-base)*4)] w-full">
            <thead>
              <tr>
                {section.table.headers.map((h) => (
                  <th
                    key={h}
                    className="border-b border-[var(--color-black-10)] text-[var(--ink-muted)] text-[11px] font-medium tracking-[0.04em] px-[calc(var(--spacing-base)*2)] py-[calc(var(--spacing-base)*1.5)] text-left uppercase"
                  >
                    <MathText text={h} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.table.rows.map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className="border-b border-[var(--color-black-10)] text-[var(--ink)] px-[calc(var(--spacing-base)*2)] py-[calc(var(--spacing-base)*1.5)]"
                    >
                      <MathText text={String(cell)} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }

  if (section.type === "conclusion") {
    return (
      <div
        className="bg-white rounded-[calc(var(--radius-base)*3)] shadow-[0_2px_16px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.04)] max-w-[680px]"
        style={{
          padding:
            "calc(var(--spacing-base) * 6) calc(var(--spacing-base) * 7)",
        }}
      >
        <h2 className="text-[var(--ink)] font-sans text-base font-medium mb-[calc(var(--spacing-base)*4)] mt-0">
          {section.title}
        </h2>
        {section.paragraphs.map((p, i) => (
          <p
            key={i}
            className="text-[var(--ink)] font-sans text-sm leading-[1.75] m-0 [&+&]:mt-[calc(var(--spacing-base)*3)]"
          >
            <MathText text={p} />
          </p>
        ))}
      </div>
    );
  }

  return null;
}

// ── Main component ────────────────────────────────────────────────────────
type Props = { content: LabContent };

export function SimLabPage({ content }: Props) {
  const [collapsed, setCollapsed] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState(
    content.sections[0]?.id ?? "",
  );
  const [expandedProcedureId, setExpandedProcedureId] = useState<string | null>(
    content.sections.find((s) => s.type === "procedure")?.id ?? null,
  );
  const [procedureStepIndex, setProcedureStepIndex] = useState(0);

  const activeSection =
    content.sections.find((s) => s.id === activeSectionId) ??
    content.sections[0];

  const handleSectionClick = useCallback(
    (section: LabSection) => {
      setActiveSectionId(section.id);
      if (section.type === "procedure") {
        setExpandedProcedureId((prev) => {
          if (activeSectionId === section.id) {
            return prev === section.id ? null : section.id;
          }
          return section.id;
        });
      }
    },
    [activeSectionId],
  );

  return (
    <div className="flex h-dvh overflow-hidden bg-[var(--color-neutral)]">
      {/* Sidebar */}
      <LabSidebar
        title={content.title}
        sections={content.sections}
        activeSectionId={activeSectionId}
        onSelectSection={handleSectionClick}
        expandedProcedureId={expandedProcedureId}
        onToggleExpandProcedure={(id) =>
          setExpandedProcedureId((prev) => (prev === id ? null : id))
        }
        procedureStepIndex={procedureStepIndex}
        onSelectProcedureStep={(stepIdx, section) => {
          setActiveSectionId(section.id);
          setProcedureStepIndex(stepIdx);
        }}
        collapsed={collapsed}
        onToggleCollapse={setCollapsed}
      />

      {/* Main area */}
      <div className="flex-1 min-w-0 overflow-hidden relative flex flex-col">
        <div
          className="flex-1 overflow-y-auto bg-[var(--color-neutral)]"
          style={{ padding: "calc(var(--spacing-base) * 6)" }}
        >
          {activeSection && (
            <SectionContent
              section={activeSection}
              procedureStepIndex={procedureStepIndex}
            />
          )}
        </div>
      </div>
    </div>
  );
}
