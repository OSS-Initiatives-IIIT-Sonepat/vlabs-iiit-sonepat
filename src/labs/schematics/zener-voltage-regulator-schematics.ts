import {
  type SchematicData,
  type SchematicElement,
} from "@/labs/CircuitSchematic";

/*
 * Zener Diode Voltage Regulator — progressive 2D schematics.
 *
 * Each step adds elements on top of the previous step.
 * Newly-added elements carry `highlight: true`.
 *
 * Layout (world-space coords, GRID=10):
 *
 *   V1 ── Rs ──┬── DZ (rev) ──┐
 *              │              │
 *              ├── RL1 ──┐    │
 *              │         │    │
 *              ├── [VM]  │    │
 *              │    │    │    │
 *   GND ───────┴────┴────┴────┘
 *
 * For step 10, RL2 is added in parallel with RL1.
 */

const W = 340;
const H = 260;

// ── Shared positions ──────────────────────────────────────────
const V1 = { x: 30, y: 130 }; // vsource center (vertical)
const RS = { x: 110, y: 30 }; // series resistor (horizontal)
const NODE = { x: 180, y: 30 }; // output node junction
const DZ = { x: 180, y: 110 }; // zener diode (vertical, reversed — cathode up)
const RL1 = { x: 250, y: 110 }; // load resistor 1 (vertical)
const RL2 = { x: 310, y: 110 }; // load resistor 2 (vertical, parallel)
const VM = { x: 110, y: 150 }; // voltmeter (vertical)
const GND1 = { x: 30, y: 230 }; // ground symbol (under V1)

// ── Reusable wire segments ────────────────────────────────────

// V1 top → Rs left
const wireV1top: SchematicElement = {
  type: "wire",
  id: "w_v1_top",
  points: [
    { x: 30, y: 100 },
    { x: 30, y: 30 },
    { x: 80, y: 30 },
  ],
};
// V1 bottom → GND
const wireV1bot: SchematicElement = {
  type: "wire",
  id: "w_v1_bot",
  points: [
    { x: 30, y: 160 },
    { x: 30, y: 230 },
  ],
};
// Rs right → output node
const wireRsNode: SchematicElement = {
  type: "wire",
  id: "w_rs_node",
  points: [
    { x: 140, y: 30 },
    { x: 180, y: 30 },
  ],
};
// Output node → DZ cathode (vertical down)
const wireNodeDz: SchematicElement = {
  type: "wire",
  id: "w_node_dz",
  points: [
    { x: 180, y: 30 },
    { x: 180, y: 86 },
  ],
};
// DZ anode → GND rail
const wireDzGnd: SchematicElement = {
  type: "wire",
  id: "w_dz_gnd",
  points: [
    { x: 180, y: 134 },
    { x: 180, y: 230 },
    { x: 30, y: 230 },
  ],
};
// Output node → RL1 top
const wireNodeRl1: SchematicElement = {
  type: "wire",
  id: "w_node_rl1",
  points: [
    { x: 180, y: 30 },
    { x: 250, y: 30 },
    { x: 250, y: 86 },
  ],
};
// RL1 bottom → GND rail
const wireRl1Gnd: SchematicElement = {
  type: "wire",
  id: "w_rl1_gnd",
  points: [
    { x: 250, y: 134 },
    { x: 250, y: 230 },
    { x: 180, y: 230 },
  ],
};
// VM top → output node
const wireVmTop: SchematicElement = {
  type: "wire",
  id: "w_vm_top",
  points: [
    { x: 110, y: 30 },
    { x: 110, y: 126 },
  ],
};
// VM bottom → GND rail
const wireVmBot: SchematicElement = {
  type: "wire",
  id: "w_vm_bot",
  points: [
    { x: 110, y: 174 },
    { x: 110, y: 230 },
    { x: 30, y: 230 },
  ],
};
// Output node → RL2 top (parallel load)
const wireNodeRl2: SchematicElement = {
  type: "wire",
  id: "w_node_rl2",
  points: [
    { x: 250, y: 30 },
    { x: 310, y: 30 },
    { x: 310, y: 86 },
  ],
};
// RL2 bottom → GND rail
const wireRl2Gnd: SchematicElement = {
  type: "wire",
  id: "w_rl2_gnd",
  points: [
    { x: 310, y: 134 },
    { x: 310, y: 230 },
    { x: 250, y: 230 },
  ],
};

