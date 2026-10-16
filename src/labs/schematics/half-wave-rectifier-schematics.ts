import {
  type SchematicData,
  type SchematicElement,
} from "@/labs/CircuitSchematic";

/*
 * Half-Wave Rectifier — progressive 2D schematics.
 *
 * AC ~ ── D1 ──┬── R_L ──┐
 *              │         │
 *             [C1]       │  (C1 added later)
 *              │         │
 * GND ─────────┴─────────┘
 *
 * Voltmeter (DMM) across R_L.
 */

const W = 300;
const H = 220;

// ── Positions ─────────────────────────────────────────────────
const AC = { x: 30, y: 110 }; // AC source (vertical)
const D1 = { x: 120, y: 30 }; // diode (horizontal)
const RL = { x: 210, y: 110 }; // load resistor (vertical)
const C1 = { x: 150, y: 110 }; // filter capacitor (vertical)
const VM = { x: 270, y: 110 }; // voltmeter (vertical)
const GND1 = { x: 30, y: 190 }; // ground

// ── Wires ─────────────────────────────────────────────────────
const wireAcTop: SchematicElement = {
  type: "wire",
  id: "w_ac_top",
  points: [
    { x: 30, y: 80 },
    { x: 30, y: 30 },
    { x: 100, y: 30 },
  ],
};
const wireAcBot: SchematicElement = {
  type: "wire",
  id: "w_ac_bot",
  points: [
    { x: 30, y: 140 },
    { x: 30, y: 190 },
  ],
};
const wireD1RL: SchematicElement = {
  type: "wire",
  id: "w_d1_rl",
  points: [
    { x: 140, y: 30 },
    { x: 210, y: 30 },
    { x: 210, y: 86 },
  ],
};
const wireRLGnd: SchematicElement = {
  type: "wire",
  id: "w_rl_gnd",
  points: [
    { x: 210, y: 134 },
    { x: 210, y: 190 },
    { x: 30, y: 190 },
  ],
};
const wireC1Top: SchematicElement = {
  type: "wire",
  id: "w_c1_top",
  points: [
    { x: 150, y: 30 },
    { x: 150, y: 86 },
  ],
};
const wireC1Bot: SchematicElement = {
  type: "wire",
  id: "w_c1_bot",
  points: [
    { x: 150, y: 134 },
    { x: 150, y: 190 },
  ],
};
const wireVmTop: SchematicElement = {
  type: "wire",
  id: "w_vm_top",
  points: [
    { x: 270, y: 30 },
    { x: 270, y: 86 },
  ],
};
const wireVmBot: SchematicElement = {
  type: "wire",
  id: "w_vm_bot",
  points: [
    { x: 270, y: 134 },
    { x: 270, y: 190 },
  ],
};
const juncD1Out: SchematicElement = {
  type: "junction",
  id: "j_d1",
  x: 210,
  y: 30,
};
const juncGndRL: SchematicElement = {
  type: "junction",
  id: "j_gnd",
  x: 210,
  y: 190,
};
const juncTop2: SchematicElement = {
  type: "junction",
  id: "j_top2",
  x: 150,
  y: 30,
};
const juncBot2: SchematicElement = {
  type: "junction",
  id: "j_bot2",
  x: 150,
  y: 190,
};
const juncTop3: SchematicElement = {
  type: "junction",
  id: "j_top3",
  x: 270,
  y: 30,
};
const juncBot3: SchematicElement = {
  type: "junction",
  id: "j_bot3",
  x: 270,
  y: 190,
};

// ── Step 1: Breadboard ──────────────────────────────────────
export const step01: SchematicData = {
  width: W,
  height: H,
  elements: [
    { type: "label", id: "lbl_bb", x: 150, y: 110, text: "Place breadboard" },
  ],
};

// ── Step 2: AC source ───────────────────────────────────────
export const step02: SchematicData = {
  width: W,
  height: H,
  elements: [
    {
      type: "vsource",
      id: "AC",
      ...AC,
      label: "AC",
      value: "12 V pk",
      highlight: true,
    },
    wireAcBot,
    { type: "ground", id: "GND", ...GND1 },
  ],
};

// ── Step 3: Place diode D1 ──────────────────────────────────
export const step03: SchematicData = {
  width: W,
  height: H,
  elements: [
    { type: "vsource", id: "AC", ...AC, label: "AC", value: "12 V pk" },
    wireAcTop,
    wireAcBot,
    { type: "ground", id: "GND", ...GND1 },
    { type: "diode", id: "D1", ...D1, label: "D₁", highlight: true },
  ],
};

// ── Step 4: Wire source to D1 anode ─────────────────────────
export const step04: SchematicData = {
  width: W,
  height: H,
  elements: [
    { type: "vsource", id: "AC", ...AC, label: "AC", value: "12 V pk" },
    { ...wireAcTop, highlight: true },
    wireAcBot,
    { type: "ground", id: "GND", ...GND1 },
    { type: "diode", id: "D1", ...D1, label: "D₁" },
  ],
};

