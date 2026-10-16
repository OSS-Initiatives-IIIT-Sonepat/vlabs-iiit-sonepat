import { type SchematicData, type SchematicElement } from "@/labs/CircuitSchematic";

/*
 * Norton's Theorem — progressive 2D schematics.
 *
 * Same R1–R2 divider as Thevenin, but measuring I_N (short-circuit)
 * and building Norton equivalent (current source + R_N parallel).
 *
 *        ┌── R1 ──┬──────── A
 *        Vs       R2
 *        └─ GND ──┴──────── B
 */

const W = 350;
const H = 258;

// ── Symbols ───────────────────────────────────────────────────
const vs = (highlight?: boolean): SchematicElement =>
  ({ type: "vsource", id: "VS", x: 50, y: 130, label: "Vs", value: "9 V", highlight });
const r1 = (highlight?: boolean): SchematicElement =>
  ({ type: "resistor", id: "R1", x: 120, y: 50, label: "R₁", value: "1 kΩ", highlight });
const r2 = (highlight?: boolean): SchematicElement =>
  ({ type: "resistor", id: "R2", x: 190, y: 130, rotation: 90, label: "R₂", value: "2.2 kΩ", highlight });
const gnd: SchematicElement = { type: "ground", id: "GND", x: 120, y: 210 };

// ── Wires ─────────────────────────────────────────────────────
const wireVsR1: SchematicElement   = { type: "wire", id: "w_vs_r1",   points: [{ x: 50, y: 100 }, { x: 50, y: 50 }, { x: 90, y: 50 }] };
const wireVsGnd: SchematicElement  = { type: "wire", id: "w_vs_gnd",  points: [{ x: 50, y: 160 }, { x: 50, y: 210 }, { x: 120, y: 210 }] };
const wireVsShort: SchematicElement = { type: "wire", id: "w_vs_short", points: [{ x: 50, y: 100 }, { x: 50, y: 160 }] };
const wireR1A: SchematicElement    = { type: "wire", id: "w_r1_a",    points: [{ x: 150, y: 50 }, { x: 250, y: 50 }] };
const wireNodeR2: SchematicElement = { type: "wire", id: "w_node_r2", points: [{ x: 190, y: 50 }, { x: 190, y: 100 }] };
const wireR2Gnd: SchematicElement  = { type: "wire", id: "w_r2_gnd",  points: [{ x: 190, y: 160 }, { x: 190, y: 210 }, { x: 120, y: 210 }] };
const wireB: SchematicElement      = { type: "wire", id: "w_b",       points: [{ x: 190, y: 210 }, { x: 250, y: 210 }] };
const wireAmmTop: SchematicElement = { type: "wire", id: "w_amm_top", points: [{ x: 250, y: 50 }, { x: 250, y: 106 }] };
const wireAmmBot: SchematicElement = { type: "wire", id: "w_amm_bot", points: [{ x: 250, y: 154 }, { x: 250, y: 210 }] };
const wireRlTop: SchematicElement  = { type: "wire", id: "w_rl_top",  points: [{ x: 250, y: 50 }, { x: 310, y: 50 }, { x: 310, y: 100 }] };
const wireRlBot: SchematicElement  = { type: "wire", id: "w_rl_bot",  points: [{ x: 310, y: 160 }, { x: 310, y: 210 }, { x: 250, y: 210 }] };
const juncNode: SchematicElement   = { type: "junction", id: "j_node", x: 190, y: 50 };
const juncGnd: SchematicElement    = { type: "junction", id: "j_gnd",  x: 120, y: 210 };
const juncB: SchematicElement      = { type: "junction", id: "j_b",    x: 190, y: 210 };
const termA: SchematicElement      = { type: "junction", id: "t_a",    x: 250, y: 50 };
const termB: SchematicElement      = { type: "junction", id: "t_b",    x: 250, y: 210 };

const labelsAB: SchematicElement[] = [
  { type: "label", id: "lbl_a", x: 250, y: 38, text: "A" },
  { type: "label", id: "lbl_b", x: 250, y: 230, text: "B" },
];
const caption = (id: string, text: string): SchematicElement =>
  ({ type: "label", id, x: 175, y: 250, text });

/** Divider network up to terminals A-B. */
const network = (opts: { killed?: boolean; highlight?: boolean } = {}): SchematicElement[] => [
  ...(opts.killed
    ? [{ ...wireVsShort, highlight: true }, { type: "label", id: "lbl_kill", x: 95, y: 134, text: "Vs = 0" } as SchematicElement]
    : [vs(opts.highlight)]),
  wireVsR1, wireVsGnd, gnd, juncGnd,
  r1(opts.highlight), wireR1A, juncNode, wireNodeR2, r2(opts.highlight), wireR2Gnd, wireB, juncB,
  ...labelsAB,
];

// ── Step 1: Build original network ───────────────────────────
export const step01: SchematicData = { width: W, height: H, elements: [
  ...network({ highlight: true }), termA, termB,
]};

// ── Step 2: Measure I_N (ammeter shorts A-B) ────────────────
export const step02: SchematicData = { width: W, height: H, elements: [
  ...network(),
  { ...wireAmmTop, highlight: true },
  { type: "ammeter", id: "AMM", x: 250, y: 130, label: "I_N", highlight: true },
  { ...wireAmmBot, highlight: true },
  caption("lbl_in", "I_N = Vs/R₁ = 9 mA (R₂ bypassed)"),
]};

// ── Step 3: Measure R_N (kill supply) ────────────────────────
export const step03: SchematicData = { width: W, height: H, elements: [
  ...network({ killed: true }), termA, termB,
  caption("lbl_rn", "R_N = R₁ ∥ R₂ ≈ 688 Ω (seen from A-B)"),
]};

// ── Step 4: Verify duality I_N = Vth / Rth ──────────────────
export const step04: SchematicData = { width: W, height: H, elements: [
  ...network(), termA, termB,
  caption("lbl_dual", "I_N = Vth/R_N ≈ 6.19/0.688 ≈ 9 mA ✓"),
]};

// ── Step 5: Norton equivalent + load ─────────────────────────
export const step05: SchematicData = { width: W, height: H, elements: [
  ...network(),
  { ...wireRlTop, highlight: true },
  { type: "resistor", id: "RL", x: 310, y: 130, rotation: 90, label: "R_L", value: "3.3 kΩ", highlight: true },
  { ...wireRlBot, highlight: true },
  caption("lbl_norton", "Norton equiv matches original V_L"),
]};

export const nortonStepSchematics: SchematicData[] = [
  step01, step02, step03, step04, step05,
];