// Junctions
const juncNode: SchematicElement = {
  type: "junction",
  id: "j_node",
  x: 180,
  y: 30,
};
const juncGndDz: SchematicElement = {
  type: "junction",
  id: "j_gnd_dz",
  x: 180,
  y: 230,
};
const juncRs: SchematicElement = {
  type: "junction",
  id: "j_rs",
  x: 110,
  y: 30,
};
const juncGndVm: SchematicElement = {
  type: "junction",
  id: "j_gnd_vm",
  x: 110,
  y: 230,
};
const juncNodeRl1: SchematicElement = {
  type: "junction",
  id: "j_node_rl1",
  x: 250,
  y: 30,
};
const juncGndRl1: SchematicElement = {
  type: "junction",
  id: "j_gnd_rl1",
  x: 250,
  y: 230,
};

// ── Per-step element lists (cumulative) ───────────────────────

/** Step 1: Place breadboard + DC supply → V1 + GND */
export const step01: SchematicData = {
  width: W,
  height: H,
  elements: [
    {
      type: "vsource",
      id: "V1",
      ...V1,
      label: "Vᵢₙ",
      value: "0–12 V",
      highlight: true,
    },
    wireV1bot,
    { type: "ground", id: "GND", ...GND1 },
  ],
};

/** Step 2: Mount series resistor Rs */
export const step02: SchematicData = {
  width: W,
  height: H,
  elements: [
    { type: "vsource", id: "V1", ...V1, label: "Vᵢₙ", value: "0–12 V" },
    wireV1top,
    wireV1bot,
    { type: "ground", id: "GND", ...GND1 },
    // NEW
    {
      type: "resistor",
      id: "RS",
      ...RS,
      label: "Rs",
      value: "330 Ω",
      highlight: true,
    },
  ],
};

/** Step 3: Connect Zener diode in reverse bias */
export const step03: SchematicData = {
  width: W,
  height: H,
  elements: [
    { type: "vsource", id: "V1", ...V1, label: "Vᵢₙ", value: "0–12 V" },
    wireV1top,
    wireV1bot,
    { type: "ground", id: "GND", ...GND1 },
    { type: "resistor", id: "RS", ...RS, label: "Rs", value: "330 Ω" },
    wireRsNode,
    // NEW — reverse biased: cathode up (rotation 270 = cathode toward top)
    wireNodeDz,
    {
      type: "zener",
      id: "DZ",
      ...DZ,
      rotation: 270,
      label: "Dz",
      value: "5.1 V",
      highlight: true,
    },
    { ...wireDzGnd, highlight: true },
    juncGndDz,
  ],
};

/** Step 4: Connect load resistor RL1 */
export const step04: SchematicData = {
  width: W,
  height: H,
  elements: [
    { type: "vsource", id: "V1", ...V1, label: "Vᵢₙ", value: "0–12 V" },
    wireV1top,
    wireV1bot,
    { type: "ground", id: "GND", ...GND1 },
    { type: "resistor", id: "RS", ...RS, label: "Rs", value: "330 Ω" },
    wireRsNode,
    wireNodeDz,
    {
      type: "zener",
      id: "DZ",
      ...DZ,
      rotation: 270,
      label: "Dz",
      value: "5.1 V",
    },
    wireDzGnd,
    juncNode,
    juncGndDz,
    // NEW
    { ...wireNodeRl1, highlight: true },
    {
      type: "resistor",
      id: "RL1",
      ...RL1,
      rotation: 90,
      label: "RL₁",
      value: "1 kΩ",
      highlight: true,
    },
    { ...wireRl1Gnd, highlight: true },
    juncGndRl1,
  ],
};

/** Step 5: Connect multimeter (voltmeter) across output */
export const step05: SchematicData = {
  width: W,
  height: H,
  elements: [
    { type: "vsource", id: "V1", ...V1, label: "Vᵢₙ", value: "0–12 V" },
    wireV1top,
    wireV1bot,
    { type: "ground", id: "GND", ...GND1 },
    { type: "resistor", id: "RS", ...RS, label: "Rs", value: "330 Ω" },
    wireRsNode,
    wireNodeDz,
    {
      type: "zener",
      id: "DZ",
      ...DZ,
      rotation: 270,
      label: "Dz",
      value: "5.1 V",
    },
    wireDzGnd,
    juncNode,
    juncGndDz,
    wireNodeRl1,
    {
      type: "resistor",
      id: "RL1",
      ...RL1,
      rotation: 90,
      label: "RL₁",
      value: "1 kΩ",
    },
    wireRl1Gnd,
    juncGndRl1,
    juncRs,
    juncGndVm,
    // NEW
    { ...wireVmTop, highlight: true },
    { type: "voltmeter", id: "VM", ...VM, label: "Vₒᵤₜ", highlight: true },
    { ...wireVmBot, highlight: true },
  ],
};

