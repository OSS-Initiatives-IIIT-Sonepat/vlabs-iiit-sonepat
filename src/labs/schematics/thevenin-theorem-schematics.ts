import { type SchematicData, type SchematicElement } from "@/labs/CircuitSchematic";

/*
 * Thevenin's Theorem — progressive 2D schematics.
 *
 * Original network: R1–R2 divider across Vs, output at A-B.
 *
 *   Vs ── R1 ──┬── R2 ── GND
 *              A│         B
 *               ├── R_L ── GND
 *               [V]
 */

const W = 300;
const H = 240;

// ── Positions ─────────────────────────────────────────────────
const VS   = { x: 30,  y: 120 };  // vsource (vertical)
const R1   = { x: 110, y: 30  };  // R1 (horizontal)
const R2   = { x: 110, y: 120 };  // R2 (vertical, from node to GND)
const NODE = { x: 180, y: 30  };  // terminal A (junction)
const RL   = { x: 240, y: 120 };  // R_load (vertical)
const VM   = { x: 180, y: 120 };  // voltmeter (vertical)
const GND1 = { x: 30,  y: 210 };  // ground

// ── Wires ─────────────────────────────────────────────────────
const wireVsTop: SchematicElement  = { type: "wire", id: "w_vs_top",  points: [{ x: 30, y: 90 }, { x: 30, y: 30 }, { x: 80, y: 30 }] };
const wireVsBot: SchematicElement  = { type: "wire", id: "w_vs_bot",  points: [{ x: 30, y: 150 }, { x: 30, y: 210 }] };
const wireR1Node: SchematicElement = { type: "wire", id: "w_r1_node", points: [{ x: 140, y: 30 }, { x: 180, y: 30 }] };
const wireNodeR2: SchematicElement = { type: "wire", id: "w_node_r2", points: [{ x: 110, y: 30 }, { x: 110, y: 96 }] };
const wireR2Gnd: SchematicElement  = { type: "wire", id: "w_r2_gnd",  points: [{ x: 110, y: 144 }, { x: 110, y: 210 }, { x: 30, y: 210 }] };
const wireNodeRL: SchematicElement = { type: "wire", id: "w_node_rl", points: [{ x: 180, y: 30 }, { x: 240, y: 30 }, { x: 240, y: 96 }] };
const wireRLGnd: SchematicElement  = { type: "wire", id: "w_rl_gnd",  points: [{ x: 240, y: 144 }, { x: 240, y: 210 }, { x: 110, y: 210 }] };
const wireVmTop: SchematicElement  = { type: "wire", id: "w_vm_top",  points: [{ x: 180, y: 30 }, { x: 180, y: 96 }] };
const wireVmBot: SchematicElement  = { type: "wire", id: "w_vm_bot",  points: [{ x: 180, y: 144 }, { x: 180, y: 210 }] };
const juncNode: SchematicElement   = { type: "junction", id: "j_node",  x: 180, y: 30 };
const juncR1: SchematicElement     = { type: "junction", id: "j_r1",   x: 110, y: 30 };
const juncGnd: SchematicElement    = { type: "junction", id: "j_gnd",  x: 110, y: 210 };
const juncGnd2: SchematicElement   = { type: "junction", id: "j_gnd2", x: 180, y: 210 };

// ── Step 1: Build original R1-R2 divider ─────────────────────
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

// ── Step 2: Measure Vth (open-circuit, voltmeter at A-B) ────
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
  { ...wireVmTop, highlight: true },
  { type: "voltmeter", id: "VM", ...VM, rotation: 0, label: "Vth", highlight: true },
  { ...wireVmBot, highlight: true },
  { type: "label", id: "lbl_vth", x: 150, y: 228, text: "Vth = Vs × R₂/(R₁+R₂) ≈ 6.19 V" },
]};

// ── Step 3: Measure Rth (kill supply, measure resistance) ───
export const step03: SchematicData = { width: W, height: H, elements: [
  // Supply killed (short) — show as wire
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
  { type: "label", id: "lbl_rth", x: 150, y: 228, text: "Rth = R₁ ∥ R₂ ≈ 688 Ω" },
  { type: "label", id: "lbl_kill", x: 36, y: 120, text: "Vs = 0 (shorted)" },
]};

// ── Step 4: Build Thevenin equivalent + load R3 ─────────────
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
  juncGnd,
  { ...wireNodeRL, highlight: true },
  { type: "resistor", id: "RL", ...RL, rotation: 90, label: "R_L", value: "3.3 kΩ", highlight: true },
  { ...wireRLGnd, highlight: true },
  { type: "label", id: "lbl_load", x: 150, y: 228, text: "Load connected — measure V_L" },
]};

// ── Step 5: Repeat with second load (4.7 kΩ) ────────────────
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
  wireNodeRL,
  { type: "resistor", id: "RL", ...RL, rotation: 90, label: "R_L", value: "4.7 kΩ", highlight: true },
  wireRLGnd,
  { type: "label", id: "lbl_load2", x: 150, y: 228, text: "R_L = 4.7 kΩ — verify V_L matches" },
]};

export const theveninStepSchematics: SchematicData[] = [
  step01, step02, step03, step04, step05,
];
