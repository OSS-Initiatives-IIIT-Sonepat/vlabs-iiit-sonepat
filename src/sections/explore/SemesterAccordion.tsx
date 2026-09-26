"use client";

import { useState, useId } from "react";

import { spacing } from "@/tokens";
import { Container } from "@/ui/Container";

import { SubjectCard } from "./SubjectCard";
import { SubjectModal } from "./SubjectModal";
import { type ExploreSemester, type ExploreSubject } from "./explore.data";

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
  open,
  onToggle,
  onSubjectClick,
}: {
  semester: ExploreSemester;
  open: boolean;
  onToggle: () => void;
  onSubjectClick: (subject: ExploreSubject) => void;
}) {
  const panelId = useId();

  return (
    <div className="flex flex-col">
      <button
        className={[
          "flex items-center w-full bg-white border border-[#DADADA] rounded-sm cursor-pointer px-4",
          "gap-[calc(var(--spacing-base)*3)] justify-between text-left",
          "pt-[calc(var(--spacing-base)*4)] pb-[calc(var(--spacing-base)*3)]",
          "[clip-path:polygon(0_0,calc(100%-36px)_0,100%_18px,100%_100%,0_100%)]",
          "focus-visible:outline focus-visible:outline-1 focus-visible:outline-[var(--color-blue)]",
          "focus-visible:outline-offset-2 focus-visible:rounded-[4px]",
        ].join(" ")}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
      >
        <span
          className="text-[var(--ink-muted)] font-[family-name:var(--font-sans),sans-serif] font-normal"
          style={{
            fontSize: "clamp(1.875rem, 1.3rem + 2.1vw, 2.25rem)",
            lineHeight: "clamp(2.125rem, 1.45rem + 2.65vw, 2.625rem)",
          }}
        >
          {semester.label}
        </span>
        <span
          className={[
            "flex shrink-0 text-[var(--ink-muted)]",
            "transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
            "motion-reduce:transition-none",
            open ? "rotate-180" : "rotate-0",
          ].join(" ")}
          aria-hidden
        >
          <Chevron />
        </span>
      </button>

      <div
        id={panelId}
        className={[
          "grid overflow-hidden origin-top",
          "transition-[grid-template-rows,opacity,transform,filter] duration-500",
          "ease-[cubic-bezier(0.16,1,0.3,1)]",
          "py-3 transition-all duration-500",
          open
            ? "grid-rows-[1fr] opacity-100 scale-y-100 translate-y-0 blur-0"
            : "grid-rows-[0fr] opacity-0 scale-y-[0.92] -translate-y-2 blur-[4px]",
        ].join(" ")}
      >
        <div className="min-h-0 overflow-hidden">
          <div
            className={[
              "grid gap-[calc(var(--spacing-base)*4)] grid-cols-1",
              "pb-[calc(var(--spacing-base)*1.5)]",
              "min-[921px]:grid-cols-3",
            ].join(" ")}
          >
            {semester.subjects.map((subject) => (
              <SubjectCard
                key={subject.id}
                subject={subject}
                onClick={onSubjectClick}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Exported section ──────────────────────────────────────────────────────
type Props = { semesters: readonly ExploreSemester[] };

export function SemesterAccordion({ semesters }: Props) {
  const [openSemester, setOpenSemester] = useState(semesters[0]?.id);
  const [activeSubject, setActiveSubject] = useState<ExploreSubject | null>(
    null,
  );

  return (
    <>
      <section
        className="flex flex-col gap-[calc(var(--spacing-base)*4)] pb-[calc(var(--spacing-base)*15)]"
        aria-label="Explore by semester"
      >
        <Container>
          <div className="max-w-[860px] mx-auto">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: spacing(1.5),
              }}
            >
              {semesters.map((semester) => (
                <SemesterItem
                  key={semester.id}
                  semester={semester}
                  open={openSemester === semester.id}
                  onToggle={() => {
                    setOpenSemester((current) =>
                      current === semester.id ? null : semester.id,
                    );
                  }}
                  onSubjectClick={setActiveSubject}
                />
              ))}
            </div>
          </div>
        </Container>
      </section>

      {activeSubject && (
        <SubjectModal
          subject={activeSubject}
          onClose={() => setActiveSubject(null)}
        />
      )}
    </>
  );
}
