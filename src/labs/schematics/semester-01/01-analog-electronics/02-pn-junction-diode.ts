import { type SchematicData, type SchematicElement } from "@/labs/CircuitSchematic";

/*
 * P-N Junction Diode V-I Characteristics — progressive 2D schematics.
 *
 * Each step adds elements on top of the previous step.
 * Newly-added elements carry `highlight: true` so the student's
 * eye is drawn to what just changed.
 *
 * Layout (world-space coords, GRID=10):
 *
 *   V1 ──[A]── R₁ ──┬──────┐
 *   │               D₁     [V]
 *   └──GND──────────┴──────┘
 */

const W = 370;
const H = 220;

// ── Shared positions ──────────────────────────────────────────
const V1   = { x: 60,  y: 110 }; // vsource center (vertical)
const AMM  = { x: 120, y: 40  }; // ammeter center (rotated to horizontal)
const R1   = { x: 190, y: 40  }; // resistor center (horizontal)
const D1   = { x: 250, y: 110 }; // diode center (vertical: 90 = forward, 270 = reverse)
const VM   = { x: 330, y: 110 }; // voltmeter center (vertical)
const GND  = { x: 60,  y: 190 }; // ground symbol

// ── Reusable wire segments ────────────────────────────────────
const wireV1top: SchematicElement    = { type: "wire", id: "w_v1_top",   points: [{ x: 60, y: 80 }, { x: 60, y: 40 }, { x: 96, y: 40 }] };
const wireV1bot: SchematicElement    = { type: "wire", id: "w_v1_bot",   points: [{ x: 60, y: 140 }, { x: 60, y: 190 }] };
const wireAmmR1: SchematicElement    = { type: "wire", id: "w_amm_r1",  points: [{ x: 144, y: 40 }, { x: 160, y: 40 }] };
const wireR1D1: SchematicElement     = { type: "wire", id: "w_r1_d1",   points: [{ x: 220, y: 40 }, { x: 250, y: 40 }, { x: 250, y: 90 }] };
const wireD1Down: SchematicElement   = { type: "wire", id: "w_d1_down",  points: [{ x: 250, y: 130 }, { x: 250, y: 190 }, { x: 60, y: 190 }] };
const wireVmTop: SchematicElement    = { type: "wire", id: "w_vm_top",   points: [{ x: 250, y: 40 }, { x: 330, y: 40 }, { x: 330, y: 86 }] };
const wireVmBot: SchematicElement    = { type: "wire", id: "w_vm_bot",   points: [{ x: 330, y: 134 }, { x: 330, y: 190 }, { x: 250, y: 190 }] };
const juncD1Top: SchematicElement    = { type: "junction", id: "j_d1_top", x: 250, y: 40 };
const juncGnd: SchematicElement      = { type: "junction", id: "j_gnd",    x: 250, y: 190 };
const juncV1Gnd: SchematicElement    = { type: "junction", id: "j_v1_gnd", x: 60,  y: 190 };

// ── Per-step element lists (cumulative) ───────────────────────

/** Step 1: Place breadboard + DC supply → just show V1 + GND */
export const step01: SchematicData = { width: W, height: H, elements: [
  { type: "vsource", id: "V1", ...V1, label: "V₁", value: "0–15 V", highlight: true },
  wireV1bot,
  { type: "ground", id: "GND", ...GND },
]};

/** Step 2: Connect milliammeter (DMM) in series */
export const step02: SchematicData = { width: W, height: H, elements: [
  { type: "vsource", id: "V1", ...V1, label: "V₁", value: "0–15 V" },
  wireV1top,
  wireV1bot,
  { type: "ground", id: "GND", ...GND },
  // NEW
  { type: "ammeter", id: "AMM", ...AMM, rotation: 90, label: "mA", highlight: true },
]};

/** Step 3: Insert 1 kΩ resistor */
export const step03: SchematicData = { width: W, height: H, elements: [
  { type: "vsource", id: "V1", ...V1, label: "V₁", value: "0–15 V" },
  wireV1top,
  wireV1bot,
  { type: "ground", id: "GND", ...GND },
  { type: "ammeter", id: "AMM", ...AMM, rotation: 90, label: "mA" },
  wireAmmR1,
  // NEW
  { type: "resistor", id: "R1", ...R1, label: "R₁", value: "1 kΩ", highlight: true },
]};

/** Step 4: Insert 1N4148 diode (forward bias) — anode faces R1 */
export const step04: SchematicData = { width: W, height: H, elements: [
  { type: "vsource", id: "V1", ...V1, label: "V₁", value: "0–15 V" },
  wireV1top,
  wireV1bot,
  { type: "ground", id: "GND", ...GND },
  { type: "ammeter", id: "AMM", ...AMM, rotation: 90, label: "mA" },
  wireAmmR1,
  { type: "resistor", id: "R1", ...R1, label: "R₁", value: "1 kΩ" },
  wireR1D1,
  // NEW — forward: anode on top, cathode to ground
  { type: "diode", id: "D1", ...D1, rotation: 90, label: "D₁ (fwd)", highlight: true },
]};

