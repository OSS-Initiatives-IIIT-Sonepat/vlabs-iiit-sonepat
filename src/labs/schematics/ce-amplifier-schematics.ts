import { type SchematicData, type SchematicElement } from "@/labs/CircuitSchematic";

/*
 * Common Emitter BJT Amplifier — progressive 2D schematics.
 *
 * Circuit topology (voltage-divider bias):
 *   VCC ──┬── R1 ──┬── RC ──┬── Cout ── Vout
 *         │       │        │
 *         │       B        C
 *         │       │ Q1     │
 *         │       E        │
 *         │       │        │
 *         ├── R2 ─┴── RE ──┤
 *         │                │
 *        GND ──────────────┘
 *
 *   Cin couples input signal to base.
 *   CE (bypass cap) shorts RE at AC for max gain.
 */

const W = 360;
const H = 300;

// Positions
const VCC  = { x: 180, y: 30 };  // top rail
const R1   = { x: 80, y: 80 };   // bias resistor (vertical)
const R2   = { x: 80, y: 180 };  // bias resistor (vertical)
const RC   = { x: 220, y: 80 };  // collector load (vertical)
const RE   = { x: 220, y: 220 }; // emitter resistor (vertical)
const Q1   = { x: 150, y: 150 }; // transistor
const CIN  = { x: 30, y: 150 };  // input coupling cap
const COUT = { x: 300, y: 80 };  // output coupling cap
const CE   = { x: 280, y: 220 }; // emitter bypass cap
const GND  = { x: 180, y: 280 }; // ground

// Common wires
const wireVccTop: SchematicElement = { type: "wire", id: "w_vcc_top", points: [{ x: 80, y: 30 }, { x: 280, y: 30 }] };
const wireR1toQ: SchematicElement = { type: "wire", id: "w_r1_q", points: [{ x: 80, y: 110 }, { x: 80, y: 150 }, { x: 130, y: 150 }] };
const wireR2toGnd: SchematicElement = { type: "wire", id: "w_r2_gnd", points: [{ x: 80, y: 210 }, { x: 80, y: 260 }, { x: 180, y: 260 }] };
const wireQcollector: SchematicElement = { type: "wire", id: "w_q_col", points: [{ x: 170, y: 120 }, { x: 170, y: 80 }, { x: 190, y: 80 }] };
const wireRCup: SchematicElement = { type: "wire", id: "w_rc_up", points: [{ x: 220, y: 50 }, { x: 220, y: 30 }] };
const wireQemitter: SchematicElement = { type: "wire", id: "w_q_em", points: [{ x: 170, y: 180 }, { x: 170, y: 220 }, { x: 190, y: 220 }] };
const wireREdown: SchematicElement = { type: "wire", id: "w_re_down", points: [{ x: 220, y: 250 }, { x: 220, y: 260 }, { x: 180, y: 260 }] };
const wireR1up: SchematicElement = { type: "wire", id: "w_r1_up", points: [{ x: 80, y: 50 }, { x: 80, y: 30 }] };
const wireR1R2: SchematicElement = { type: "wire", id: "w_r1_r2", points: [{ x: 80, y: 110 }, { x: 80, y: 150 }] };
const wireCinIn: SchematicElement = { type: "wire", id: "w_cin_in", points: [{ x: 50, y: 150 }, { x: 80, y: 150 }] };
const wireCoutOut: SchematicElement = { type: "wire", id: "w_cout_out", points: [{ x: 220, y: 80 }, { x: 250, y: 80 }, { x: 280, y: 80 }] };
const wireCEpar: SchematicElement = { type: "wire", id: "w_ce_par", points: [{ x: 250, y: 220 }, { x: 260, y: 220 }] };
const wireCEgnd: SchematicElement = { type: "wire", id: "w_ce_gnd", points: [{ x: 300, y: 220 }, { x: 320, y: 220 }, { x: 320, y: 260 }, { x: 180, y: 260 }] };
const juncBase: SchematicElement = { type: "junction", id: "j_base", x: 80, y: 150 };
const juncCol: SchematicElement = { type: "junction", id: "j_col", x: 220, y: 80 };
const juncEm: SchematicElement = { type: "junction", id: "j_em", x: 220, y: 220 };
const juncGnd: SchematicElement = { type: "junction", id: "j_gnd", x: 180, y: 260 };

