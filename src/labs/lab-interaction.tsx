"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { ComponentInstance } from "./types";
import type { SchematicElement } from "./CircuitSchematic";

// ── Shared hover / selection state between the 3D scene and 2D schematic ──

export type HoverSource = "2d" | "3d";
export type HoverState = { id: string; source: HoverSource } | null;

export type LabInteraction = {
  hovered: HoverState;
  hover: (id: string, source: HoverSource) => void;
  /** Clears the hover only if it was set by `source`. */
  unhover: (source: HoverSource) => void;
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
};

export function useLabInteractionState(): LabInteraction {
  const [hovered, setHovered] = useState<HoverState>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const hover = useCallback((id: string, source: HoverSource) => {
    setHovered((prev) =>
      prev?.id === id && prev.source === source ? prev : { id, source },
    );
  }, []);
  const unhover = useCallback((source: HoverSource) => {
    setHovered((prev) => (prev?.source === source ? null : prev));
  }, []);

  return useMemo(
    () => ({ hovered, hover, unhover, selectedId, setSelectedId }),
    [hovered, hover, unhover, selectedId],
  );
}

const LabInteractionContext = createContext<LabInteraction | null>(null);

export function LabInteractionProvider({
  value,
  children,
}: {
  value: LabInteraction;
  children: ReactNode;
}) {
  return (
    <LabInteractionContext.Provider value={value}>
      {children}
    </LabInteractionContext.Provider>
  );
}

/** Context value when inside a provider, otherwise isolated local state. */
export function useLabInteraction(): LabInteraction {
  const ctx = useContext(LabInteractionContext);
  const local = useLabInteractionState();
  return ctx ?? local;
}

// ── Human-readable component names ────────────────────────────────────────

export function formatOhms(ohms?: number | string): string {
  if (typeof ohms === "string") return ohms;
  const n = ohms ?? 1000;
  if (n >= 1_000_000) return `${+(n / 1_000_000).toFixed(2)} MΩ`;
  if (n >= 1000) return `${+(n / 1000).toFixed(2)} kΩ`;
  return `${n} Ω`;
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

const GATE_NAMES: Record<string, string> = {
  "and-gate": "AND Gate IC",
  "or-gate": "OR Gate IC",
  "not-gate": "NOT Gate IC",
  "nand-gate": "NAND Gate IC",
  "nor-gate": "NOR Gate IC",
  "xor-gate": "XOR Gate IC",
  "xnor-gate": "XNOR Gate IC",
  "buffer-gate": "Buffer IC",
};

export function componentDisplayName(inst: ComponentInstance): string {
  switch (inst.type) {
    case "breadboard":
    case "long-breadboard":
      return "Breadboard";
    case "dc-jack":
      return "DC Power Supply";
    case "battery":
      return "Battery";
    case "potentiometer":
      return "Multimeter";
    case "ammeter":
      return "Ammeter";
    case "voltmeter":
      return "Voltmeter";
    case "oscilloscope":
      return "Oscilloscope";
    case "function-generator":
      return "Function Generator";
    case "resistor":
      return `Resistor · ${formatOhms(inst.ohms)}`;
    case "capacitor":
      return `Capacitor · ${inst.capacitance} µF`;
    case "inductor":
      return `Inductor · ${+(inst.henrys * 1000).toFixed(2)} mH`;
    case "led":
      return `${capitalize(inst.color)} LED`;
    case "diode":
      return `Diode · ${inst.model ?? "1N4148"}`;
    case "zener":
      return `Zener Diode · ${inst.vz} V`;
    case "npn-bjt":
      return "NPN Transistor";
    case "pnp-bjt":
      return "PNP Transistor";
    case "n-mosfet":
      return "N-Channel MOSFET";
    case "p-mosfet":
      return "P-Channel MOSFET";
    case "op-amp":
      return "Op-Amp";
    case "wire":
      return `${capitalize(inst.color)} Jumper Wire`;
    case "transformer":
      return "Transformer";
    case "7seg-display":
      return "7-Segment Display";
    case "dip-switch":
      return "DIP Switch";
    case "push-button":
      return "Push Button";
    case "switch":
      return "Switch";
    case "logic-analyser":
      return "Logic Analyser";
    case "mcu-trainer":
      return "Microcontroller Trainer";
    default:
      return (
        GATE_NAMES[inst.type] ??
        inst.type
          .split("-")
          .map((p) => (/^\d/.test(p) ? p : capitalize(p)))
          .join(" ")
      );
  }
}

// ── 2D schematic element → 3D component id ────────────────────────────────

const SCHEMATIC_TO_3D: Partial<Record<SchematicElement["type"], string[]>> = {
  resistor: ["resistor"],
  capacitor: ["capacitor"],
  diode: ["diode"],
  zener: ["zener"],
  led: ["led"],
  vsource: ["dc-jack", "battery"],
  acsource: ["function-generator", "transformer"],
  ammeter: ["ammeter", "potentiometer"],
  voltmeter: ["voltmeter", "potentiometer"],
  probe: ["oscilloscope"],
  "npn-bjt": ["npn-bjt"],
  "pnp-bjt": ["pnp-bjt"],
  "n-mosfet": ["n-mosfet"],
  "p-mosfet": ["p-mosfet"],
  "op-amp": ["op-amp"],
  "and-gate": ["and-gate"],
  "or-gate": ["or-gate"],
  "not-gate": ["not-gate"],
  "nand-gate": ["nand-gate"],
  "nor-gate": ["nor-gate"],
  "xor-gate": ["xor-gate"],
  "xnor-gate": ["xnor-gate"],
};

/**
 * Finds the 3D component a schematic symbol stands for. An explicit `ref`
 * wins; otherwise a type-compatible component with the same id
 * (case-insensitive), preferring components visible in the current step.
 */
export function resolveSchematicRef(
  el: SchematicElement,
  components: ComponentInstance[],
  visibleIds?: ReadonlySet<string>,
): string | null {
  if (el.ref) return el.ref;
  const types = SCHEMATIC_TO_3D[el.type];
  if (!types) return null;

  const pool = components.filter((c) => types.includes(c.type));
  if (pool.length === 0) return null;
  const visible = visibleIds ? pool.filter((c) => visibleIds.has(c.id)) : [];
  const candidates = visible.length > 0 ? visible : pool;

  const elId = el.id.toLowerCase();
  const byId = candidates.find((c) => c.id.toLowerCase() === elId);
  if (byId) return byId.id;

  for (const t of types) {
    const match = candidates.find((c) => c.type === t);
    if (match) return match.id;
  }
  return null;
}
