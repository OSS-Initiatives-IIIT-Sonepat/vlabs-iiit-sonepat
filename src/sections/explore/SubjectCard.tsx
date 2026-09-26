"use client";

import { Body } from "@/ui";

import { CardShape } from "../three-cards/CardShape";
import { CircuitModel } from "./CircuitModel";
import { type ExploreSubject } from "./explore.data";

type Props = {
  subject: ExploreSubject;
  onClick: (subject: ExploreSubject) => void;
};

export function SubjectCard({ subject, onClick }: Props) {
  return (
    <button
      className={[
        "native-button-reset box-border cursor-pointer",
        "flex flex-col h-full isolate min-h-0 min-w-0 overflow-hidden",
        "p-[calc(var(--spacing-base)*4)] pb-0 pt-[calc(var(--spacing-base)*4)]",
        "relative text-left w-full",
        "hover:[&_[data-slot=card-image]]:scale-[1.03]",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-blue)]",
        "focus-visible:outline-offset-2 focus-visible:rounded-[4px]",
      ].join(" ")}
      onClick={() => onClick(subject)}
      aria-label={`Open ${subject.title} experiments`}
    >
      {/* Tab-notched white card background + border */}
      <CardShape />

      <div className="flex flex-col gap-[calc(var(--spacing-base)*3)] pb-[calc(var(--spacing-base)*4)]">
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
        ].join(" ")}
        data-slot="card-image"
      >
        <CircuitModel circuitId={subject.circuitId} />
      </div>
    </button>
  );
}
