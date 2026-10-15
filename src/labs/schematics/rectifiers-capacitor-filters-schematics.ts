import { type SchematicData, type SchematicElement } from "@/labs/CircuitSchematic";

/*
 * Rectifiers with Capacitor Filters — progressive 2D schematics.
 *
 * Circuit topology (full-wave bridge):
 *   VAC ──┬── D1 ──┬── D3 ──┬── RL ──┐
 *         │       (+)       │        │
 *         │        │        C1       │
 *         │       (−)       │        │
 *         └── D2 ──┴── D4 ──┴────────┴── GND
 */

const W = 380;
const H = 260;

// Positions
const VAC   = { x: 40, y: 130 };
const D1    = { x: 100, y: 70 };
const D2    = { x: 100, y: 190 };
const D3    = { x: 180, y: 70 };
const D4    = { x: 180, y: 190 };
const RL    = { x: 280, y: 130 };
const C1    = { x: 240, y: 170 };
const GND   = { x: 180, y: 240 };

// Wires
const wireVacTop: SchematicElement = { type: "wire", id: "w_vac_top", points: [{ x: 40, y: 100 }, { x: 40, y: 70 }, { x: 80, y: 70 }] };
const wireVacBot: SchematicElement = { type: "wire", id: "w_vac_bot", points: [{ x: 40, y: 160 }, { x: 40, y: 190 }, { x: 80, y: 190 }] };
const wireD1D3: SchematicElement = { type: "wire", id: "w_d1_d3", points: [{ x: 120, y: 70 }, { x: 160, y: 70 }] };
const wireD2D4: SchematicElement = { type: "wire", id: "w_d2_d4", points: [{ x: 120, y: 190 }, { x: 160, y: 190 }] };
const wireD3Out: SchematicElement = { type: "wire", id: "w_d3_out", points: [{ x: 200, y: 70 }, { x: 240, y: 70 }, { x: 240, y: 100 }] };
const wireD4Gnd: SchematicElement = { type: "wire", id: "w_d4_gnd", points: [{ x: 200, y: 190 }, { x: 240, y: 190 }, { x: 240, y: 240 }, { x: 180, y: 240 }] };
const wireOutRL: SchematicElement = { type: "wire", id: "w_out_rl", points: [{ x: 240, y: 130 }, { x: 250, y: 130 }] };
const wireRLgnd: SchematicElement = { type: "wire", id: "w_rl_gnd", points: [{ x: 310, y: 130 }, { x: 330, y: 130 }, { x: 330, y: 240 }, { x: 180, y: 240 }] };
const wireC1top: SchematicElement = { type: "wire", id: "w_c1_top", points: [{ x: 240, y: 130 }, { x: 240, y: 150 }] };
const wireC1gnd: SchematicElement = { type: "wire", id: "w_c1_gnd", points: [{ x: 240, y: 190 }, { x: 240, y: 200 }] };
const juncPlus: SchematicElement = { type: "junction", id: "j_plus", x: 240, y: 130 };
const juncMinus: SchematicElement = { type: "junction", id: "j_minus", x: 240, y: 190 };
const juncGnd: SchematicElement = { type: "junction", id: "j_gnd", x: 180, y: 240 };
const juncD1: SchematicElement = { type: "junction", id: "j_d1", x: 140, y: 70 };
const juncD2: SchematicElement = { type: "junction", id: "j_d2", x: 140, y: 190 };

/** Step 1: No filter baseline — pulsating DC */
export const step01: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "lbl_title", x: 190, y: 20, text: "Full-Wave Bridge Rectifier" },
  { type: "acsource", id: "VAC", ...VAC, label: "VAC", value: "12 Vrms", highlight: true },
  wireVacTop,
  wireVacBot,
  { type: "diode", id: "D1", ...D1, rotation: 0, label: "D1", highlight: true },
  { type: "diode", id: "D2", ...D2, rotation: 180, label: "D2", highlight: true },
  wireD1D3,
  wireD2D4,
  { type: "diode", id: "D3", ...D3, rotation: -90, label: "D3", highlight: true },
  { type: "diode", id: "D4", ...D4, rotation: 90, label: "D4", highlight: true },
  wireD3Out,
  wireD4Gnd,
  juncPlus, juncMinus, juncGnd,
  juncD1, juncD2,
  { type: "wire", id: "w_junc_up", points: [{ x: 140, y: 70 }, { x: 140, y: 130 }] },
  { type: "wire", id: "w_junc_dn", points: [{ x: 140, y: 130 }, { x: 140, y: 190 }] },
  wireOutRL,
  { type: "resistor", id: "RL", ...RL, rotation: 90, label: "RL", value: "1 kΩ", highlight: true },
  wireRLgnd,
  { type: "ground", id: "GND", ...GND },
  { type: "probe", id: "pr_out", x: 350, y: 130, label: "Vout" },
  { type: "label", id: "lbl_pulse", x: 190, y: 250, text: "No filter: pulsating 100 Hz DC" },
]};

