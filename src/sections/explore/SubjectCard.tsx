"use client";

import { Body } from "@/ui";

import { CardShape } from "../three-cards/CardShape";
import { CircuitModel } from "./CircuitModel";
import { type ExploreSubject } from "./explore.data";

/** Subject IDs that are fully available — all others show "Coming Soon". */
const ENABLED_SUBJECTS = new Set([
  "01-analog-electronics",
  "01-digital-electronics",
]);

type Props = {
  subject: ExploreSubject;
  onClick: (subject: ExploreSubject) => void;
};

export function SubjectCard({ subject, onClick }: Props) {
  const comingSoon = !ENABLED_SUBJECTS.has(subject.id);

  return (
    <button
      className={[
        "native-button-reset box-border",
        "flex flex-col h-full isolate min-h-0 min-w-0 overflow-hidden",
        "p-[calc(var(--spacing-base)*4)] pb-0 pt-[calc(var(--spacing-base)*4)]",
        "relative text-left w-full",
        comingSoon
          ? "cursor-default"
          : "cursor-pointer hover:[&_[data-slot=card-image]]:scale-[1.03]",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-blue)]",
        "focus-visible:outline-offset-2 focus-visible:rounded-[4px]",
      ].join(" ")}
      onClick={() => {
        if (!comingSoon) onClick(subject);
      }}
      aria-label={
        comingSoon
          ? `${subject.title} — coming soon`
          : `Open ${subject.title} experiments`
      }
      aria-disabled={comingSoon}
    >
      {/* Tab-notched white card background + border */}
      <CardShape />

      {/* ── Police caution tape strip (15° slant, middle to middle) ─── */}
      {comingSoon && (
        <div
          aria-hidden
          className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center overflow-hidden"
        >
          <div
            style={{
              transform: "rotate(-15deg)",
              width: "150%",
              backgroundColor: "#facc15",
              color: "#000000",
              borderTop: "2.5px solid #000000",
              borderBottom: "2.5px solid #000000",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.35)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "6px 0",
              userSelect: "none",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-sans), sans-serif",
                fontSize: "0.825rem",
                fontWeight: 900,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
                display: "inline-block",
                lineHeight: 1,
              }}
            >
              POLICE LINE • COMING SOON • DO NOT CROSS • COMING SOON • DO NOT CROSS
            </span>
          </div>
        </div>
      )}

      <div
        className={[
          "flex flex-col gap-[calc(var(--spacing-base)*3)] pb-[calc(var(--spacing-base)*4)]",
          comingSoon ? "grayscale opacity-50" : "",
        ].join(" ")}
      >
        <h3
          className="font-[family-name:var(--font-sans),sans-serif] font-medium text-[var(--ink)]"
          style={{
            fontSize: "clamp(1.125rem, 0.9372rem + 0.7519vw, 1.375rem)",
            lineHeight: "clamp(1.5rem, 1.3122rem + 0.7519vw, 1.75rem)",
          }}
        >
          {subject.title}
        </h3>
        <div
          className="border-t border-dotted border-[var(--divider)] h-0 w-full"
          aria-hidden
        />
        <Body size="sm" muted>
          {subject.description}
        </Body>
      </div>

      {/* 3D canvas bleeds to card bottom + sides */}
      <div
        className={[
          "relative flex-1 h-[220px] min-h-0 -mx-[calc(var(--spacing-base)*4)] overflow-hidden",
          "transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          "motion-reduce:transition-none",
          comingSoon ? "grayscale opacity-40" : "",
        ].join(" ")}
        data-slot="card-image"
      >
        <CircuitModel circuitId={subject.circuitId} />
      </div>
    </button>
  );
}
