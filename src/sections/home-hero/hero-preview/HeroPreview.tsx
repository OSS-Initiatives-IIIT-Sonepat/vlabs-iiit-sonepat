"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

import { ALL_CIRCUITS } from "@/labs/circuits/index";
import { resolveFinalCircuitStepIndex } from "@/labs/resolve-circuit-step-index";
import { type Circuit } from "@/labs/types";

// Hero sidebar — curated intro set only (order is authored).
const HERO_PREVIEW_CIRCUIT_IDS = [
  "half-adder",
  "full-adder",
  "half-subtractor",
  "full-subtractor",
  "mux-2to1",
  "demux-1to2",
  "11-encoder-4to2",
  "12-decoder-2to4",
  "zener-diode",
  "logic-gates",
] as const;

const HERO_PREVIEW_CIRCUITS = HERO_PREVIEW_CIRCUIT_IDS.flatMap((id) => {
  const circuit = ALL_CIRCUITS.find((item) => item.id === id);
  return circuit ? [circuit] : [];
});

const LabSceneCanvas = dynamic(
  () => import("@/labs/LabScene").then((m) => m.LabSceneCanvas),
  { ssr: false },
);

// ── CSS-only breadboard thumbnail ─────────────────────────────────────────
const HOLES = Array.from({ length: 40 });
function BreadboardThumb({ active }: { active: boolean }) {
  return (
    <div
      className={`relative h-[38px] w-full overflow-hidden rounded-[3px] before:absolute before:left-1 before:right-1 before:top-1.5 before:h-1 before:bg-[#c84040] before:content-[''] after:absolute after:bottom-1.5 after:left-1 after:right-1 after:h-1 after:bg-[#2060a0] after:content-[''] ${
        active ? "bg-[#f0ead8]" : "bg-[#f7f5f2]"
      }`}
    >
      <div className="absolute left-1/2 top-[14px] bottom-[14px] grid -translate-x-1/2 grid-cols-[repeat(10,4px)] grid-rows-[repeat(4,4px)] gap-0.5">
        {HOLES.map((_, i) => (
          <span key={i} className="block h-1 w-1 rounded-[1px] bg-[#c8bfae]" />
        ))}
      </div>
    </div>
  );
}

function gatesSummary(circuit: Circuit): string {
  const counts: Record<string, number> = {};
  for (const c of circuit.components) {
    if (c.type.endsWith("-gate")) {
      const label = c.type.replace("-gate", "").toUpperCase();
      counts[label] = (counts[label] ?? 0) + 1;
    }
  }
  return Object.entries(counts)
    .map(([k, v]) => `${v}\u00d7 ${k}`)
    .join("  \u00b7  ");
}

export function HeroPreview() {
  const [activeId, setActiveId] = useState<
    (typeof HERO_PREVIEW_CIRCUIT_IDS)[number]
  >(HERO_PREVIEW_CIRCUIT_IDS[0]);
  const active =
    HERO_PREVIEW_CIRCUITS.find((circuit) => circuit.id === activeId) ??
    HERO_PREVIEW_CIRCUITS[0];
  const finalStepIndex = resolveFinalCircuitStepIndex(active);

  return (
    <div className="grid h-[420px] w-full grid-cols-[116px_1px_1fr] overflow-hidden rounded-[20px] border-[1.5px] border-[#e8e4e0] bg-white shadow-[0_40px_100px_rgba(0,0,0,0.12),inset_0_0_0_1px_rgba(0,0,0,0.04)]">
      <div className="flex flex-col gap-1 overflow-y-auto bg-[#faf9f7] px-2 py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {HERO_PREVIEW_CIRCUITS.map((circuit) => {
          const isActive = circuit.id === activeId;
          return (
            <button
              key={circuit.id}
              className={`flex w-full cursor-pointer flex-col gap-1 rounded-[7px] border px-1.5 pb-1.5 pt-[5px] transition-[background,border-color] duration-[120ms] ${
                isActive
                  ? "border-[rgba(0,0,0,0.14)] bg-[rgba(0,0,0,0.06)]"
                  : "border-[rgba(0,0,0,0.06)] bg-[rgba(0,0,0,0.02)] hover:border-[rgba(0,0,0,0.10)] hover:bg-[rgba(0,0,0,0.05)]"
              }`}
              onClick={() =>
                setActiveId(
                  circuit.id as (typeof HERO_PREVIEW_CIRCUIT_IDS)[number],
                )
              }
              title={circuit.title}
            >
              <BreadboardThumb active={isActive} />
              <span
                className={`truncate font-[-apple-system,BlinkMacSystemFont,sans-serif] text-[9.5px] font-medium leading-none transition-colors duration-[120ms] ${
                  isActive ? "text-[#1a1816]" : "text-[#9a9694]"
                }`}
              >
                {circuit.title}
              </span>
            </button>
          );
        })}
      </div>

      <div className="w-px shrink-0 bg-[linear-gradient(to_bottom,transparent,#e8e4e0_15%,#e8e4e0_85%,transparent)]" />

      <div className="relative flex min-h-0 min-w-0 flex-col overflow-hidden bg-[#f7f6f3]">
        <div className="min-h-0 flex-1">
          <LabSceneCanvas
            activeStepIndex={finalStepIndex}
            circuit={active}
            showControlsHint={false}
          />
        </div>
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 bg-[linear-gradient(to_top,rgba(247,246,243,0.95),transparent)] px-5 py-3.5">
          <p className="m-0 font-[-apple-system,BlinkMacSystemFont,sans-serif] text-[10px] font-semibold uppercase tracking-[0.10em] text-[#6a6460]">
            {active.title}
          </p>
          <p className="mb-0 mt-[3px] font-[-apple-system,BlinkMacSystemFont,sans-serif] text-[10px] text-[#b0aaa4]">
            {gatesSummary(active)}
          </p>
        </div>
      </div>
    </div>
  );
}
