import {
  type SchematicData,
  type SchematicElement,
} from "@/labs/CircuitSchematic";

/*
 * Ohm's Law Verification — progressive 2D schematics.
 *
 * Circuit: V1 ──[A]── R₁ ──┬── GND
 *                           │
 *                          [V]
 *                           │
 *                          GND
 *
 * Simple series circuit: voltage source, ammeter, resistor, ground.
 * Voltmeter across the resistor.
 */

const W = 280;
const H = 200;

// ── Shared positions ──────────────────────────────────────────
const V1 = { x: 40, y: 100 }; // vsource (vertical)
const AMM = { x: 110, y: 30 }; // ammeter (horizontal)
const R1 = { x: 190, y: 30 }; // resistor (horizontal)
const VM = { x: 190, y: 110 }; // voltmeter (vertical)
const GND = { x: 40, y: 170 }; // ground

// ── Reusable wires ────────────────────────────────────────────
const wireV1top: SchematicElement = {
  type: "wire",
  id: "w_v1_top",
  points: [
    { x: 40, y: 70 },
    { x: 40, y: 30 },
    { x: 86, y: 30 },
  ],
};
const wireV1bot: SchematicElement = {
  type: "wire",
  id: "w_v1_bot",
  points: [
    { x: 40, y: 130 },
    { x: 40, y: 170 },
  ],
};
const wireAmmR1: SchematicElement = {
  type: "wire",
  id: "w_amm_r1",
  points: [
    { x: 134, y: 30 },
    { x: 160, y: 30 },
  ],
};
const wireR1Gnd: SchematicElement = {
  type: "wire",
  id: "w_r1_gnd",
  points: [
    { x: 220, y: 30 },
    { x: 240, y: 30 },
    { x: 240, y: 170 },
    { x: 40, y: 170 },
  ],
};
const wireVmTop: SchematicElement = {
  type: "wire",
  id: "w_vm_top",
  points: [
    { x: 190, y: 30 },
    { x: 190, y: 86 },
  ],
};
const wireVmBot: SchematicElement = {
  type: "wire",
  id: "w_vm_bot",
  points: [
    { x: 190, y: 134 },
    { x: 190, y: 170 },
  ],
};
const juncR1: SchematicElement = {
  type: "junction",
  id: "j_r1",
  x: 190,
  y: 30,
};
const juncGnd: SchematicElement = {
  type: "junction",
  id: "j_gnd",
  x: 190,
  y: 170,
};

// ── Step 1: Breadboard setup — just show supply ───────────────
export const step01: SchematicData = {
  width: W,
  height: H,
  elements: [
    {
      type: "vsource",
      id: "V1",
      ...V1,
      label: "Vs",
      value: "0–10 V",
      highlight: true,
    },
    wireV1bot,
    { type: "ground", id: "GND", ...GND },
  ],
};

// ── Step 2: Insert resistor + ammeter in series ───────────────
export const step02: SchematicData = {
  width: W,
  height: H,
  elements: [
    { type: "vsource", id: "V1", ...V1, label: "Vs", value: "0–10 V" },
    wireV1top,
    wireV1bot,
    { type: "ground", id: "GND", ...GND },
    {
      type: "ammeter",
      id: "AMM",
      ...AMM,
      rotation: 90,
      label: "mA",
      highlight: true,
    },
    wireAmmR1,
    {
      type: "resistor",
      id: "R1",
      ...R1,
      label: "R₁",
      value: "1 kΩ",
      highlight: true,
    },
    wireR1Gnd,
  ],
};

// ── Step 3: Connect voltmeter across R1 ───────────────────────
export const step03: SchematicData = {
  width: W,
  height: H,
  elements: [
    { type: "vsource", id: "V1", ...V1, label: "Vs", value: "0–10 V" },
    wireV1top,
    wireV1bot,
    { type: "ground", id: "GND", ...GND },
    { type: "ammeter", id: "AMM", ...AMM, rotation: 90, label: "mA" },
    wireAmmR1,
    { type: "resistor", id: "R1", ...R1, label: "R₁", value: "1 kΩ" },
    wireR1Gnd,
    juncR1,
    juncGnd,
    { ...wireVmTop, highlight: true },
    { type: "voltmeter", id: "VM", ...VM, label: "V", highlight: true },
    { ...wireVmBot, highlight: true },
  ],
};

// ── Base elements for steps 4–7 (complete circuit) ────────────
const baseFull: SchematicElement[] = [
  { type: "vsource", id: "V1", ...V1, label: "Vs" },
  wireV1top,
  wireV1bot,
  { type: "ground", id: "GND", ...GND },
  { type: "ammeter", id: "AMM", ...AMM, rotation: 90, label: "mA" },
  wireAmmR1,
  { type: "resistor", id: "R1", ...R1, label: "R₁", value: "1 kΩ" },
  wireR1Gnd,
  juncR1,
  juncGnd,
  wireVmTop,
  { type: "voltmeter", id: "VM", ...VM, label: "V" },
  wireVmBot,
];

// ── Step 4: Zero reading (0 V) ───────────────────────────────
export const step04: SchematicData = {
  width: W,
  height: H,
  elements: [
    ...baseFull.map((el) =>
      el.id === "V1" ? { ...el, value: "0 V", highlight: true } : el,
    ),
    {
      type: "label",
      id: "lbl_zero",
      x: 140,
      y: 188,
      text: "Confirm: V = 0, I = 0",
    },
  ],
};

// ── Step 5: Vary voltage 1–10 V ──────────────────────────────
export const step05: SchematicData = {
  width: W,
  height: H,
  elements: [
    ...baseFull.map((el) =>
      el.id === "V1" ? { ...el, value: "1 → 10 V", highlight: true } : el,
    ),
    {
      type: "label",
      id: "lbl_sweep",
      x: 140,
      y: 188,
      text: "Sweep Vs: 1 → 10 V in 1 V steps",
    },
  ],
};

// ── Step 6: Repeat with second resistor ──────────────────────
export const step06: SchematicData = {
  width: W,
  height: H,
  elements: [
    ...baseFull.map((el) => {
      if (el.id === "R1") return { ...el, value: "2.2 kΩ", highlight: true };
      if (el.id === "V1") return { ...el, value: "1 → 10 V" };
      return el;
    }),
    {
      type: "label",
      id: "lbl_r2",
      x: 140,
      y: 188,
      text: "R₁ replaced with 2.2 kΩ — repeat sweep",
    },
  ],
};

// ── Step 7: Plot graph ───────────────────────────────────────
export const step07: SchematicData = {
  width: W,
  height: H,
  elements: [
    ...baseFull.map((el) =>
      el.id === "V1" ? { ...el, value: "1 → 10 V" } : el,
    ),
    {
      type: "label",
      id: "lbl_graph",
      x: 140,
      y: 188,
      text: "Plot V vs I — slope = R",
    },
  ],
};

/** Indexed array for easy lookup */
export const ohmsLawStepSchematics: SchematicData[] = [
  step01,
  step02,
  step03,
  step04,
  step05,
  step06,
  step07,
];