/** Step 1: Calculate the DC Q-point — show circuit topology with values */
export const step01: SchematicData = { width: W, height: H, elements: [
  { type: "vsource", id: "VCC", x: 180, y: 30, rotation: 90, label: "VCC", value: "12 V", highlight: true },
  wireVccTop,
  wireR1up,
  { type: "resistor", id: "R1", ...R1, rotation: 90, label: "R1", value: "100 kΩ", highlight: true },
  wireR1R2,
  { type: "resistor", id: "R2", ...R2, rotation: 90, label: "R2", value: "10 kΩ", highlight: true },
  wireR2toGnd,
  { type: "ground", id: "GND", ...GND },
  { type: "label", id: "lbl_vb", x: 60, y: 130, text: "VB ≈ 1.09 V" },
  { type: "label", id: "lbl_calc", x: 180, y: 295, text: "Q-point: IC ≈ 0.39 mA, VCE ≈ 9.78 V" },
]};

/** Step 2: Assemble the CE amplifier circuit — add transistor + load resistors */
export const step02: SchematicData = { width: W, height: H, elements: [
  { type: "vsource", id: "VCC", x: 180, y: 30, rotation: 90, label: "VCC", value: "12 V" },
  wireVccTop,
  wireR1up,
  { type: "resistor", id: "R1", ...R1, rotation: 90, label: "R1", value: "100 kΩ" },
  wireR1R2,
  { type: "resistor", id: "R2", ...R2, rotation: 90, label: "R2", value: "10 kΩ" },
  wireR2toGnd,
  { type: "ground", id: "GND", ...GND },
  juncBase,
  wireR1toQ,
  // NEW
  { type: "npn-bjt", id: "Q1", ...Q1, label: "BC547", highlight: true },
  wireQcollector,
  { type: "resistor", id: "RC", ...RC, rotation: 90, label: "RC", value: "4.7 kΩ", highlight: true },
  wireRCup,
  wireQemitter,
  { type: "resistor", id: "RE", ...RE, rotation: 90, label: "RE", value: "1 kΩ", highlight: true },
  wireREdown,
  juncGnd,
]};

/** Step 3: Verify DC Q-point with DMM — add voltmeter probes */
export const step03: SchematicData = { width: W, height: H, elements: [
  { type: "vsource", id: "VCC", x: 180, y: 30, rotation: 90, label: "VCC", value: "12 V" },
  wireVccTop,
  wireR1up,
  { type: "resistor", id: "R1", ...R1, rotation: 90, label: "R1", value: "100 kΩ" },
  wireR1R2,
  { type: "resistor", id: "R2", ...R2, rotation: 90, label: "R2", value: "10 kΩ" },
  wireR2toGnd,
  { type: "ground", id: "GND", ...GND },
  juncBase,
  wireR1toQ,
  { type: "npn-bjt", id: "Q1", ...Q1, label: "BC547" },
  wireQcollector,
  { type: "resistor", id: "RC", ...RC, rotation: 90, label: "RC", value: "4.7 kΩ" },
  wireRCup,
  wireQemitter,
  { type: "resistor", id: "RE", ...RE, rotation: 90, label: "RE", value: "1 kΩ" },
  wireREdown,
  juncGnd,
  juncCol,
  juncEm,
  // NEW — voltmeter probes
  { type: "probe", id: "pr_vb", x: 100, y: 150, label: "VB", highlight: true },
  { type: "probe", id: "pr_vc", x: 200, y: 80, label: "VC", highlight: true },
  { type: "probe", id: "pr_ve", x: 200, y: 220, label: "VE", highlight: true },
  { type: "label", id: "lbl_vce", x: 280, y: 150, text: "VCE = VC − VE" },
]};

