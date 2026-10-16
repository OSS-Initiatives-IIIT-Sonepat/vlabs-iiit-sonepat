import { type SchematicData, type SchematicElement } from "@/labs/CircuitSchematic";

/*
 * Rectifiers with Capacitor Filters — progressive 2D schematics.
 *
 * Full-wave bridge (same layout as 06-full-wave-rectifier), all diodes
 * pointing up (anode below, cathode above):
 *
 *        (+) ────┬──────────┬───────┬────── Vout
 *        D1      D2         │       │
 *   a ───┤  ~AC~ ├─── b     RL      C1
 *        D3      D4         │       │
 *        (−) ────┴──GND─────┴─(A)───┘
 */

const W = 440;
const H = 275;

// ── Symbols ───────────────────────────────────────────────────
const acEl: SchematicElement = { type: "acsource", id: "VAC", x: 105, y: 130, rotation: 90, label: "VAC" };
const acValue: SchematicElement = { type: "label", id: "lbl_ac", x: 105, y: 166, text: "12 Vrms" };
const d1El: SchematicElement = { type: "diode", id: "D1", x: 60,  y: 85,  rotation: 270, label: "D1" };
const d2El: SchematicElement = { type: "diode", id: "D2", x: 150, y: 85,  rotation: 270, label: "D2" };
const d3El: SchematicElement = { type: "diode", id: "D3", x: 60,  y: 175, rotation: 270, label: "D3" };
const d4El: SchematicElement = { type: "diode", id: "D4", x: 150, y: 175, rotation: 270, label: "D4" };
const rlEl: SchematicElement = { type: "resistor", id: "RL", x: 230, y: 130, rotation: 90, label: "RL", value: "1 kΩ" };
const c1 = (value: string, highlight?: boolean): SchematicElement =>
  ({ type: "capacitor", id: "C1", x: 330, y: 130, rotation: 90, label: "C1", value, highlight });
const gndEl: SchematicElement = { type: "ground", id: "GND", x: 105, y: 220 };

// ── Wires: bridge ─────────────────────────────────────────────
const wA1: SchematicElement = { type: "wire", id: "w_a_d1", points: [{ x: 75, y: 130 }, { x: 60, y: 130 }, { x: 60, y: 105 }] };
const wB2: SchematicElement = { type: "wire", id: "w_b_d2", points: [{ x: 135, y: 130 }, { x: 150, y: 130 }, { x: 150, y: 105 }] };
const wA3: SchematicElement = { type: "wire", id: "w_a_d3", points: [{ x: 60, y: 130 }, { x: 60, y: 155 }] };
const wB4: SchematicElement = { type: "wire", id: "w_b_d4", points: [{ x: 150, y: 130 }, { x: 150, y: 155 }] };
const wN3: SchematicElement = { type: "wire", id: "w_d3_neg", points: [{ x: 60, y: 195 }, { x: 60, y: 220 }, { x: 150, y: 220 }] };
const wN4: SchematicElement = { type: "wire", id: "w_d4_neg", points: [{ x: 150, y: 195 }, { x: 150, y: 220 }] };
const wP1: SchematicElement = { type: "wire", id: "w_d1_pos", points: [{ x: 60, y: 65 }, { x: 60, y: 40 }, { x: 150, y: 40 }] };
const wP2: SchematicElement = { type: "wire", id: "w_d2_pos", points: [{ x: 150, y: 65 }, { x: 150, y: 40 }] };

// ── Wires: load and filter ────────────────────────────────────
const wPosRL: SchematicElement = { type: "wire", id: "w_pos_rl", points: [{ x: 150, y: 40 }, { x: 230, y: 40 }, { x: 230, y: 100 }] };
const wRLNeg: SchematicElement = { type: "wire", id: "w_rl_neg", points: [{ x: 230, y: 160 }, { x: 230, y: 220 }, { x: 150, y: 220 }] };
// (−) return split around the surge ammeter (step 5)
const wRLAm: SchematicElement  = { type: "wire", id: "w_rl_am",  points: [{ x: 230, y: 160 }, { x: 230, y: 220 }, { x: 214, y: 220 }] };
const wAmNeg: SchematicElement = { type: "wire", id: "w_am_neg", points: [{ x: 166, y: 220 }, { x: 150, y: 220 }] };
const wPosC1: SchematicElement = { type: "wire", id: "w_pos_c1", points: [{ x: 230, y: 40 }, { x: 330, y: 40 }] };
const wC1Top: SchematicElement = { type: "wire", id: "w_c1_top", points: [{ x: 330, y: 40 }, { x: 330, y: 110 }] };
const wC1Neg: SchematicElement = { type: "wire", id: "w_c1_neg", points: [{ x: 330, y: 150 }, { x: 330, y: 220 }, { x: 230, y: 220 }] };
const wOut: SchematicElement   = { type: "wire", id: "w_out",    points: [{ x: 330, y: 40 }, { x: 384, y: 40 }] };
const wPosVm: SchematicElement = { type: "wire", id: "w_pos_vm", points: [{ x: 330, y: 40 }, { x: 390, y: 40 }, { x: 390, y: 106 }] };
const wVmNeg: SchematicElement = { type: "wire", id: "w_vm_neg", points: [{ x: 390, y: 154 }, { x: 390, y: 220 }, { x: 330, y: 220 }] };

