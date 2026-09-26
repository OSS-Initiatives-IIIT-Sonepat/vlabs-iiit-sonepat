"use client";

import React, { useState, useCallback, useMemo, useEffect, useRef } from "react";
import dynamic from "next/dynamic";

import { MathText } from "@/ui/Math";
import { StreamingTheoryParagraphs } from "@/ui/StreamingMathText";
import { ALL_CIRCUITS } from "@/labs/circuits";
import {
  type LabContent,
  type LabSection,
  type ProcedureStep,
  type TheorySection,
  type ApparatusSection,
  type ObservationSection,
  type ConclusionSection,
} from "@/labs/lab-content.types";
import { LabSidebar } from "@/labs/LabSidebar";
import { FloatingLabCard } from "@/labs/FloatingLabCard";
import {
  resolveFinalCircuitStepIndex,
  resolveProcedureCircuitStepIndex,
} from "@/labs/resolve-circuit-step-index";
import { type Circuit } from "@/labs/types";
import { type StepMarker } from "@/labs/LabScene";

const EMPTY_MARKERS: StepMarker[] = [];

// ── Dynamic imports (all client-only Three.js) ────────────────────────────
const LabSceneCanvas = dynamic(
  () => import("@/labs/LabScene").then((m) => m.LabSceneCanvas),
  { ssr: false },
);
const TheoryScene = dynamic(
  () => import("@/labs/TheoryScene").then((m) => m.TheoryScene),
  { ssr: false },
);
const ApparatusScene = dynamic(
  () => import("@/labs/ApparatusScene").then((m) => m.ApparatusScene),
  { ssr: false },
);
const CodeLabPage = dynamic(
  () => import("@/labs/CodeLabPage").then((m) => m.CodeLabPage),
  { ssr: false },
);
const SimLabPage = dynamic(
  () => import("@/labs/SimLabPage").then((m) => m.SimLabPage),
  { ssr: false },
);

// ── Fallback circuit ───────────────────────────────────────────────────────
const BREADBOARD_ONLY: Circuit = {
  id: "__breadboard",
  title: "",
  description: "",
  components: [{ id: "bb", type: "breadboard" }],
  steps: [{ title: "", body: "", show: ["bb"] }],
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

function MiconIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect
        x="5.5"
        y="3"
        width="5"
        height="8"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M3.5 8v1.5a4.5 4.5 0 009 0V8"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M8 14v2"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M2 6.5 Q0.5 8.5 2 10.5"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0"
      >
        <animate
          attributeName="opacity"
          values="0;1;0"
          dur="1.2s"
          repeatCount="indefinite"
        />
      </path>
      <path
        d="M14 6.5 Q15.5 8.5 14 10.5"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0"
      >
        <animate
          attributeName="opacity"
          values="0;1;0"
          dur="1.2s"
          repeatCount="indefinite"
          begin="0.2s"
        />
      </path>
    </svg>
  );
}
function MicOffIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect
        x="5.5"
        y="3"
        width="5"
        height="8"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M3.5 8v1.5a4.5 4.5 0 009 0V8"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M8 14v2"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <line
        x1="2"
        y1="14"
        x2="14"
        y2="2"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
const PARAGRAPH_CLASS =
  "text-[var(--ink)] font-sans text-[13.5px] leading-[1.7] m-0 [&+&]:mt-[calc(var(--spacing-base)*3)]";

function contentStreamKey(
  section: LabSection,
  procedureStepIndex: number,
): string {
  if (section.type === "procedure")
    return `${section.id}:${procedureStepIndex}`;
  return section.id;
}

