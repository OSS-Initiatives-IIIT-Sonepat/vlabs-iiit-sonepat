import { type SchematicData, type SchematicElement } from "@/labs/CircuitSchematic";

/*
 * Kirchhoff's Current & Voltage Laws — progressive 2D schematics.
 *
 * Two-source, three-resistor network:
 *
 *   V1 ── R1 ──┐
 *               ├── Node A ── R3 ── GND
 *   V2 ── R2 ──┘
 *
 * KCL at Node A: I1 + I2 = I3
 * KVL Loop 1: V1 - V_R1 - V_R3 = 0
 * KVL Loop 2: V2 - V_R2 - V_R3 = 0
 */

const W = 320;
const H = 260;

// ── Positions ─────────────────────────────────────────────────
const V1   = { x: 30,  y: 60  };  // vsource 1 (vertical)
const V2   = { x: 30,  y: 190 };  // vsource 2 (vertical)
const R1   = { x: 120, y: 30  };  // R1 (horizontal, top path)
const R2   = { x: 120, y: 230 };  // R2 (horizontal, bottom path)
const NODE = { x: 200, y: 130 };  // node A (center right)
const R3   = { x: 270, y: 130 };  // R3 (vertical, from node to GND)
const GND  = { x: 270, y: 230 };  // ground

// ── Wires ─────────────────────────────────────────────────────
const wireV1top: SchematicElement   = { type: "wire", id: "w_v1_top",  points: [{ x: 30, y: 30 }, { x: 90, y: 30 }] };
const wireV1bot: SchematicElement   = { type: "wire", id: "w_v1_bot",  points: [{ x: 30, y: 90 }, { x: 30, y: 130 }] };
const wireV2top: SchematicElement   = { type: "wire", id: "w_v2_top",  points: [{ x: 30, y: 160 }, { x: 30, y: 130 }] };
const wireV2bot: SchematicElement   = { type: "wire", id: "w_v2_bot",  points: [{ x: 30, y: 220 }, { x: 30, y: 230 }, { x: 90, y: 230 }] };
const wireR1Node: SchematicElement  = { type: "wire", id: "w_r1_node", points: [{ x: 150, y: 30 }, { x: 200, y: 30 }, { x: 200, y: 130 }] };
const wireR2Node: SchematicElement  = { type: "wire", id: "w_r2_node", points: [{ x: 150, y: 230 }, { x: 200, y: 230 }, { x: 200, y: 130 }] };
const wireNodeR3: SchematicElement  = { type: "wire", id: "w_node_r3", points: [{ x: 200, y: 130 }, { x: 270, y: 130 }] };
// Note: R3 is vertical. We need wire from R3 bottom to GND.
const wireR3top: SchematicElement   = { type: "wire", id: "w_r3_top",  points: [{ x: 200, y: 130 }, { x: 240, y: 130 }] };
const wireR3bot: SchematicElement   = { type: "wire", id: "w_r3_bot",  points: [{ x: 300, y: 130 }, { x: 300, y: 230 }, { x: 270, y: 230 }] };
const wireGndLine: SchematicElement = { type: "wire", id: "w_gnd_line", points: [{ x: 30, y: 130 }, { x: 30, y: 130 }] }; // dummy
const juncNode: SchematicElement    = { type: "junction", id: "j_node", x: 200, y: 130 };
const juncV1V2: SchematicElement    = { type: "junction", id: "j_v1v2", x: 30, y: 130 };

// Labels for node
const lblNodeA: SchematicElement = { type: "label", id: "lbl_node", x: 208, y: 118, text: "Node A" };

// ── Step 1: Build resistor network — show all 3 resistors + node ──
export const step01: SchematicData = { width: W, height: H, elements: [
  { type: "vsource", id: "V1", ...V1, label: "V₁", value: "9 V", highlight: true },
  wireV1top,
  wireV1bot,
  { type: "vsource", id: "V2", ...V2, label: "V₂", value: "6 V", highlight: true },
  wireV2top,
  wireV2bot,
  juncV1V2,
  { type: "resistor", id: "R1", ...R1, label: "R₁", value: "1 kΩ", highlight: true },
  wireR1Node,
  { type: "resistor", id: "R2", ...R2, label: "R₂", value: "2.2 kΩ", highlight: true },
  wireR2Node,
  juncNode,
  wireR3top,
  { type: "resistor", id: "R3", ...R3, rotation: 90, label: "R₃", value: "3.3 kΩ", highlight: true },
  wireR3bot,
  { type: "ground", id: "GND", ...GND },
  lblNodeA,
]};

