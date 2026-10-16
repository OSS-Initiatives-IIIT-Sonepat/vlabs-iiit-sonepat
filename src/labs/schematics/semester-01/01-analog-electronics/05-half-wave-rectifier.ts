import { type SchematicData, type SchematicElement } from "@/labs/CircuitSchematic";

/*
 * Half-Wave Rectifier — progressive 2D schematics.
 *
 * AC ~ ── D1 ──┬───────┬───────┐
 * │           [C1]    R_L     [V]   (C1 added last)
 * └──GND──────┴───────┴───────┘
 *
 * Voltmeter (DMM) across R_L.
 */

const W = 350;
const H = 230;

// ── Positions ─────────────────────────────────────────────────
const AC   = { x: 50,  y: 110 };  // AC source (vertical)
const D1   = { x: 120, y: 40  };  // diode (horizontal)
const C1   = { x: 180, y: 120 };  // filter capacitor (vertical)
const RL   = { x: 250, y: 120 };  // load resistor (vertical)
const VM   = { x: 310, y: 120 };  // voltmeter (vertical)
const GND1 = { x: 50,  y: 200 };  // ground

// ── Wires ─────────────────────────────────────────────────────
const wireAcTop: SchematicElement  = { type: "wire", id: "w_ac_top",  points: [{ x: 50, y: 80 }, { x: 50, y: 40 }, { x: 100, y: 40 }] };
const wireAcBot: SchematicElement  = { type: "wire", id: "w_ac_bot",  points: [{ x: 50, y: 140 }, { x: 50, y: 200 }] };
const wireD1RL: SchematicElement   = { type: "wire", id: "w_d1_rl",   points: [{ x: 140, y: 40 }, { x: 250, y: 40 }, { x: 250, y: 90 }] };
const wireRLGnd: SchematicElement  = { type: "wire", id: "w_rl_gnd",  points: [{ x: 250, y: 150 }, { x: 250, y: 200 }, { x: 50, y: 200 }] };
const wireC1Top: SchematicElement  = { type: "wire", id: "w_c1_top",  points: [{ x: 180, y: 40 }, { x: 180, y: 100 }] };
const wireC1Bot: SchematicElement  = { type: "wire", id: "w_c1_bot",  points: [{ x: 180, y: 140 }, { x: 180, y: 200 }] };
const wireVmTop: SchematicElement  = { type: "wire", id: "w_vm_top",  points: [{ x: 250, y: 40 }, { x: 310, y: 40 }, { x: 310, y: 96 }] };
const wireVmBot: SchematicElement  = { type: "wire", id: "w_vm_bot",  points: [{ x: 310, y: 144 }, { x: 310, y: 200 }, { x: 250, y: 200 }] };
const juncAcGnd: SchematicElement  = { type: "junction", id: "j_ac_gnd", x: 50,  y: 200 };
const juncTopRL: SchematicElement  = { type: "junction", id: "j_top_rl", x: 250, y: 40 };
const juncBotRL: SchematicElement  = { type: "junction", id: "j_bot_rl", x: 250, y: 200 };
const juncTopC1: SchematicElement  = { type: "junction", id: "j_top_c1", x: 180, y: 40 };
const juncBotC1: SchematicElement  = { type: "junction", id: "j_bot_c1", x: 180, y: 200 };

const acSource = (highlight?: boolean): SchematicElement =>
  ({ type: "acsource", id: "AC", ...AC, label: "AC", value: "12 V pk", highlight });

// ── Step 1: Breadboard ──────────────────────────────────────
export const step01: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "lbl_bb", x: 175, y: 115, text: "Place breadboard" },
]};

// ── Step 2: AC source ───────────────────────────────────────
export const step02: SchematicData = { width: W, height: H, elements: [
  acSource(true),
  wireAcBot,
  { type: "ground", id: "GND", ...GND1 },
]};

// ── Step 3: Place diode D1 ──────────────────────────────────
export const step03: SchematicData = { width: W, height: H, elements: [
  acSource(),
  wireAcBot,
  { type: "ground", id: "GND", ...GND1 },
  { type: "diode", id: "D1", ...D1, label: "D₁", highlight: true },
]};

