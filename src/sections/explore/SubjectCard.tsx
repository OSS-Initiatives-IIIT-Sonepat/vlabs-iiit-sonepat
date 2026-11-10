"use client";

import Image from "next/image";

import { Body } from "@/ui";

import { CardShape } from "../three-cards/CardShape";
import { type ExploreSubject } from "./explore.data";

/**
 * Line drawings in public/subject-cards, used in place of the WebGL
 * previews. Subjects that share a discipline share a drawing until a
 * dedicated file exists.
 */
const SUBJECT_CARD_ART: Record<string, string> = {
  "01-analog-electronics": "/subject-cards/analog-electronics.png",
  "03-FEE": "/subject-cards/fundamentals-of-electrical-and-electronics.png",
  "01-combinational-arithmetic": "/subject-cards/coa.png",
  "02-memory-cpu-systems": "/subject-cards/coa.png",
  "04-computer-organisation-architecture": "/subject-cards/coa.png",
  "05-computer-arithmetic": "/subject-cards/coa.png",
  "06-processor-design": "/subject-cards/coa.png",
  "07-memory-and-io": "/subject-cards/coa.png",
  "08-assembly-systems": "/subject-cards/assembly-programming.png",
  "03-programming-fundamentals": "/subject-cards/assembly-programming.png",
  "01-8085-assembly-programming": "/subject-cards/assembly-programming.png",
  "02-peripheral-interfacing":
    "/subject-cards/microprocessors-and-interpreters.png",
  "03-microprocessors-and-microcontrollers":
    "/subject-cards/microprocessors-and-interpreters.png",
  "01-computer-networks": "/subject-cards/computer-networks.png",
};

/** Subject IDs that are fully available — all others show "Coming Soon". */
const ENABLED_SUBJECTS = new Set([
  "01-analog-electronics",
  "03-FEE",
  "01-digital-electronics",
  "01-combinational-arithmetic",
  "03-programming-fundamentals",
  "04-computer-organisation-architecture",
  "05-computer-arithmetic",
  "06-processor-design",
  "07-memory-and-io",
  "08-assembly-systems",
  "01-8085-assembly-programming",
  "02-peripheral-interfacing",
  "03-microprocessors-and-microcontrollers",
  "01-computer-networks",
]);

type Props = {
  subject: ExploreSubject;
  onClick: (subject: ExploreSubject) => void;
  /** Drawings mount only while this semester is open. */
  showPreview: boolean;
};

export function SubjectCard({ subject, onClick, showPreview }: Props) {
  const comingSoon = !ENABLED_SUBJECTS.has(subject.id);
  const art = SUBJECT_CARD_ART[subject.id];

  return (
    <button
      className={[
        "native-button-reset box-border",
        "flex h-full flex-col isolate min-w-0 overflow-hidden",
        "p-[calc(var(--spacing-base)*4)] pb-[calc(var(--spacing-base)*3)] pt-[calc(var(--spacing-base)*4)]",
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
              POLICE LINE • COMING SOON • DO NOT CROSS • COMING SOON • DO NOT
              CROSS
            </span>
          </div>
        </div>
      )}

      <div
        className={[
          "flex min-h-0 flex-1 flex-col",
          comingSoon ? "grayscale opacity-50" : "",
        ].join(" ")}
      >
        <div className="flex flex-col gap-[calc(var(--spacing-base)*3)] pb-[calc(var(--spacing-base)*3)]">
          <h3
            className="line-clamp-1 font-[family-name:var(--font-sans),sans-serif] font-medium text-[var(--ink)]"
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
          <div title={subject.description}>
            <Body size="sm" muted className="line-clamp-2 min-h-[3.1em]">
              {subject.description}
            </Body>
          </div>
        </div>

        {showPreview && art && (
          <div
            className={[
              "relative mt-auto h-[240px] shrink-0 overflow-hidden",
              "transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
              "motion-reduce:transition-none",
            ].join(" ")}
            data-slot="card-image"
          >
            <Image
              src={art}
              alt=""
              fill
              sizes="420px"
              className="object-contain object-center"
            />
          </div>
        )}
      </div>
    </button>
  );
}