// ── Step 5: Place load resistor R_L ─────────────────────────
export const step05: SchematicData = {
  width: W,
  height: H,
  elements: [
    { type: "vsource", id: "AC", ...AC, label: "AC", value: "12 V pk" },
    wireAcTop,
    wireAcBot,
    { type: "ground", id: "GND", ...GND1 },
    { type: "diode", id: "D1", ...D1, label: "D₁" },
    wireD1RL,
    {
      type: "resistor",
      id: "RL",
      ...RL,
      rotation: 90,
      label: "R_L",
      value: "1 kΩ",
      highlight: true,
    },
  ],
};

// ── Step 6: Wire D1 cathode to R_L ─────────────────────────
export const step06: SchematicData = {
  width: W,
  height: H,
  elements: [
    { type: "vsource", id: "AC", ...AC, label: "AC", value: "12 V pk" },
    wireAcTop,
    wireAcBot,
    { type: "ground", id: "GND", ...GND1 },
    { type: "diode", id: "D1", ...D1, label: "D₁" },
    { ...wireD1RL, highlight: true },
    {
      type: "resistor",
      id: "RL",
      ...RL,
      rotation: 90,
      label: "R_L",
      value: "1 kΩ",
    },
  ],
};

// ── Step 7: Return R_L to ground ────────────────────────────
export const step07: SchematicData = {
  width: W,
  height: H,
  elements: [
    { type: "vsource", id: "AC", ...AC, label: "AC", value: "12 V pk" },
    wireAcTop,
    wireAcBot,
    { type: "ground", id: "GND", ...GND1 },
    { type: "diode", id: "D1", ...D1, label: "D₁" },
    wireD1RL,
    {
      type: "resistor",
      id: "RL",
      ...RL,
      rotation: 90,
      label: "R_L",
      value: "1 kΩ",
    },
    { ...wireRLGnd, highlight: true },
  ],
};

// ── Step 8: Connect voltmeter ───────────────────────────────
export const step08: SchematicData = {
  width: W,
  height: H,
  elements: [
    { type: "vsource", id: "AC", ...AC, label: "AC", value: "12 V pk" },
    wireAcTop,
    wireAcBot,
    { type: "ground", id: "GND", ...GND1 },
    { type: "diode", id: "D1", ...D1, label: "D₁" },
    wireD1RL,
    {
      type: "resistor",
      id: "RL",
      ...RL,
      rotation: 90,
      label: "R_L",
      value: "1 kΩ",
    },
    wireRLGnd,
    juncD1Out,
    juncGndRL,
    juncTop3,
    juncBot3,
    { ...wireVmTop, highlight: true },
    { type: "voltmeter", id: "VM", ...VM, label: "Vdc", highlight: true },
    { ...wireVmBot, highlight: true },
    {
      type: "wire",
      id: "w_top_ext",
      points: [
        { x: 210, y: 30 },
        { x: 270, y: 30 },
      ],
    },
    {
      type: "wire",
      id: "w_bot_ext",
      points: [
        { x: 210, y: 190 },
        { x: 270, y: 190 },
      ],
    },
    {
      type: "label",
      id: "lbl_vdc",
      x: 150,
      y: 208,
      text: "Vdc ≈ Vm/π ≈ 3.82 V",
    },
  ],
};

// ── Step 9: Add filter capacitor C1 ─────────────────────────
export const step09: SchematicData = {
  width: W,
  height: H,
  elements: [
    { type: "vsource", id: "AC", ...AC, label: "AC", value: "12 V pk" },
    wireAcTop,
    wireAcBot,
    { type: "ground", id: "GND", ...GND1 },
    { type: "diode", id: "D1", ...D1, label: "D₁" },
    wireD1RL,
    {
      type: "resistor",
      id: "RL",
      ...RL,
      rotation: 90,
      label: "R_L",
      value: "1 kΩ",
    },
    wireRLGnd,
    juncD1Out,
    juncGndRL,
    juncTop2,
    juncBot2,
    juncTop3,
    juncBot3,
    { ...wireC1Top, highlight: true },
    {
      type: "capacitor",
      id: "C1",
      ...C1,
      rotation: 90,
      label: "C₁",
      value: "100 µF",
      highlight: true,
    },
    { ...wireC1Bot, highlight: true },
    wireVmTop,
    { type: "voltmeter", id: "VM", ...VM, label: "Vdc" },
    wireVmBot,
    {
      type: "wire",
      id: "w_top_ext",
      points: [
        { x: 140, y: 30 },
        { x: 270, y: 30 },
      ],
    },
    {
      type: "wire",
      id: "w_bot_ext",
      points: [
        { x: 150, y: 190 },
        { x: 270, y: 190 },
      ],
    },
    {
      type: "label",
      id: "lbl_filt",
      x: 150,
      y: 208,
      text: "Filtered: Vdc ≈ Vm (ripple reduced)",
    },
  ],
};

export const halfWaveStepSchematics: SchematicData[] = [
  step01,
  step02,
  step03,
  step04,
  step05,
  step06,
  step07,
  step08,
  step09,
];
