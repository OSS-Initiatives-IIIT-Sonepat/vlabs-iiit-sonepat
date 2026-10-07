"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { type ComponentData, COMPONENTS_DATA } from "./components.data";
import { ComponentDockIcon } from "./ComponentDockIcon";
import { useRef } from "react";

// Dynamically import the 3D viewer with SSR disabled
const EceComponentViewer = dynamic(
  () =>
    import("@/labs/previews/EceComponentViewer").then(
      (m) => m.EceComponentViewer,
    ),
  { ssr: false },
);

function BackIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.5 3L5.5 8L10.5 13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 7H11M8 4L11 7L8 10"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.5 1.75L13.25 12.25H1.75L7.5 1.75Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 5.25V8"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <circle cx="7.5" cy="10.25" r="0.6" fill="currentColor" />
    </svg>
  );
}

export function ComponentShowcase({ data }: { data: ComponentData }) {
  const dockScrollRef = useRef<HTMLDivElement>(null);

  const scrollDock = (direction: "left" | "right") => {
    if (dockScrollRef.current) {
      const scrollAmount = direction === "left" ? -150 : 150;
      dockScrollRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="flex flex-col min-h-dvh bg-white lg:flex-row overflow-hidden relative">
      {/* ── Left: 3D Viewer ── */}
      <div className="relative w-full h-[50vh] lg:h-dvh lg:w-[55%] bg-[#f7f6f3] border-b lg:border-b-0 lg:border-r border-[rgba(0,0,0,0.08)] flex-shrink-0 overflow-hidden">
        <EceComponentViewer
          kind={data.kind}
          background="#f7f6f3"
          autoRotate={true}
          zoom={true}
        />

        {/* Helper overlay */}
        <div className="absolute bottom-14 left-1/2 -translate-x-1/2 text-black/30 font-sans text-[11px] pointer-events-none whitespace-nowrap">
          drag to rotate · scroll or pinch to zoom · double-click to reset
        </div>

        {/* ── Bottom Dock ── */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1 p-1 bg-transparent rounded-xl z-50 max-w-[60%]">
          <button
            className="text-black/25 hover:text-black/50 flex-shrink-0 transition-colors cursor-pointer"
            onClick={() => scrollDock("left")}
            aria-label="Scroll left"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div
            ref={dockScrollRef}
            className="flex items-center gap-2 overflow-x-auto scroll-smooth dock-scroll"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <style>{`
              .dock-scroll::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            {Object.values(COMPONENTS_DATA).map((comp) => {
              const isActive = comp.slug === data.slug;
              return (
                <Link
                  key={comp.slug}
                  href={`/components/${comp.slug}`}
                  className={`relative w-[64px] h-[64px] rounded-lg overflow-hidden flex-shrink-0 transition-all flex flex-col items-center justify-center p-1.5 text-center ${
                    isActive
                      ? "bg-white/95 border border-black/15 ring-2 ring-black/10 opacity-100 shadow-sm text-black"
                      : "bg-white/50 border border-black/5 hover:border-black/15 hover:bg-white/80 opacity-70 hover:opacity-100 text-black/70 hover:text-black"
                  }`}
                  title={comp.name}
                >
                  <ComponentDockIcon
                    kind={comp.kind}
                    className="w-5 h-5 mb-1"
                  />
                  <span className="text-[9px] font-sans font-medium truncate max-w-full leading-tight select-none">
                    {comp.name.split(" ")[0]}
                  </span>
                </Link>
              );
            })}
          </div>

          <button
            className="text-black/25 hover:text-black/50 flex-shrink-0 transition-colors cursor-pointer"
            onClick={() => scrollDock("right")}
            aria-label="Scroll right"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── Right: Info Panel ── */}
      <div className="flex-1 overflow-y-auto w-full lg:w-[49%] h-[100vh] pb-28">
        <div className="max-w-[600px] mx-auto p-[calc(var(--spacing-base)*6)] lg:p-[calc(var(--spacing-base)*12)]">
          {/* Back */}
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors text-[13px] font-sans font-medium mb-[calc(var(--spacing-base)*8)] no-underline"
          >
            <BackIcon />
            Back to Home
          </Link>

          {/* Header */}
          <div className="mb-[calc(var(--spacing-base)*8)]">
            <h1 className="text-[var(--ink)] font-sans text-3xl font-medium tracking-tight m-0 mb-2">
              {data.name}
            </h1>

            <p className="text-[#a8a7a4] font-sans text-[13px] font-medium tracking-[0.08em] uppercase m-0">
              {data.tagline}
            </p>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-[calc(var(--spacing-base)*4)] mb-[calc(var(--spacing-base)*9)]">
            {data.description.map((paragraph, i) => (
              <p
                key={i}
                className="text-[var(--ink-muted)] font-sans text-[14.5px] leading-[1.75] m-0"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Engineering Intuition */}
          <section className="mb-[calc(var(--spacing-base)*9)]">
            <div className="flex items-center gap-2 mb-[calc(var(--spacing-base)*3)]">
              <h2 className="text-[var(--ink)] font-sans text-[15px] font-medium m-0">
                Engineering Intuition
              </h2>
            </div>

            <div className="rounded-[calc(var(--radius-base)*3)] bg-[#f7f6f3] border border-[rgba(0,0,0,0.06)] px-5 py-4">
              <p className="text-[var(--ink)] font-sans text-[14px] leading-[1.7] m-0">
                {data.intuition}
              </p>
            </div>
          </section>

          {/* Used For */}
          <section className="mb-[calc(var(--spacing-base)*10)]">
            <h2 className="text-[var(--ink)] font-sans text-[15px] font-medium mb-[calc(var(--spacing-base)*4)]">
              Where You'll Use It
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {data.usedFor.map((use, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-3 border border-[rgba(0,0,0,0.08)] rounded-[calc(var(--radius-base)*2)] px-3.5 py-3 group"
                >
                  <span className="text-[var(--ink-muted)] font-sans text-[13px] leading-snug">
                    {use}
                  </span>

                  <span className="text-black/25 group-hover:text-black/50 transition-colors shrink-0">
                    <ArrowIcon />
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Specifications */}
          <section className="mb-[calc(var(--spacing-base)*10)]">
            <h2 className="text-[var(--ink)] font-sans text-[15px] font-medium mb-[calc(var(--spacing-base)*4)]">
              Specifications
            </h2>

            <div className="border border-[rgba(0,0,0,0.08)] rounded-[calc(var(--radius-base)*3)] overflow-hidden">
              <table className="w-full text-left font-sans text-[13.5px]">
                <tbody>
                  {data.specs.map((spec, i) => (
                    <tr
                      key={i}
                      className="border-b last:border-b-0 border-[rgba(0,0,0,0.08)]"
                    >
                      <th className="py-3 px-4 bg-[rgba(0,0,0,0.02)] text-[var(--ink-muted)] font-medium w-[38%] align-top">
                        {spec.label}
                      </th>

                      <td className="py-3 px-4 text-[var(--ink)] align-top">
                        {spec.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Practical Tips */}
          <section className="mb-[calc(var(--spacing-base)*10)]">
            <h2 className="text-[var(--ink)] font-sans text-[15px] font-medium mb-[calc(var(--spacing-base)*4)]">
              Practical Tips
            </h2>

            <ul className="flex flex-col gap-3 m-0 pl-0 list-none">
              {data.tips.map((tip, i) => (
                <li
                  key={i}
                  className="flex gap-3 text-[var(--ink-muted)] font-sans text-[14px] leading-[1.65]"
                >
                  <span className="mt-[7px] w-1 h-1 rounded-full bg-black/30 shrink-0" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Common Mistakes */}
          <section className="pb-[calc(var(--spacing-base)*8)]">
            <h2 className="text-[var(--ink)] font-sans text-[15px] font-medium mb-[calc(var(--spacing-base)*4)]">
              Common Mistakes
            </h2>

            <div className="rounded-[calc(var(--radius-base)*3)] border border-[#e7e2dc] bg-[#faf9f7] px-5 py-4">
              <ul className="flex flex-col gap-3 m-0 pl-0 list-none">
                {data.commonMistakes.map((mistake, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-[var(--ink-muted)] font-sans text-[13.5px] leading-[1.65]"
                  >
                    <span className="mt-[2px] text-[#8f8982] shrink-0">
                      <WarningIcon />
                    </span>

                    <span>{mistake}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