/** Step 5: Wire R₁→anode, cathode→GND */
export const step05: SchematicData = { width: W, height: H, elements: [
  { type: "vsource", id: "V1", ...V1, label: "V₁", value: "0–15 V" },
  wireV1top,
  wireV1bot,
  { type: "ground", id: "GND", ...GND },
  { type: "ammeter", id: "AMM", ...AMM, rotation: 90, label: "mA" },
  wireAmmR1,
  { type: "resistor", id: "R1", ...R1, label: "R₁", value: "1 kΩ" },
  wireR1D1,
  { type: "diode", id: "D1", ...D1, rotation: 90, label: "D₁ (fwd)" },
  // NEW
  { ...wireD1Down, highlight: true },
  juncV1Gnd,
]};

/** Step 6: Connect voltmeter across forward diode */
export const step06: SchematicData = { width: W, height: H, elements: [
  { type: "vsource", id: "V1", ...V1, label: "V₁", value: "0–15 V" },
  wireV1top,
  wireV1bot,
  { type: "ground", id: "GND", ...GND },
  { type: "ammeter", id: "AMM", ...AMM, rotation: 90, label: "mA" },
  wireAmmR1,
  { type: "resistor", id: "R1", ...R1, label: "R₁", value: "1 kΩ" },
  wireR1D1,
  { type: "diode", id: "D1", ...D1, rotation: 90, label: "D₁ (fwd)" },
  wireD1Down,
  juncD1Top,
  juncGnd,
  juncV1Gnd,
  // NEW
  { ...wireVmTop, highlight: true },
  { type: "voltmeter", id: "VM", ...VM, label: "V_D", highlight: true },
  { ...wireVmBot, highlight: true },
]};

/** Step 7: Forward bias sweep 0→1.5 V (same circuit, active) */
export const step07: SchematicData = { width: W, height: H, elements: [
  { type: "vsource", id: "V1", ...V1, label: "V₁", value: "0 → 1.5 V", highlight: true },
  wireV1top,
  wireV1bot,
  { type: "ground", id: "GND", ...GND },
  { type: "ammeter", id: "AMM", ...AMM, rotation: 90, label: "mA" },
  wireAmmR1,
  { type: "resistor", id: "R1", ...R1, label: "R₁", value: "1 kΩ" },
  wireR1D1,
  { type: "diode", id: "D1", ...D1, rotation: 90, label: "D₁ (fwd)" },
  wireD1Down,
  juncD1Top,
  juncGnd,
  juncV1Gnd,
  wireVmTop,
  { type: "voltmeter", id: "VM", ...VM, label: "V_D" },
  wireVmBot,
  { type: "label", id: "lbl_sweep", x: 185, y: 212, text: "Sweep V₁: 0 → 1.5 V in 0.1 V steps" },
]};

/** Step 8: Reverse the diode (cathode now faces R₁) */
export const step08: SchematicData = { width: W, height: H, elements: [
  { type: "vsource", id: "V1", ...V1, label: "V₁", value: "0–15 V" },
  wireV1top,
  wireV1bot,
  { type: "ground", id: "GND", ...GND },
  { type: "ammeter", id: "AMM", ...AMM, rotation: 90, label: "mA" },
  wireAmmR1,
  { type: "resistor", id: "R1", ...R1, label: "R₁", value: "1 kΩ" },
  wireR1D1,
  // NEW — reversed: rotation 180 flips anode/cathode
  { type: "diode", id: "D1", ...D1, rotation: 270, label: "D₁ (rev)", highlight: true },
]};

/** Step 9: Wire reverse path + voltmeter */
export const step09: SchematicData = { width: W, height: H, elements: [
  { type: "vsource", id: "V1", ...V1, label: "V₁", value: "0–15 V" },
  wireV1top,
  wireV1bot,
  { type: "ground", id: "GND", ...GND },
  { type: "ammeter", id: "AMM", ...AMM, rotation: 90, label: "mA" },
  wireAmmR1,
  { type: "resistor", id: "R1", ...R1, label: "R₁", value: "1 kΩ" },
  wireR1D1,
  { type: "diode", id: "D1", ...D1, rotation: 270, label: "D₁ (rev)" },
  // NEW
  { ...wireD1Down, highlight: true },
  juncD1Top,
  juncGnd,
  juncV1Gnd,
  { ...wireVmTop, highlight: true },
  { type: "voltmeter", id: "VM", ...VM, label: "V_D", highlight: true },
  { ...wireVmBot, highlight: true },
]};

/** Step 10: Reverse bias sweep 0→15 V (same circuit, active) */
export const step10: SchematicData = { width: W, height: H, elements: [
  { type: "vsource", id: "V1", ...V1, label: "V₁", value: "0 → 15 V", highlight: true },
  wireV1top,
  wireV1bot,
  { type: "ground", id: "GND", ...GND },
  { type: "ammeter", id: "AMM", ...AMM, rotation: 90, label: "mA" },
  wireAmmR1,
  { type: "resistor", id: "R1", ...R1, label: "R₁", value: "1 kΩ" },
  wireR1D1,
  { type: "diode", id: "D1", ...D1, rotation: 270, label: "D₁ (rev)" },
  wireD1Down,
  juncD1Top,
  juncGnd,
  juncV1Gnd,
  wireVmTop,
  { type: "voltmeter", id: "VM", ...VM, label: "V_D" },
  wireVmBot,
  { type: "label", id: "lbl_sweep", x: 185, y: 212, text: "Sweep V₁: 0 → 15 V in 1 V steps" },
]};

/** Indexed array for easy lookup from procedureStepIndex */
export const pnJunctionStepSchematics: SchematicData[] = [
  step01, step02, step03, step04, step05,
  step06, step07, step08, step09, step10,
];
