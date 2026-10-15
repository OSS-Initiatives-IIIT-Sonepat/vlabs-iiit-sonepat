import { type SchematicData, type SchematicElement } from "@/labs/CircuitSchematic";

/*
 * Norton's Theorem — progressive 2D schematics.
 *
 * Same R1–R2 divider as Thevenin, but measuring I_N (short-circuit)
 * and building Norton equivalent (current source + R_N parallel).
 *
 *   Vs ── R1 ──┬── R2 ── GND
 *              A│         B
 *               ├── R_L ── GND (or ammeter short)
 */

const W = 300;
const H = 240;

// ── Positions (same as Thevenin layout) ───────────────────────
const VS   = { x: 30,  y: 120 };
const R1   = { x: 110, y: 30  };
const R2   = { x: 110, y: 120 };
const NODE = { x: 180, y: 30  };
const RL   = { x: 240, y: 120 };
const AMM  = { x: 180, y: 120 };
const GND1 = { x: 30,  y: 210 };

// ── Wires ─────────────────────────────────────────────────────
const wireVsTop: SchematicElement  = { type: "wire", id: "w_vs_top",  points: [{ x: 30, y: 90 }, { x: 30, y: 30 }, { x: 80, y: 30 }] };
const wireVsBot: SchematicElement  = { type: "wire", id: "w_vs_bot",  points: [{ x: 30, y: 150 }, { x: 30, y: 210 }] };
const wireR1Node: SchematicElement = { type: "wire", id: "w_r1_node", points: [{ x: 140, y: 30 }, { x: 180, y: 30 }] };
const wireNodeR2: SchematicElement = { type: "wire", id: "w_node_r2", points: [{ x: 110, y: 30 }, { x: 110, y: 96 }] };
const wireR2Gnd: SchematicElement  = { type: "wire", id: "w_r2_gnd",  points: [{ x: 110, y: 144 }, { x: 110, y: 210 }, { x: 30, y: 210 }] };
const wireAmmTop: SchematicElement = { type: "wire", id: "w_amm_top", points: [{ x: 180, y: 30 }, { x: 180, y: 96 }] };
const wireAmmBot: SchematicElement = { type: "wire", id: "w_amm_bot", points: [{ x: 180, y: 144 }, { x: 180, y: 210 }] };
const wireNodeRL: SchematicElement = { type: "wire", id: "w_node_rl", points: [{ x: 180, y: 30 }, { x: 240, y: 30 }, { x: 240, y: 96 }] };
const wireRLGnd: SchematicElement  = { type: "wire", id: "w_rl_gnd",  points: [{ x: 240, y: 144 }, { x: 240, y: 210 }, { x: 110, y: 210 }] };
const juncNode: SchematicElement   = { type: "junction", id: "j_node", x: 180, y: 30 };
const juncR1: SchematicElement     = { type: "junction", id: "j_r1",  x: 110, y: 30 };
const juncGnd: SchematicElement    = { type: "junction", id: "j_gnd", x: 110, y: 210 };
const juncGnd2: SchematicElement   = { type: "junction", id: "j_gnd2", x: 180, y: 210 };

// ── Step 1: Build original network ───────────────────────────
export const step01: SchematicData = { width: W, height: H, elements: [
  { type: "vsource", id: "VS", ...VS, label: "Vs", value: "9 V", highlight: true },
  wireVsTop,
  wireVsBot,
  { type: "ground", id: "GND", ...GND1 },
  { type: "resistor", id: "R1", ...R1, label: "R₁", value: "1 kΩ", highlight: true },
  wireR1Node,
  juncR1,
  wireNodeR2,
  { type: "resistor", id: "R2", ...R2, rotation: 90, label: "R₂", value: "2.2 kΩ", highlight: true },
  wireR2Gnd,
  juncNode,
  { type: "label", id: "lbl_a", x: 186, y: 18, text: "A" },
  { type: "label", id: "lbl_b", x: 186, y: 222, text: "B" },
]};