// ── Step 4: Wire source to D1 anode ─────────────────────────
export const step04: SchematicData = { width: W, height: H, elements: [
  acSource(),
  { ...wireAcTop, highlight: true },
  wireAcBot,
  { type: "ground", id: "GND", ...GND1 },
  { type: "diode", id: "D1", ...D1, label: "D₁" },
]};

// ── Step 5: Place load resistor R_L ─────────────────────────
export const step05: SchematicData = { width: W, height: H, elements: [
  acSource(),
  wireAcTop,
  wireAcBot,
  { type: "ground", id: "GND", ...GND1 },
  { type: "diode", id: "D1", ...D1, label: "D₁" },
  { type: "resistor", id: "RL", ...RL, rotation: 90, label: "R_L", value: "1 kΩ", highlight: true },
]};

// ── Step 6: Wire D1 cathode to R_L ─────────────────────────
export const step06: SchematicData = { width: W, height: H, elements: [
  acSource(),
  wireAcTop,
  wireAcBot,
  { type: "ground", id: "GND", ...GND1 },
  { type: "diode", id: "D1", ...D1, label: "D₁" },
  { ...wireD1RL, highlight: true },
  { type: "resistor", id: "RL", ...RL, rotation: 90, label: "R_L", value: "1 kΩ" },
]};

// ── Step 7: Return R_L to ground ────────────────────────────
export const step07: SchematicData = { width: W, height: H, elements: [
  acSource(),
  wireAcTop,
  wireAcBot,
  { type: "ground", id: "GND", ...GND1 },
  { type: "diode", id: "D1", ...D1, label: "D₁" },
  wireD1RL,
  { type: "resistor", id: "RL", ...RL, rotation: 90, label: "R_L", value: "1 kΩ" },
  { ...wireRLGnd, highlight: true },
  juncAcGnd,
]};

// ── Step 8: Connect voltmeter ───────────────────────────────
export const step08: SchematicData = { width: W, height: H, elements: [
  acSource(),
  wireAcTop,
  wireAcBot,
  { type: "ground", id: "GND", ...GND1 },
  { type: "diode", id: "D1", ...D1, label: "D₁" },
  wireD1RL,
  { type: "resistor", id: "RL", ...RL, rotation: 90, label: "R_L", value: "1 kΩ" },
  wireRLGnd,
  juncAcGnd,
  juncTopRL,
  juncBotRL,
  { ...wireVmTop, highlight: true },
  { type: "voltmeter", id: "VM", ...VM, label: "Vdc", highlight: true },
  { ...wireVmBot, highlight: true },
  { type: "label", id: "lbl_vdc", x: 175, y: 224, text: "Vdc ≈ Vm/π ≈ 3.82 V" },
]};

// ── Step 9: Add filter capacitor C1 ─────────────────────────
export const step09: SchematicData = { width: W, height: H, elements: [
  acSource(),
  wireAcTop,
  wireAcBot,
  { type: "ground", id: "GND", ...GND1 },
  { type: "diode", id: "D1", ...D1, label: "D₁" },
  wireD1RL,
  { type: "resistor", id: "RL", ...RL, rotation: 90, label: "R_L", value: "1 kΩ" },
  wireRLGnd,
  juncAcGnd,
  juncTopRL,
  juncBotRL,
  juncTopC1,
  juncBotC1,
  { ...wireC1Top, highlight: true },
  { type: "capacitor", id: "C1", ...C1, rotation: 90, label: "C₁", value: "100 µF", highlight: true },
  { ...wireC1Bot, highlight: true },
  wireVmTop,
  { type: "voltmeter", id: "VM", ...VM, label: "Vdc" },
  wireVmBot,
  { type: "label", id: "lbl_filt", x: 175, y: 224, text: "Filtered: Vdc ≈ Vm (ripple reduced)" },
]};

export const halfWaveStepSchematics: SchematicData[] = [
  step01, step02, step03, step04, step05, step06, step07, step08, step09,
];