// ── Junctions ─────────────────────────────────────────────────
const jA: SchematicElement     = { type: "junction", id: "j_a",   x: 60,  y: 130 };
const jB: SchematicElement     = { type: "junction", id: "j_b",   x: 150, y: 130 };
const jPos: SchematicElement   = { type: "junction", id: "j_pos", x: 150, y: 40 };
const jNeg: SchematicElement   = { type: "junction", id: "j_neg", x: 150, y: 220 };
const jGnd: SchematicElement   = { type: "junction", id: "j_gnd", x: 105, y: 220 };
const jPosRL: SchematicElement = { type: "junction", id: "j_prl", x: 230, y: 40 };
const jNegRL: SchematicElement = { type: "junction", id: "j_nrl", x: 230, y: 220 };
const jPosC1: SchematicElement = { type: "junction", id: "j_pc1", x: 330, y: 40 };
const jNegC1: SchematicElement = { type: "junction", id: "j_nc1", x: 330, y: 220 };

const bridge = (highlight?: boolean): SchematicElement[] => [
  acEl, acValue,
  wA1, { ...d1El, highlight }, wB2, { ...d2El, highlight },
  wA3, { ...d3El, highlight }, wN3, wB4, { ...d4El, highlight }, wN4, jA, jB,
  wP1, wP2, jPos, jNeg, gndEl, jGnd,
];
const load = (highlight?: boolean): SchematicElement[] => [wPosRL, { ...rlEl, highlight }, jPosRL];
const filter = (value: string, highlight?: boolean): SchematicElement[] => [
  { ...wPosC1, highlight }, { ...wC1Top, highlight }, c1(value, highlight), { ...wC1Neg, highlight }, jPosC1, jNegRL,
];
const probe: SchematicElement[] = [wOut, { type: "probe", id: "pr_out", x: 390, y: 40, label: "Vout" }];
const title = (text: string): SchematicElement => ({ type: "label", id: "lbl_title", x: 220, y: 20, text });
const caption = (id: string, text: string): SchematicElement => ({ type: "label", id, x: 220, y: 264, text });

/** Step 1: No filter baseline — pulsating DC */
export const step01: SchematicData = { width: W, height: H, elements: [
  title("Full-Wave Bridge Rectifier"),
  ...bridge(true),
  ...load(true), wRLNeg,
  { type: "wire", id: "w_pos_out", points: [{ x: 230, y: 40 }, { x: 384, y: 40 }] },
  { type: "probe", id: "pr_out", x: 390, y: 40, label: "Vout" },
  caption("lbl_pulse", "No filter: pulsating 100 Hz DC"),
]};

/** Step 2: Add 10 µF filter capacitor */
export const step02: SchematicData = { width: W, height: H, elements: [
  title("With Filter Capacitor"),
  ...bridge(), ...load(), wRLNeg,
  // NEW — capacitor
  ...filter("10 µF", true),
  ...probe,
  caption("lbl_10u", "C = 10 µF: moderate ripple"),
]};

/** Step 3: Replace with 47 µF, 220 µF, 1000 µF */
export const step03: SchematicData = { width: W, height: H, elements: [
  title("Vary Capacitance"),
  ...bridge(), ...load(), wRLNeg,
  ...filter("47→1000 µF", true),
  ...probe,
  caption("lbl_vary", "Larger C → smaller ripple (Vr ∝ 1/C)"),
]};

/** Step 4: Plot ripple factor vs capacitance */
export const step04: SchematicData = { width: W, height: H, elements: [
  title("Ripple Factor γ vs Capacitance"),
  ...bridge(), ...load(), wRLNeg,
  ...filter("vary"),
  { ...wPosVm, highlight: true },
  { type: "voltmeter", id: "VM", x: 390, y: 130, label: "Vr(pp)", highlight: true },
  { ...wVmNeg, highlight: true },
  jNegC1,
  caption("lbl_gamma", "γ = Vr(rms) / Vdc ≈ 1/(2√3 f RL C)"),
]};

/** Step 5: Observe diode surge current */
export const step05: SchematicData = { width: W, height: H, elements: [
  title("Diode Surge Current"),
  ...bridge(), ...load(),
  ...filter("1000 µF", true),
  ...probe,
  // Ammeter in the (−) return carries the full diode current
  wRLAm,
  { type: "ammeter", id: "AM", x: 190, y: 220, rotation: 90, label: "ID(pk)", highlight: true },
  wAmNeg,
  caption("lbl_surge", "Large C → short tall charging pulses"),
]};

/** Indexed array */
export const rectifiersCapacitorFiltersStepSchematics: SchematicData[] = [
  step01, step02, step03, step04, step05,
];

/** Theory diagram */
export const rectifiersCapacitorFiltersTheoryDiagram: SchematicData = step05;