/** Step 4: Apply signal and observe voltage gain — add coupling caps + AC source */
export const step04: SchematicData = { width: W, height: H, elements: [
  { type: "vsource", id: "VCC", x: 180, y: 30, rotation: 90, label: "VCC", value: "12 V" },
  wireVccTop,
  wireR1up,
  { type: "resistor", id: "R1", ...R1, rotation: 90, label: "R1", value: "100 kΩ" },
  wireR1R2,
  { type: "resistor", id: "R2", ...R2, rotation: 90, label: "R2", value: "10 kΩ" },
  wireR2toGnd,
  { type: "ground", id: "GND", ...GND },
  juncBase,
  wireR1toQ,
  { type: "npn-bjt", id: "Q1", ...Q1, label: "BC547" },
  wireQcollector,
  { type: "resistor", id: "RC", ...RC, rotation: 90, label: "RC", value: "4.7 kΩ" },
  wireRCup,
  wireQemitter,
  { type: "resistor", id: "RE", ...RE, rotation: 90, label: "RE", value: "1 kΩ" },
  wireREdown,
  juncGnd,
  juncCol,
  juncEm,
  // NEW — coupling capacitors + AC source
  { type: "capacitor", id: "CIN", ...CIN, label: "Cin", value: "10 µF", highlight: true },
  wireCinIn,
  { type: "acsource", id: "VIN", x: 30, y: 200, label: "Vin", value: "10 mVpp", highlight: true },
  { type: "wire", id: "w_vin_cin", points: [{ x: 30, y: 170 }, { x: 30, y: 150 }], highlight: true },
  { type: "wire", id: "w_vin_gnd", points: [{ x: 30, y: 230 }, { x: 30, y: 260 }, { x: 80, y: 260 }] },
  wireCoutOut,
  { type: "capacitor", id: "COUT", ...COUT, label: "Cout", value: "10 µF", highlight: true },
  { type: "wire", id: "w_cout_rl", points: [{ x: 320, y: 80 }, { x: 340, y: 80 }] },
  { type: "probe", id: "pr_out", x: 340, y: 80, label: "Vout", highlight: true },
  { type: "label", id: "lbl_gain", x: 180, y: 295, text: "Av = Vout/Vin (180° phase shift)" },
]};

/** Step 5: Plot the frequency response — add bypass cap, show full circuit */
export const step05: SchematicData = { width: W, height: H, elements: [
  { type: "vsource", id: "VCC", x: 180, y: 30, rotation: 90, label: "VCC", value: "12 V" },
  wireVccTop,
  wireR1up,
  { type: "resistor", id: "R1", ...R1, rotation: 90, label: "R1", value: "100 kΩ" },
  wireR1R2,
  { type: "resistor", id: "R2", ...R2, rotation: 90, label: "R2", value: "10 kΩ" },
  wireR2toGnd,
  { type: "ground", id: "GND", ...GND },
  juncBase,
  wireR1toQ,
  { type: "npn-bjt", id: "Q1", ...Q1, label: "BC547" },
  wireQcollector,
  { type: "resistor", id: "RC", ...RC, rotation: 90, label: "RC", value: "4.7 kΩ" },
  wireRCup,
  wireQemitter,
  { type: "resistor", id: "RE", ...RE, rotation: 90, label: "RE", value: "1 kΩ" },
  wireREdown,
  juncGnd,
  juncCol,
  juncEm,
  { type: "capacitor", id: "CIN", ...CIN, label: "Cin", value: "10 µF" },
  wireCinIn,
  { type: "acsource", id: "VIN", x: 30, y: 200, label: "Vin", value: "10 mVpp" },
  { type: "wire", id: "w_vin_cin", points: [{ x: 30, y: 170 }, { x: 30, y: 150 }] },
  { type: "wire", id: "w_vin_gnd", points: [{ x: 30, y: 230 }, { x: 30, y: 260 }, { x: 80, y: 260 }] },
  wireCoutOut,
  { type: "capacitor", id: "COUT", ...COUT, label: "Cout", value: "10 µF" },
  { type: "wire", id: "w_cout_rl", points: [{ x: 320, y: 80 }, { x: 340, y: 80 }] },
  { type: "probe", id: "pr_out", x: 340, y: 80, label: "Vout" },
  // NEW — bypass capacitor across RE
  wireCEpar,
  { type: "capacitor", id: "CE", ...CE, rotation: 90, label: "CE", value: "100 µF", highlight: true },
  wireCEgnd,
  { type: "label", id: "lbl_freq", x: 180, y: 295, text: "Sweep 100 Hz → 100 kHz, plot Av(dB) vs f" },
]};

/** Indexed array for easy lookup */
export const ceAmplifierStepSchematics: SchematicData[] = [
  step01, step02, step03, step04, step05,
];

/** Theory diagram — full CE amplifier circuit */
export const ceAmplifierTheoryDiagram: SchematicData = step05;