// ── Base elements for steps 6-9 (full circuit, line regulation) ──
const baseLineReg: SchematicElement[] = [
  { type: "vsource", id: "V1", ...V1, label: "Vᵢₙ" },
  wireV1top,
  wireV1bot,
  { type: "ground", id: "GND", ...GND1 },
  { type: "resistor", id: "RS", ...RS, label: "Rs", value: "330 Ω" },
  wireRsNode,
  wireNodeDz,
  {
    type: "zener",
    id: "DZ",
    ...DZ,
    rotation: 270,
    label: "Dz",
    value: "5.1 V",
  },
  wireDzGnd,
  juncNode,
  juncGndDz,
  wireNodeRl1,
  {
    type: "resistor",
    id: "RL1",
    ...RL1,
    rotation: 90,
    label: "RL₁",
    value: "1 kΩ",
  },
  wireRl1Gnd,
  juncGndRl1,
  juncRs,
  juncGndVm,
  wireVmTop,
  { type: "voltmeter", id: "VM", ...VM, label: "Vₒᵤₜ" },
  wireVmBot,
];

/** Step 6: Line regulation — Vin = 6 V (below breakdown) */
export const step06: SchematicData = {
  width: W,
  height: H,
  elements: [
    ...baseLineReg.map((el) =>
      el.id === "V1" ? { ...el, value: "6 V", highlight: true } : el,
    ),
    {
      type: "label",
      id: "lbl_vout",
      x: 170,
      y: 248,
      text: "Vₒᵤₜ ≈ 4.51 V (not regulated)",
    },
  ],
};

/** Step 7: Line regulation — Vin = 8 V (in breakdown) */
export const step07: SchematicData = {
  width: W,
  height: H,
  elements: [
    ...baseLineReg.map((el) =>
      el.id === "V1" ? { ...el, value: "8 V", highlight: true } : el,
    ),
    {
      type: "label",
      id: "lbl_vout",
      x: 170,
      y: 248,
      text: "Vₒᵤₜ ≈ 5.10 V (regulated)",
    },
  ],
};

/** Step 8: Line regulation — Vin = 10 V */
export const step08: SchematicData = {
  width: W,
  height: H,
  elements: [
    ...baseLineReg.map((el) =>
      el.id === "V1" ? { ...el, value: "10 V", highlight: true } : el,
    ),
    {
      type: "label",
      id: "lbl_vout",
      x: 170,
      y: 248,
      text: "Vₒᵤₜ ≈ 5.10 V (regulated)",
    },
  ],
};

/** Step 9: Line regulation — Vin = 12 V */
export const step09: SchematicData = {
  width: W,
  height: H,
  elements: [
    ...baseLineReg.map((el) =>
      el.id === "V1" ? { ...el, value: "12 V", highlight: true } : el,
    ),
    {
      type: "label",
      id: "lbl_vout",
      x: 170,
      y: 248,
      text: "Vₒᵤₜ ≈ 5.10 V (regulated)",
    },
  ],
};

/** Step 10: Load regulation — RL2 in parallel (Vin = 10 V) */
export const step10: SchematicData = {
  width: W,
  height: H,
  elements: [
    ...baseLineReg.map((el) =>
      el.id === "V1" ? { ...el, value: "10 V" } : el,
    ),
    juncNodeRl1,
    // NEW — second load in parallel
    { ...wireNodeRl2, highlight: true },
    {
      type: "resistor",
      id: "RL2",
      ...RL2,
      rotation: 90,
      label: "RL₂",
      value: "1 kΩ",
      highlight: true,
    },
    { ...wireRl2Gnd, highlight: true },
    {
      type: "label",
      id: "lbl_vout",
      x: 170,
      y: 248,
      text: "RL = 1kΩ ∥ 1kΩ = 500Ω — Vₒᵤₜ ≈ 5.10 V",
    },
  ],
};

/** Indexed array for easy lookup from procedureStepIndex */
export const voltageRegulatorStepSchematics: SchematicData[] = [
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