// ── Step 2: Insert ammeters — show ammeter labels on branches ──
export const step02: SchematicData = { width: W, height: H, elements: [
  { type: "vsource", id: "V1", ...V1, label: "V₁", value: "9 V" },
  wireV1top,
  wireV1bot,
  { type: "vsource", id: "V2", ...V2, label: "V₂", value: "6 V" },
  wireV2top,
  wireV2bot,
  juncV1V2,
  { type: "resistor", id: "R1", ...R1, label: "R₁", value: "1 kΩ" },
  wireR1Node,
  { type: "resistor", id: "R2", ...R2, label: "R₂", value: "2.2 kΩ" },
  wireR2Node,
  juncNode,
  wireR3top,
  { type: "resistor", id: "R3", ...R3, rotation: 90, label: "R₃", value: "3.3 kΩ" },
  wireR3bot,
  { type: "ground", id: "GND", ...GND },
  lblNodeA,
  { type: "label", id: "lbl_i1", x: 120, y: 18, text: "I₁ →" },
  { type: "label", id: "lbl_i2", x: 120, y: 245, text: "I₂ →" },
  { type: "label", id: "lbl_i3", x: 280, y: 160, text: "↓ I₃" },
]};

// Base elements for steps 3-7
const baseFull: SchematicElement[] = [
  { type: "vsource", id: "V1", ...V1, label: "V₁", value: "9 V" },
  wireV1top,
  wireV1bot,
  { type: "vsource", id: "V2", ...V2, label: "V₂", value: "6 V" },
  wireV2top,
  wireV2bot,
  juncV1V2,
  { type: "resistor", id: "R1", ...R1, label: "R₁", value: "1 kΩ" },
  wireR1Node,
  { type: "resistor", id: "R2", ...R2, label: "R₂", value: "2.2 kΩ" },
  wireR2Node,
  juncNode,
  wireR3top,
  { type: "resistor", id: "R3", ...R3, rotation: 90, label: "R₃", value: "3.3 kΩ" },
  wireR3bot,
  { type: "ground", id: "GND", ...GND },
  lblNodeA,
  { type: "label", id: "lbl_i1", x: 120, y: 18, text: "I₁ →" },
  { type: "label", id: "lbl_i2", x: 120, y: 245, text: "I₂ →" },
  { type: "label", id: "lbl_i3", x: 280, y: 160, text: "↓ I₃" },
];

// ── Step 3: Measure branch currents (KCL check) ──────────────
export const step03: SchematicData = { width: W, height: H, elements: [
  ...baseFull,
  { type: "label", id: "lbl_kcl", x: 160, y: 108, text: "KCL: I₁ + I₂ = I₃" },
]};

// ── Step 4: Measure Loop 1 voltages ──────────────────────────
export const step04: SchematicData = { width: W, height: H, elements: [
  ...baseFull,
  { type: "label", id: "lbl_kvl1", x: 160, y: 108, text: "Loop 1: V₁ − V_R1 − V_R3 = 0" },
]};

// ── Step 5: Measure Loop 2 voltages ──────────────────────────
export const step05: SchematicData = { width: W, height: H, elements: [
  ...baseFull,
  { type: "label", id: "lbl_kvl2", x: 160, y: 108, text: "Loop 2: V₂ − V_R2 − V_R3 = 0" },
]};

// ── Step 6: Vary supply (V1 = 12V) ──────────────────────────
export const step06: SchematicData = { width: W, height: H, elements: [
  ...baseFull.map(el => el.id === "V1" ? { ...el, value: "12 V", highlight: true } : el),
  { type: "label", id: "lbl_vary", x: 160, y: 108, text: "V₁ changed to 12 V — repeat" },
]};

// ── Step 7: Theoretical comparison ───────────────────────────
export const step07: SchematicData = { width: W, height: H, elements: [
  ...baseFull,
  { type: "label", id: "lbl_theory", x: 160, y: 108, text: "Compare measured vs theoretical" },
]};

/** Indexed array */
export const kirchhoffStepSchematics: SchematicData[] = [
  step01, step02, step03, step04, step05, step06, step07,
];
