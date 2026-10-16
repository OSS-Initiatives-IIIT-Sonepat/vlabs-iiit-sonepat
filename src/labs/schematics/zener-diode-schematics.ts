import {
  type SchematicData,
  type SchematicElement,
} from "@/labs/CircuitSchematic";

/*
 * Zener Diode V-I Characteristics — progressive 2D schematics.
 *
 * Each step adds elements on top of the previous step.
 * Newly-added elements carry `highlight: true` so the student's
 * eye is drawn to what just changed.
 *
 * Layout (world-space coords, GRID=10):
 *
 *   V1 (left) ──[A]── R1 ──┬── D1 ──┐
 *     │                    [V]        │
 *     └────────── GND ───────────────┘
 */

const W = 300;
const H = 220;

// ── Shared positions ──────────────────────────────────────────
const V1 = { x: 40, y: 110 }; // vsource center (vertical)
const AMM = { x: 100, y: 40 }; // ammeter center (vertical, rotated to horizontal via 90)
const R1 = { x: 170, y: 40 }; // resistor center (horizontal)
const ZD = { x: 240, y: 40 }; // zener center (horizontal)
const VM = { x: 240, y: 130 }; // voltmeter center (vertical)
const GND = { x: 40, y: 190 }; // ground symbol

// ── Reusable wire segments ────────────────────────────────────
const wireV1top: SchematicElement = {
  type: "wire",
  id: "w_v1_top",
  points: [
    { x: 40, y: 80 },
    { x: 40, y: 40 },
    { x: 76, y: 40 },
  ],
};
const wireV1bot: SchematicElement = {
  type: "wire",
  id: "w_v1_bot",
  points: [
    { x: 40, y: 140 },
    { x: 40, y: 190 },
  ],
};
const wireAmmR1: SchematicElement = {
  type: "wire",
  id: "w_amm_r1",
  points: [
    { x: 124, y: 40 },
    { x: 140, y: 40 },
  ],
};
const wireR1Zd: SchematicElement = {
  type: "wire",
  id: "w_r1_zd",
  points: [
    { x: 200, y: 40 },
    { x: 220, y: 40 },
  ],
};
const wireZdDown: SchematicElement = {
  type: "wire",
  id: "w_zd_down",
  points: [
    { x: 260, y: 40 },
    { x: 270, y: 40 },
    { x: 270, y: 190 },
    { x: 40, y: 190 },
  ],
};
const wireVmTop: SchematicElement = {
  type: "wire",
  id: "w_vm_top",
  points: [
    { x: 240, y: 40 },
    { x: 240, y: 106 },
  ],
};
const wireVmBot: SchematicElement = {
  type: "wire",
  id: "w_vm_bot",
  points: [
    { x: 240, y: 154 },
    { x: 240, y: 190 },
  ],
};
const juncZdTop: SchematicElement = {
  type: "junction",
  id: "j_zd_top",
  x: 240,
  y: 40,
};
const juncGnd: SchematicElement = {
  type: "junction",
  id: "j_gnd",
  x: 240,
  y: 190,
};

// ── Per-step element lists (cumulative) ───────────────────────

/** Step 1: Place breadboard + DC supply → just show V1 + GND */
export const step01: SchematicData = {
  width: W,
  height: H,
  elements: [
    {
      type: "vsource",
      id: "V1",
      ...V1,
      label: "V₁",
      value: "0–15 V",
      highlight: true,
    },
    wireV1bot,
    { type: "ground", id: "GND", ...GND },
  ],
};

/** Step 2: Connect ammeter (DMM) in series */
export const step02: SchematicData = {
  width: W,
  height: H,
  elements: [
    { type: "vsource", id: "V1", ...V1, label: "V₁", value: "0–15 V" },
    wireV1top,
    wireV1bot,
    { type: "ground", id: "GND", ...GND },
    // NEW
    {
      type: "ammeter",
      id: "AMM",
      ...AMM,
      rotation: 90,
      label: "mA",
      highlight: true,
    },
  ],
};

