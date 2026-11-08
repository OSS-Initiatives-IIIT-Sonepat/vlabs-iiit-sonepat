"use client";

import dynamic from "next/dynamic";

import { Body } from "@/ui";

import { CardShape } from "../three-cards/CardShape";
import { CircuitModel } from "./CircuitModel";
import { type ExploreSubject } from "./explore.data";

const DiagramPreview = dynamic(
  () => import("./DiagramPreview").then((m) => m.DiagramPreview),
  { ssr: false },
);

const ChipPreview = dynamic(
  () => import("@/labs/Mpu8085Scene").then((m) => m.Mpu8085Scene),
  { ssr: false },
);

const NetworkPreview = dynamic(
  () => import("@/labs/OsiJourneyScene").then((m) => m.OsiJourneyScene),
  { ssr: false },
);

/** The bench with the whole path drawn and nothing in flight. */
const NETWORK_COVER = { device: null, blocks: [], arrived: true } as const;

/** Subject IDs that are fully available — all others show "Coming Soon". */
const ENABLED_SUBJECTS = new Set([
  "01-analog-electronics",
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
  /** WebGL previews mount only while this semester is open. */
  showPreview: boolean;
};

export function SubjectCard({ subject, onClick, showPreview }: Props) {
  const comingSoon = !ENABLED_SUBJECTS.has(subject.id);

  return (
    <button
      className={[
        "native-button-reset box-border",
        "flex h-full flex-col isolate min-w-0 overflow-hidden",
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
              POLICE LINE • COMING SOON • DO NOT CROSS • COMING SOON • DO NOT
              CROSS
            </span>
          </div>
        </div>
      )}

      <div
        className={[
          "flex flex-col gap-[calc(var(--spacing-base)*3)] pb-[calc(var(--spacing-base)*3)]",
          comingSoon ? "grayscale opacity-50" : "",
        ].join(" ")}
      >
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

      {/* Same slot on every open card. Breadboard labs draw the board.
          Diagram and program labs draw their figure in that same frame. */}
      {showPreview && !comingSoon && (
        <div
          className={[
            "relative mt-auto h-[260px] shrink-0 -mx-[calc(var(--spacing-base)*4)] overflow-hidden",
            "transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
            "motion-reduce:transition-none",
          ].join(" ")}
          data-slot="card-image"
        >
          <div className="absolute inset-0">
            {subject.circuitId === "8085-pin-labelling" ? (
              <ChipPreview preview focus={[]} />
            ) : subject.circuitId === "osi-model-journey" ? (
              <NetworkPreview preview frame={NETWORK_COVER} />
            ) : subject.hasPreview ? (
              <CircuitModel circuitId={subject.circuitId} />
            ) : (
              <DiagramPreview circuitId={subject.circuitId} />
            )}
          </div>
        </div>
      )}
    </button>
  );
}