// ── Step 2: Measure I_N (ammeter shorts A-B) ────────────────
export const step02: SchematicData = { width: W, height: H, elements: [
  { type: "vsource", id: "VS", ...VS, label: "Vs", value: "9 V" },
  wireVsTop,
  wireVsBot,
  { type: "ground", id: "GND", ...GND1 },
  { type: "resistor", id: "R1", ...R1, label: "R₁", value: "1 kΩ" },
  wireR1Node,
  juncR1,
  wireNodeR2,
  { type: "resistor", id: "R2", ...R2, rotation: 90, label: "R₂", value: "2.2 kΩ" },
  wireR2Gnd,
  juncNode,
  juncGnd2,
  { ...wireAmmTop, highlight: true },
  { type: "ammeter", id: "AMM", ...AMM, label: "I_N", highlight: true },
  { ...wireAmmBot, highlight: true },
  { type: "label", id: "lbl_in", x: 150, y: 228, text: "I_N = Vs/R₁ = 9 mA (R₂ bypassed)" },
]};

// ── Step 3: Measure R_N (kill supply) ────────────────────────
export const step03: SchematicData = { width: W, height: H, elements: [
  { type: "wire", id: "w_short", points: [{ x: 30, y: 30 }, { x: 30, y: 210 }], highlight: true },
  { type: "ground", id: "GND", ...GND1 },
  { type: "resistor", id: "R1", ...R1, label: "R₁", value: "1 kΩ" },
  wireR1Node,
  { type: "wire", id: "w_vs_r1", points: [{ x: 30, y: 30 }, { x: 80, y: 30 }] },
  juncR1,
  wireNodeR2,
  { type: "resistor", id: "R2", ...R2, rotation: 90, label: "R₂", value: "2.2 kΩ" },
  wireR2Gnd,
  juncNode,
  { type: "label", id: "lbl_rn", x: 150, y: 228, text: "R_N = R₁ ∥ R₂ ≈ 688 Ω" },
  { type: "label", id: "lbl_kill", x: 36, y: 120, text: "Vs = 0" },
]};

// ── Step 4: Verify duality I_N = Vth / Rth ──────────────────
export const step04: SchematicData = { width: W, height: H, elements: [
  { type: "vsource", id: "VS", ...VS, label: "Vs", value: "9 V" },
  wireVsTop,
  wireVsBot,
  { type: "ground", id: "GND", ...GND1 },
  { type: "resistor", id: "R1", ...R1, label: "R₁", value: "1 kΩ" },
  wireR1Node,
  juncR1,
  wireNodeR2,
  { type: "resistor", id: "R2", ...R2, rotation: 90, label: "R₂", value: "2.2 kΩ" },
  wireR2Gnd,
  juncNode,
  { type: "label", id: "lbl_dual", x: 150, y: 228, text: "I_N = Vth/R_N ≈ 6.19/0.688 ≈ 9 mA ✓" },
]};

// ── Step 5: Norton equivalent + load ─────────────────────────
export const step05: SchematicData = { width: W, height: H, elements: [
  { type: "vsource", id: "VS", ...VS, label: "Vs", value: "9 V" },
  wireVsTop,
  wireVsBot,
  { type: "ground", id: "GND", ...GND1 },
  { type: "resistor", id: "R1", ...R1, label: "R₁", value: "1 kΩ" },
  wireR1Node,
  juncR1,
  wireNodeR2,
  { type: "resistor", id: "R2", ...R2, rotation: 90, label: "R₂", value: "2.2 kΩ" },
  wireR2Gnd,
  juncNode,
  juncGnd,
  { ...wireNodeRL, highlight: true },
  { type: "resistor", id: "RL", ...RL, rotation: 90, label: "R_L", value: "3.3 kΩ", highlight: true },
  { ...wireRLGnd, highlight: true },
  { type: "label", id: "lbl_norton", x: 150, y: 228, text: "Norton equiv matches original V_L" },
]};

export const nortonStepSchematics: SchematicData[] = [
  step01, step02, step03, step04, step05,
];