/** Step 3: Insert 470 Ω resistor */
export const step03: SchematicData = {
  width: W,
  height: H,
  elements: [
    { type: "vsource", id: "V1", ...V1, label: "V₁", value: "0–15 V" },
    wireV1top,
    wireV1bot,
    { type: "ground", id: "GND", ...GND },
    { type: "ammeter", id: "AMM", ...AMM, rotation: 90, label: "mA" },
    wireAmmR1,
    // NEW
    {
      type: "resistor",
      id: "R1",
      ...R1,
      label: "R₁",
      value: "470 Ω",
      highlight: true,
    },
  ],
};

/** Step 4: Insert Zener (forward bias) — anode faces R1 */
export const step04: SchematicData = {
  width: W,
  height: H,
  elements: [
    { type: "vsource", id: "V1", ...V1, label: "V₁", value: "0–15 V" },
    wireV1top,
    wireV1bot,
    { type: "ground", id: "GND", ...GND },
    { type: "ammeter", id: "AMM", ...AMM, rotation: 90, label: "mA" },
    wireAmmR1,
    { type: "resistor", id: "R1", ...R1, label: "R₁", value: "470 Ω" },
    wireR1Zd,
    // NEW — forward: anode left (triangle tip right → default orientation)
    {
      type: "zener",
      id: "ZD",
      ...ZD,
      label: "D₁ (fwd)",
      value: "1N4733A",
      highlight: true,
    },
  ],
};

/** Step 5: Wire R1→anode, cathode→GND */
export const step05: SchematicData = {
  width: W,
  height: H,
  elements: [
    { type: "vsource", id: "V1", ...V1, label: "V₁", value: "0–15 V" },
    wireV1top,
    wireV1bot,
    { type: "ground", id: "GND", ...GND },
    { type: "ammeter", id: "AMM", ...AMM, rotation: 90, label: "mA" },
    wireAmmR1,
    { type: "resistor", id: "R1", ...R1, label: "R₁", value: "470 Ω" },
    wireR1Zd,
    { type: "zener", id: "ZD", ...ZD, label: "D₁ (fwd)", value: "1N4733A" },
    // NEW
    { ...wireZdDown, highlight: true },
  ],
};

/** Step 6: Connect voltmeter across forward Zener */
export const step06: SchematicData = {
  width: W,
  height: H,
  elements: [
    { type: "vsource", id: "V1", ...V1, label: "V₁", value: "0–15 V" },
    wireV1top,
    wireV1bot,
    { type: "ground", id: "GND", ...GND },
    { type: "ammeter", id: "AMM", ...AMM, rotation: 90, label: "mA" },
    wireAmmR1,
    { type: "resistor", id: "R1", ...R1, label: "R₁", value: "470 Ω" },
    wireR1Zd,
    { type: "zener", id: "ZD", ...ZD, label: "D₁ (fwd)", value: "1N4733A" },
    wireZdDown,
    juncZdTop,
    juncGnd,
    // NEW
    { ...wireVmTop, highlight: true },
    { type: "voltmeter", id: "VM", ...VM, label: "V_Z", highlight: true },
    { ...wireVmBot, highlight: true },
  ],
};

/** Step 7: Forward bias sweep 0→2 V (same circuit, active) */
export const step07: SchematicData = {
  width: W,
  height: H,
  elements: [
    {
      type: "vsource",
      id: "V1",
      ...V1,
      label: "V₁",
      value: "0 → 2 V",
      highlight: true,
    },
    wireV1top,
    wireV1bot,
    { type: "ground", id: "GND", ...GND },
    { type: "ammeter", id: "AMM", ...AMM, rotation: 90, label: "mA" },
    wireAmmR1,
    { type: "resistor", id: "R1", ...R1, label: "R₁", value: "470 Ω" },
    wireR1Zd,
    { type: "zener", id: "ZD", ...ZD, label: "D₁ (fwd)", value: "1N4733A" },
    wireZdDown,
    juncZdTop,
    juncGnd,
    wireVmTop,
    { type: "voltmeter", id: "VM", ...VM, label: "V_Z" },
    wireVmBot,
    {
      type: "label",
      id: "lbl_sweep",
      x: 150,
      y: 210,
      text: "Sweep V₁: 0 → 2 V in 0.1 V steps",
    },
  ],
};