// ── Floating card content per section type ────────────────────────────────
function FloatingCardContent({
  section,
  procedureStepIndex,
}: {
  section: LabSection;
  procedureStepIndex: number;
}) {
  const streamKey = contentStreamKey(section, procedureStepIndex);

  if (section.type === "text") {
    return (
      <StreamingTheoryParagraphs
        key={streamKey}
        streamKey={streamKey}
        paragraphs={section.paragraphs}
        paragraphClassName={PARAGRAPH_CLASS}
      />
    );
  }

  if (section.type === "apparatus") {
    return (
      <>
        <p className="text-[var(--ink)] font-sans text-[13.5px] leading-[1.7] m-0">
          Use the arrows or dots below to inspect each component in 3D.
        </p>
        <div className="flex flex-col gap-[calc(var(--spacing-base)*1.5)] mt-[calc(var(--spacing-base)*3)]">
          {section.items.map((item, i) => (
            <div key={i} className="flex gap-[calc(var(--spacing-base)*3)]">
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
      </>
    );
  }

  if (section.type === "procedure") {
    const step = section.steps[procedureStepIndex];
    if (!step)
      return <p className={PARAGRAPH_CLASS}>Select a step to begin.</p>;
    return (
      <StreamingTheoryParagraphs
        key={streamKey}
        streamKey={streamKey}
        paragraphs={step.body.split("\n").filter((line) => line.length > 0)}
        paragraphClassName={PARAGRAPH_CLASS}
      />
    );
  }

  if (section.type === "observation") {
    return (
      <>
        {section.paragraphs.map((p, i) => (
          <p
            key={i}
            className="text-[var(--ink)] font-sans text-[13.5px] leading-[1.7] m-0 [&+&]:mt-[calc(var(--spacing-base)*3)]"
          >
            <MathText text={p} />
          </p>
        ))}
        {section.table && (
          <table className="border-collapse font-sans text-[12.5px] mt-[calc(var(--spacing-base)*4)] w-full">
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
      </>
    );
  }

  if (section.type === "conclusion") {
    return (
      <>
        {section.paragraphs.map((p, i) => (
          <p
            key={i}
            className="text-[var(--ink)] font-sans text-[13.5px] leading-[1.7] m-0 [&+&]:mt-[calc(var(--spacing-base)*3)]"
          >
            <MathText text={p} />
          </p>
        ))}
      </>
    );
  }

  return null;
}

// ── Scene renderer per section type ──────────────────────────────────────
const SceneRenderer = React.memo(function SceneRenderer({
  section,
  circuit,
  sceneStepIndex,
  activeMarkers,
}: {
  section: LabSection;
  circuit: Circuit;
  sceneStepIndex: number;
  activeMarkers: StepMarker[];
}) {
  if (section.type === "code-lab" || section.type === "simulation") {
    return null; // These sections are handled by CodeLabPage/SimLabPage directly
  }
  if (section.type === "text" && section.schematic) {
    return <TheoryScene spec={section.schematic} />;
  }
  if (section.type === "apparatus") {
    return <ApparatusScene items={section.items} />;
  }
  // For text-only labs (labType === 'text'), do not render a bare breadboard
  // when there is no real circuit — return null so sections show cleanly.
  if (circuit.id === "__breadboard" && section.type !== "text") {
    return null;
  }
  // Procedure / observation / conclusion / theory without schematic: show breadboard
  return (
    <LabSceneCanvas
      circuit={circuit}
      activeStepIndex={sceneStepIndex}
      markers={activeMarkers}
    />
  );
});

// ── Main component ─────────────────────────────────────────────────────────
type Props = { content: LabContent };

function LabPageStandard({ content }: Props) {
  const [isMicOn, setIsMicOn] = useState<boolean>(true);
  const [collapsed, setCollapsed] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState(
    content.sections[0]?.id ?? "",
  );
  const [expandedProcedureId, setExpandedProcedureId] = useState<string | null>(
    content.sections.find((s) => s.type === "procedure")?.id ?? null,
  );
  const [procedureStepIndex, setProcedureStepIndex] = useState(0);
  const [language, setLanguage] = useState<"en" | "hi">("en");
  const [isLangOpen, setIsLangOpen] = useState(false);

  const activeSection =
    content.sections.find((s) => s.id === activeSectionId) ??
    content.sections[0];

  type NavItem = { section: LabSection; stepIndex: number; label: string };

  const navItems = useMemo<NavItem[]>(() => {
    return content.sections.flatMap((section): NavItem[] => {
      if (section.type === "procedure") {
        return section.steps.map((step, i) => ({
          section,
          stepIndex: i,
          label: step.label || `Step ${i + 1}`,
        }));
      }
      return [{ section, stepIndex: 0, label: section.title }];
    });
  }, [content.sections]);

  const currentIndex = navItems.findIndex(
    (item) =>
      item.section.id === activeSectionId &&
      item.stepIndex === procedureStepIndex,
  );

  const handleNav = useCallback(
    (index: number) => {
      if (index >= 0 && index < navItems.length) {
        const target = navItems[index];
        setActiveSectionId(target.section.id);
        setProcedureStepIndex(target.stepIndex);
        if (target.section.type === "procedure") {
          setExpandedProcedureId(target.section.id);
        }
      }
    },
    [navItems],
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        handleNav(currentIndex + 1);
      } else if (e.key === "ArrowLeft") {
        handleNav(currentIndex - 1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, handleNav]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isAudioUnlockedRef = useRef<boolean>(false);
  const speak = useCallback(
    (path: string) => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }

      // 2. If path is empty (cleanup phase) or mic is off, just exit
      if (!path || !isMicOn) return;

      // 3. Create and play the new audio purely in JavaScript memory
      const audio = new Audio(path);
      audio.preload = "auto"; // Optimizes loading speed

      audio.play().catch((error) => {
        console.error("Audio playback failed or was interrupted:", error);
        if (error.name === "NotAllowedError") {
          // The browser blocked autoplay (e.g., hard refresh).
          // Turn the mic state off so the user can manually click it to unlock audio.
          setIsMicOn(false);
        }
      });

      audioRef.current = audio;
    },
    [isMicOn],
  );
  useEffect(() => {
    if (!isMicOn) {
      speak("");
      return;
    }
    if (activeSection?.audioPath) {
      speak(activeSection.audioPath);
    }
    return () => {
      // Cleanup: stop any playing audio
      speak("");
    };
  }, [activeSection, isMicOn, speak]);
  const circuit: Circuit =
    ALL_CIRCUITS.find((c) => c.id === content.circuitId) ?? BREADBOARD_ONLY;

  const { sceneStepIndex, activeMarkers } = useMemo(() => {
    if (activeSection?.type === "procedure") {
      const step = activeSection.steps[procedureStepIndex];
      if (!step) {
        return {
          sceneStepIndex: resolveFinalCircuitStepIndex(circuit),
          activeMarkers: EMPTY_MARKERS,
        };
      }
      return {
        sceneStepIndex: resolveProcedureCircuitStepIndex(
          circuit,
          procedureStepIndex,
        ),
        activeMarkers: step.markers ?? EMPTY_MARKERS,
      };
    }

    if (
      activeSection?.type === "observation" ||
      activeSection?.type === "conclusion"
    ) {
      return {
        sceneStepIndex: resolveFinalCircuitStepIndex(circuit),
        activeMarkers: EMPTY_MARKERS,
      };
    }

    return { sceneStepIndex: 0, activeMarkers: EMPTY_MARKERS };
  }, [activeSection, procedureStepIndex, circuit]);
  const handleToggleMic = () => {
    // If turning the mic ON, unlock the audio context via this user gesture
    if (!isMicOn) {
      isAudioUnlockedRef.current = true;

      // Play a tiny, silent chunk of audio to instantly "unlock" the audio thread
      const unlockAudio = new Audio(
        "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAAAA==",
      );
      unlockAudio
        .play()
        .catch((err) => console.error("Failed to unlock audio thread", err));
    }

    // Toggle your actual state
    setIsMicOn(!isMicOn);
  };
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
    <div className="flex h-dvh overflow-hidden bg-[var(--color-neutral)] relative">
      {/* ── Scene area (always full screen, stable viewport so Three.js never resizes or resets on sidebar toggle) ── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-auto">
        {activeSection && (
          <SceneRenderer
            section={activeSection}
            circuit={circuit}
            sceneStepIndex={sceneStepIndex}
            activeMarkers={activeMarkers}
          />
        )}
      </div>

      {/* ── Sidebar ── */}
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

      {/* ── Overlay controls & floating cards ── */}
      <div className="flex-1 min-w-0 overflow-hidden relative pointer-events-none z-10">
        {/* Floating text card over scene */}
        {activeSection && (
          <div className="pointer-events-auto">
            <FloatingLabCard>
              <FloatingCardContent
                key={contentStreamKey(activeSection, procedureStepIndex)}
                section={activeSection}
                procedureStepIndex={procedureStepIndex}
              />
            </FloatingLabCard>
          </div>
        )}

        {/* Top-Right Floating Controls */}
        <div className="absolute top-6 right-6 flex items-center gap-4 z-[100] pointer-events-auto">
          {/* Language & Mic Pill */}
          <div className="relative flex items-center p-1.5 gap-2 bg-white/90 backdrop-blur-md border border-[var(--color-black-10)] rounded-full shadow-[0_4px_24px_rgba(0,0,0,0.12),0_1px_3px_rgba(0,0,0,0.04)] transition-transform duration-300">
            {/* Mic Button */}
            <button
              onClick={() => handleToggleMic()}
              className="appearance-none flex items-center justify-center w-8 h-8 rounded-full border-none outline-none bg-[var(--color-black-5)] cursor-pointer text-[var(--ink-muted)] hover:bg-[var(--color-black-10)] hover:text-[var(--ink)] transition-colors"
              aria-label="Microphone"
            >
              {isMicOn ? <MiconIcon /> : <MicOffIcon />}
            </button>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="appearance-none flex items-center gap-1.5 px-3 h-8 rounded-full border-none outline-none bg-transparent cursor-pointer text-[var(--ink)] hover:bg-[var(--color-black-5)] transition-colors font-medium text-[13px]"
              >
                {language === "en" ? "English" : "Hindi"}
                <span
                  className={`transition-transform duration-200 ${isLangOpen ? "rotate-180" : ""}`}
                >
                  <ChevronDownIcon />
                </span>
              </button>

              {/* Dropdown Menu */}
              {isLangOpen && (
                <div className="absolute top-[calc(100%+8px)] right-0 flex flex-col min-w-[100px] p-1 bg-white border border-[var(--color-black-10)] rounded-[12px] shadow-[0_4px_24px_rgba(0,0,0,0.12)] z-[101]">
                  <button
                    onClick={() => {
                      setLanguage("en");
                      setIsLangOpen(false);
                    }}
                    className={`appearance-none text-left px-3 py-2 rounded-[8px] border-none outline-none cursor-pointer text-[13px] hover:bg-[var(--color-black-5)] transition-colors ${language === "en" ? "text-[var(--color-blue)] bg-[var(--color-black-5)] font-medium" : "text-[var(--ink)] bg-transparent"}`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => {
                      setLanguage("hi");
                      setIsLangOpen(false);
                    }}
                    className={`appearance-none text-left px-3 py-2 rounded-[8px] border-none outline-none cursor-pointer text-[13px] hover:bg-[var(--color-black-5)] transition-colors ${language === "hi" ? "text-[var(--color-blue)] bg-[var(--color-black-5)] font-medium" : "text-[var(--ink)] bg-transparent"}`}
                  >
                    Hindi
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Floating Navigation Pill */}
          <div className="flex items-center p-1.5 gap-1.5 bg-white/90 backdrop-blur-md border border-[var(--color-black-10)] rounded-full shadow-[0_4px_24px_rgba(0,0,0,0.12),0_1px_3px_rgba(0,0,0,0.04)] transition-transform duration-300">
            <button
              onClick={() => handleNav(currentIndex - 1)}
              disabled={currentIndex <= 0}
              className="appearance-none flex items-center justify-center w-10 h-10 rounded-full border-none outline-none bg-transparent cursor-pointer text-[var(--ink-muted)] hover:bg-[var(--color-black-5)] hover:text-[var(--ink)] disabled:opacity-40 disabled:pointer-events-none transition-all"
              aria-label="Previous step"
            >
              <ArrowLeftIcon />
            </button>

            <div className="flex flex-col items-center justify-center px-4 min-w-[140px] select-none">
              <span className="text-[10px] font-semibold tracking-[0.04em] text-[var(--ink-muted)] uppercase mb-0.5">
                {navItems[currentIndex]?.section.title || "Step"}
              </span>
              <span className="text-[13px] font-medium text-[var(--ink)] truncate max-w-[160px]">
                {navItems[currentIndex]?.label || ""}
              </span>
            </div>

            <button
              onClick={() => handleNav(currentIndex + 1)}
              disabled={currentIndex >= navItems.length - 1}
              className="appearance-none flex items-center justify-center w-10 h-10 rounded-full border-none outline-none bg-[var(--color-black-5)] cursor-pointer text-[var(--ink)] hover:bg-[var(--color-black-10)] disabled:opacity-40 disabled:pointer-events-none transition-all"
              aria-label="Next step"
            >
              <ArrowRightIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function LabPage({ content }: Props) {
  if (content.labType === "code") return <CodeLabPage content={content} />;
  if (content.labType === "simulation") return <SimLabPage content={content} />;
  return <LabPageStandard content={content} />;
}