/** Step 2: Add 10 µF filter capacitor */
export const step02: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "lbl_title", x: 190, y: 20, text: "With Filter Capacitor" },
  { type: "acsource", id: "VAC", ...VAC, label: "VAC", value: "12 Vrms" },
  wireVacTop, wireVacBot,
  { type: "diode", id: "D1", ...D1, rotation: 0, label: "D1" },
  { type: "diode", id: "D2", ...D2, rotation: 180, label: "D2" },
  wireD1D3, wireD2D4,
  { type: "diode", id: "D3", ...D3, rotation: -90, label: "D3" },
  { type: "diode", id: "D4", ...D4, rotation: 90, label: "D4" },
  wireD3Out, wireD4Gnd,
  juncPlus, juncMinus, juncGnd,
  juncD1, juncD2,
  { type: "wire", id: "w_junc_up", points: [{ x: 140, y: 70 }, { x: 140, y: 130 }] },
  { type: "wire", id: "w_junc_dn", points: [{ x: 140, y: 130 }, { x: 140, y: 190 }] },
  wireOutRL,
  { type: "resistor", id: "RL", ...RL, rotation: 90, label: "RL", value: "1 kΩ" },
  wireRLgnd,
  { type: "ground", id: "GND", ...GND },
  // NEW — capacitor
  wireC1top,
  { type: "capacitor", id: "C1", ...C1, rotation: 90, label: "C1", value: "10 µF", highlight: true },
  wireC1gnd,
  { type: "probe", id: "pr_out", x: 350, y: 130, label: "Vout" },
  { type: "label", id: "lbl_10u", x: 190, y: 250, text: "C = 10 µF: moderate ripple" },
]};

/** Step 3: Replace with 47 µF, 220 µF, 1000 µF */
export const step03: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "lbl_title", x: 190, y: 20, text: "Vary Capacitance" },
  { type: "acsource", id: "VAC", ...VAC, label: "VAC", value: "12 Vrms" },
  wireVacTop, wireVacBot,
  { type: "diode", id: "D1", ...D1, rotation: 0, label: "D1" },
  { type: "diode", id: "D2", ...D2, rotation: 180, label: "D2" },
  wireD1D3, wireD2D4,
  { type: "diode", id: "D3", ...D3, rotation: -90, label: "D3" },
  { type: "diode", id: "D4", ...D4, rotation: 90, label: "D4" },
  wireD3Out, wireD4Gnd,
  juncPlus, juncMinus, juncGnd,
  juncD1, juncD2,
  { type: "wire", id: "w_junc_up", points: [{ x: 140, y: 70 }, { x: 140, y: 130 }] },
  { type: "wire", id: "w_junc_dn", points: [{ x: 140, y: 130 }, { x: 140, y: 190 }] },
  wireOutRL,
  { type: "resistor", id: "RL", ...RL, rotation: 90, label: "RL", value: "1 kΩ" },
  wireRLgnd,
  { type: "ground", id: "GND", ...GND },
  wireC1top,
  { type: "capacitor", id: "C1", ...C1, rotation: 90, label: "C1", value: "47→1000 µF", highlight: true },
  wireC1gnd,
  { type: "probe", id: "pr_out", x: 350, y: 130, label: "Vout" },
  { type: "label", id: "lbl_vary", x: 190, y: 250, text: "Larger C → smaller ripple (Vr ∝ 1/C)" },
]};

