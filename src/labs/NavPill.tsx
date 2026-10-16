"use client";

import type { ReactNode } from "react";

function ArrowLeftIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M8.5 3.5L5 7L8.5 10.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M5.5 3.5L9 7L5.5 10.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export const PILL_SURFACE_CLASS =
  "bg-white/90 backdrop-blur-md border border-[var(--color-black-10)] rounded-full shadow-[0_4px_24px_rgba(0,0,0,0.12),0_1px_3px_rgba(0,0,0,0.04)]";

/** Floating `‹ label ›` pill used for step and component navigation. */
export function NavPill({
  eyebrow,
  label,
  onPrev,
  onNext,
  prevDisabled = false,
  nextDisabled = false,
  prevLabel = "Previous",
  nextLabel = "Next",
}: {
  eyebrow: ReactNode;
  label: ReactNode;
  onPrev: () => void;
  onNext: () => void;
  prevDisabled?: boolean;
  nextDisabled?: boolean;
  prevLabel?: string;
  nextLabel?: string;
}) {
  return (
    <div
      className={`flex items-center p-1.5 gap-1.5 transition-transform duration-300 ${PILL_SURFACE_CLASS}`}
    >
      <button
        onClick={onPrev}
        disabled={prevDisabled}
        className="appearance-none flex items-center justify-center w-10 h-10 rounded-full border-none outline-none bg-transparent cursor-pointer text-[var(--ink-muted)] hover:bg-[var(--color-black-5)] hover:text-[var(--ink)] disabled:opacity-40 disabled:pointer-events-none transition-all"
        aria-label={prevLabel}
      >
        <ArrowLeftIcon />
      </button>

      <div className="flex flex-col items-center justify-center px-4 min-w-[140px] select-none">
        <span className="text-[10px] font-semibold tracking-[0.04em] text-[var(--ink-muted)] uppercase mb-0.5">
          {eyebrow}
        </span>
        <span className="text-[13px] font-medium text-[var(--ink)] truncate max-w-[160px]">
          {label}
        </span>
      </div>

      <button
        onClick={onNext}
        disabled={nextDisabled}
        className="appearance-none flex items-center justify-center w-10 h-10 rounded-full border-none outline-none bg-[var(--color-black-5)] cursor-pointer text-[var(--ink)] hover:bg-[var(--color-black-10)] disabled:opacity-40 disabled:pointer-events-none transition-all"
        aria-label={nextLabel}
      >
        <ArrowRightIcon />
      </button>
    </div>
  );
}
