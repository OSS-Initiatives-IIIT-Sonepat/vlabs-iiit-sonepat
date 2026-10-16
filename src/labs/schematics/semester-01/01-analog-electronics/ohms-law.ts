import { type SchematicData, type SchematicElement } from "@/labs/CircuitSchematic";

/*
 * Ohm's Law Verification — progressive 2D schematics.
 *
 * Circuit:
 *        ┌──(A)──┬── R₁ ──┬──┐
 *        │       └──(V)───┘  │
 *        Vs                  │
 *        └──────── GND ──────┘
 *
 * Simple series circuit: voltage source, ammeter, resistor, ground.
 * Voltmeter across the resistor.
 */

const W = 330;
const H = 230;

// ── Symbols ───────────────────────────────────────────────────
const v1 = (value: string, highlight?: boolean): SchematicElement =>
  ({ type: "vsource", id: "V1", x: 60, y: 110, label: "Vs", value, highlight });
const amm = (highlight?: boolean): SchematicElement =>
  ({ type: "ammeter", id: "AMM", x: 130, y: 40, rotation: 270, label: "mA", highlight });
const r1 = (value = "1 kΩ", highlight?: boolean): SchematicElement =>
  ({ type: "resistor", id: "R1", x: 220, y: 40, label: "R₁", value, highlight });
const vm = (highlight?: boolean): SchematicElement =>
  ({ type: "voltmeter", id: "VM", x: 220, y: 100, rotation: 90, label: "V", highlight });
const gnd: SchematicElement = { type: "ground", id: "GND", x: 175, y: 180 };

// ── Wires ─────────────────────────────────────────────────────
const wireV1Top: SchematicElement = { type: "wire", id: "w_v1_top", points: [{ x: 60, y: 80 }, { x: 60, y: 40 }, { x: 106, y: 40 }] };
const wireV1Bot: SchematicElement = { type: "wire", id: "w_v1_bot", points: [{ x: 60, y: 140 }, { x: 60, y: 180 }, { x: 175, y: 180 }] };
const wireAmmR1: SchematicElement = { type: "wire", id: "w_amm_r1", points: [{ x: 154, y: 40 }, { x: 190, y: 40 }] };
const wireR1Ret: SchematicElement = { type: "wire", id: "w_r1_ret", points: [{ x: 250, y: 40 }, { x: 290, y: 40 }, { x: 290, y: 180 }, { x: 175, y: 180 }] };
const wireVmL: SchematicElement   = { type: "wire", id: "w_vm_l",   points: [{ x: 170, y: 40 }, { x: 170, y: 100 }, { x: 196, y: 100 }] };
const wireVmR: SchematicElement   = { type: "wire", id: "w_vm_r",   points: [{ x: 244, y: 100 }, { x: 270, y: 100 }, { x: 270, y: 40 }] };
const juncVmL: SchematicElement   = { type: "junction", id: "j_vm_l", x: 170, y: 40 };
const juncVmR: SchematicElement   = { type: "junction", id: "j_vm_r", x: 270, y: 40 };
const juncGnd: SchematicElement   = { type: "junction", id: "j_gnd",  x: 175, y: 180 };

const caption = (id: string, text: string): SchematicElement =>
  ({ type: "label", id, x: 175, y: 218, text });

/** Complete circuit (steps 4–7). */
const full = (vValue: string, opts: { r1Value?: string; hlV1?: boolean; hlR1?: boolean } = {}): SchematicElement[] => [
  v1(vValue, opts.hlV1), wireV1Top, wireV1Bot, gnd, juncGnd,
  amm(), wireAmmR1, r1(opts.r1Value, opts.hlR1), wireR1Ret,
  wireVmL, juncVmL, vm(), wireVmR, juncVmR,
];

// ── Step 1: Breadboard setup — just show supply ───────────────
export const step01: SchematicData = { width: W, height: H, elements: [
  v1("0–10 V", true),
  wireV1Bot,
  gnd,
]};

// ── Step 2: Insert resistor + ammeter in series ───────────────
export const step02: SchematicData = { width: W, height: H, elements: [
  v1("0–10 V"), wireV1Bot, gnd, juncGnd,
  { ...wireV1Top, highlight: true },
  amm(true),
  { ...wireAmmR1, highlight: true },
  r1("1 kΩ", true),
  { ...wireR1Ret, highlight: true },
]};

// ── Step 3: Connect voltmeter across R1 ───────────────────────
export const step03: SchematicData = { width: W, height: H, elements: [
  v1("0–10 V"), wireV1Top, wireV1Bot, gnd, juncGnd,
  amm(), wireAmmR1, r1(), wireR1Ret,
  // NEW
  { ...wireVmL, highlight: true }, juncVmL,
  vm(true),
  { ...wireVmR, highlight: true }, juncVmR,
]};

// ── Step 4: Zero reading (0 V) ───────────────────────────────
export const step04: SchematicData = { width: W, height: H, elements: [
  ...full("0 V", { hlV1: true }),
  caption("lbl_zero", "Confirm: V = 0, I = 0"),
]};

// ── Step 5: Vary voltage 1–10 V ──────────────────────────────
export const step05: SchematicData = { width: W, height: H, elements: [
  ...full("1 → 10 V", { hlV1: true }),
  caption("lbl_sweep", "Sweep Vs: 1 → 10 V in 1 V steps"),
]};

// ── Step 6: Repeat with second resistor ──────────────────────
export const step06: SchematicData = { width: W, height: H, elements: [
  ...full("1 → 10 V", { r1Value: "2.2 kΩ", hlR1: true }),
  caption("lbl_r2", "R₁ replaced with 2.2 kΩ — repeat sweep"),
]};

// ── Step 7: Plot graph ───────────────────────────────────────
export const step07: SchematicData = { width: W, height: H, elements: [
  ...full("1 → 10 V"),
  caption("lbl_graph", "Plot V vs I — slope = R"),
]};

/** Indexed array for easy lookup */
export const ohmsLawStepSchematics: SchematicData[] = [
  step01, step02, step03, step04, step05, step06, step07,
];