/** Step 4: Plot ripple factor vs capacitance */
export const step04: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "lbl_title", x: 190, y: 20, text: "Ripple Factor γ vs Capacitance" },
  { type: "acsource", id: "VAC", ...VAC, label: "VAC", value: "12 Vrms" },
  wireVacTop, wireVacBot,
  { type: "diode", id: "D1", ...D1, rotation: 0, label: "D1" },
  { type: "diode", id: "D2", ...D2, rotation: 180, label: "D2" },
  wireD1D3, wireD2D4,
  { type: "diode", id: "D3", ...D3, rotation: -90, label: "D3" },
  { type: "diode", id: "D4", ...D4, rotation: 90, label: "D4" },
  wireD3Out, wireD4Gnd,
  juncPlus, juncMinus, juncGnd,
  juncD1, juncD2,
  { type: "wire", id: "w_junc_up", points: [{ x: 140, y: 70 }, { x: 140, y: 130 }] },
  { type: "wire", id: "w_junc_dn", points: [{ x: 140, y: 130 }, { x: 140, y: 190 }] },
  wireOutRL,
  { type: "resistor", id: "RL", ...RL, rotation: 90, label: "RL", value: "1 kΩ" },
  wireRLgnd,
  { type: "ground", id: "GND", ...GND },
  wireC1top,
  { type: "capacitor", id: "C1", ...C1, rotation: 90, label: "C1", value: "vary" },
  wireC1gnd,
  { type: "voltmeter", id: "VM", x: 320, y: 180, label: "Vr(pp)", highlight: true },
  { type: "wire", id: "w_vm_top", points: [{ x: 320, y: 156 }, { x: 320, y: 130 }, { x: 310, y: 130 }] },
  { type: "wire", id: "w_vm_bot", points: [{ x: 320, y: 204 }, { x: 320, y: 240 }, { x: 180, y: 240 }] },
  { type: "label", id: "lbl_gamma", x: 190, y: 250, text: "γ = Vr(rms) / Vdc ≈ 1/(2√3 f RL C)" },
]};

/** Step 5: Observe diode surge current */
export const step05: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "lbl_title", x: 190, y: 20, text: "Diode Surge Current" },
  { type: "acsource", id: "VAC", ...VAC, label: "VAC", value: "12 Vrms" },
  wireVacTop, wireVacBot,
  { type: "diode", id: "D1", ...D1, rotation: 0, label: "D1" },
  { type: "diode", id: "D2", ...D2, rotation: 180, label: "D2" },
  wireD1D3, wireD2D4,
  { type: "diode", id: "D3", ...D3, rotation: -90, label: "D3" },
  { type: "diode", id: "D4", ...D4, rotation: 90, label: "D4" },
  wireD3Out, wireD4Gnd,
  juncPlus, juncMinus, juncGnd,
  juncD1, juncD2,
  { type: "wire", id: "w_junc_up", points: [{ x: 140, y: 70 }, { x: 140, y: 130 }] },
  { type: "wire", id: "w_junc_dn", points: [{ x: 140, y: 130 }, { x: 140, y: 190 }] },
  wireOutRL,
  { type: "resistor", id: "RL", ...RL, rotation: 90, label: "RL", value: "1 kΩ" },
  wireRLgnd,
  { type: "ground", id: "GND", ...GND },
  wireC1top,
  { type: "capacitor", id: "C1", ...C1, rotation: 90, label: "C1", value: "1000 µF", highlight: true },
  wireC1gnd,
  // Ammeter in diode path
  { type: "ammeter", id: "AM", x: 140, y: 40, rotation: 0, label: "ID(pk)", highlight: true },
  { type: "wire", id: "w_am_in", points: [{ x: 80, y: 70 }, { x: 80, y: 40 }, { x: 116, y: 40 }] },
  { type: "wire", id: "w_am_out", points: [{ x: 164, y: 40 }, { x: 200, y: 40 }, { x: 200, y: 70 }] },
  { type: "label", id: "lbl_surge", x: 190, y: 250, text: "Large C → short tall charging pulses" },
]};

/** Indexed array */
export const rectifiersCapacitorFiltersStepSchematics: SchematicData[] = [
  step01, step02, step03, step04, step05,
];

/** Theory diagram */
export const rectifiersCapacitorFiltersTheoryDiagram: SchematicData = step05;