/** Step 8: Reverse the Zener (cathode now faces R1) */
export const step08: SchematicData = {
  width: W,
  height: H,
  elements: [
    { type: "vsource", id: "V1", ...V1, label: "V₁", value: "0–15 V" },
    wireV1top,
    wireV1bot,
    { type: "ground", id: "GND", ...GND },
    { type: "ammeter", id: "AMM", ...AMM, rotation: 90, label: "mA" },
    wireAmmR1,
    { type: "resistor", id: "R1", ...R1, label: "R₁", value: "470 Ω" },
    wireR1Zd,
    // NEW — reversed: rotation 180 flips anode/cathode
    {
      type: "zener",
      id: "ZD",
      ...ZD,
      rotation: 180,
      label: "D₁ (rev)",
      value: "1N4733A",
      highlight: true,
    },
  ],
};

/** Step 9: Wire reverse path + voltmeter */
export const step09: SchematicData = {
  width: W,
  height: H,
  elements: [
    { type: "vsource", id: "V1", ...V1, label: "V₁", value: "0–15 V" },
    wireV1top,
    wireV1bot,
    { type: "ground", id: "GND", ...GND },
    { type: "ammeter", id: "AMM", ...AMM, rotation: 90, label: "mA" },
    wireAmmR1,
    { type: "resistor", id: "R1", ...R1, label: "R₁", value: "470 Ω" },
    wireR1Zd,
    {
      type: "zener",
      id: "ZD",
      ...ZD,
      rotation: 180,
      label: "D₁ (rev)",
      value: "1N4733A",
    },
    // NEW
    { ...wireZdDown, highlight: true },
    juncZdTop,
    juncGnd,
    { ...wireVmTop, highlight: true },
    { type: "voltmeter", id: "VM", ...VM, label: "V_Z", highlight: true },
    { ...wireVmBot, highlight: true },
  ],
};

/** Step 10: Reverse bias sweep 0→10 V (same circuit, active) */
export const step10: SchematicData = {
  width: W,
  height: H,
  elements: [
    {
      type: "vsource",
      id: "V1",
      ...V1,
      label: "V₁",
      value: "0 → 10 V",
      highlight: true,
    },
    wireV1top,
    wireV1bot,
    { type: "ground", id: "GND", ...GND },
    { type: "ammeter", id: "AMM", ...AMM, rotation: 90, label: "mA" },
    wireAmmR1,
    { type: "resistor", id: "R1", ...R1, label: "R₁", value: "470 Ω" },
    wireR1Zd,
    {
      type: "zener",
      id: "ZD",
      ...ZD,
      rotation: 180,
      label: "D₁ (rev)",
      value: "V_Z ≈ 5.1 V",
    },
    wireZdDown,
    juncZdTop,
    juncGnd,
    wireVmTop,
    { type: "voltmeter", id: "VM", ...VM, label: "V_Z" },
    wireVmBot,
    {
      type: "label",
      id: "lbl_sweep",
      x: 150,
      y: 210,
      text: "Sweep V₁: 0 → 10 V (0.1 V near V_Z)",
    },
  ],
};

/** Indexed array for easy lookup from procedureStepIndex */
export const zenerStepSchematics: SchematicData[] = [
  step01,
  step02,
  step03,
  step04,
  step05,
  step06,
  step07,
  step08,
  step09,
  step10,
];
