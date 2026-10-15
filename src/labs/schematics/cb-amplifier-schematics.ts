import { type SchematicData, type SchematicElement } from "@/labs/CircuitSchematic";

/*
 * Common-Base Amplifier — progressive 2D schematics.
 *
 * Circuit topology (similar to CB characteristics but as amplifier):
 *   VCC ── RC ── C─┐        ┌── Cout ── Vout
 *                  │ Q1     │
 *   GND ───────── B─┤       C
 *                  │        │
 *   Vin ── RE ── E─┴────────┘
 */

const W = 360;
const H = 280;

// Positions
const Q1   = { x: 180, y: 140 };
const RC   = { x: 220, y: 60 };
const RE   = { x: 100, y: 180 };
const COUT = { x: 300, y: 100 };
const CIN  = { x: 40, y: 180 };
const VCC  = { x: 260, y: 30 };
const VIN  = { x: 40, y: 230 };
const GND  = { x: 180, y: 260 };

// Wires
const wireVccRc: SchematicElement = { type: "wire", id: "w_vcc_rc", points: [{ x: 220, y: 30 }, { x: 260, y: 30 }] };
const wireRcCol: SchematicElement = { type: "wire", id: "w_rc_col", points: [{ x: 220, y: 90 }, { x: 220, y: 110 }, { x: 200, y: 110 }] };
const wireBaseGnd: SchematicElement = { type: "wire", id: "w_base_gnd", points: [{ x: 160, y: 140 }, { x: 140, y: 140 }, { x: 140, y: 260 }, { x: 180, y: 260 }] };
const wireEmRe: SchematicElement = { type: "wire", id: "w_em_re", points: [{ x: 200, y: 170 }, { x: 200, y: 180 }, { x: 130, y: 180 }] };
const wireReIn: SchematicElement = { type: "wire", id: "w_re_in", points: [{ x: 70, y: 180 }, { x: 60, y: 180 }] };
const wireCinIn: SchematicElement = { type: "wire", id: "w_cin_in", points: [{ x: 60, y: 180 }, { x: 70, y: 180 }] };
const wireVinCin: SchematicElement = { type: "wire", id: "w_vin_cin", points: [{ x: 40, y: 200 }, { x: 40, y: 180 }] };
const wireVinGnd: SchematicElement = { type: "wire", id: "w_vin_gnd", points: [{ x: 40, y: 260 }, { x: 180, y: 260 }] };
const wireCoutCol: SchematicElement = { type: "wire", id: "w_cout_col", points: [{ x: 220, y: 100 }, { x: 280, y: 100 }] };
const wireCoutOut: SchematicElement = { type: "wire", id: "w_cout_out", points: [{ x: 320, y: 100 }, { x: 340, y: 100 }] };
const juncCol: SchematicElement = { type: "junction", id: "j_col", x: 220, y: 100 };
const juncGnd: SchematicElement = { type: "junction", id: "j_gnd", x: 180, y: 260 };

/** Step 1: Place breadboard */
export const step01: SchematicData = { width: W, height: H, elements: [
  { type: "ground", id: "GND", ...GND },
  { type: "label", id: "lbl_title", x: 180, y: 30, text: "Common-Base Amplifier" },
]};

/** Step 2: Connect DC power supply */
export const step02: SchematicData = { width: W, height: H, elements: [
  { type: "ground", id: "GND", ...GND },
  { type: "vsource", id: "VCC", ...VCC, rotation: 90, label: "VCC", value: "12 V", highlight: true },
  wireVccRc,
  { type: "wire", id: "w_vcc_gnd", points: [{ x: 260, y: 60 }, { x: 260, y: 260 }, { x: 180, y: 260 }] },
]};

/** Step 3: Connect DMM as ammeter */
export const step03: SchematicData = { width: W, height: H, elements: [
  { type: "ground", id: "GND", ...GND },
  { type: "vsource", id: "VCC", ...VCC, rotation: 90, label: "VCC", value: "12 V" },
  wireVccRc,
  { type: "wire", id: "w_vcc_gnd", points: [{ x: 260, y: 60 }, { x: 260, y: 260 }, { x: 180, y: 260 }] },
  juncGnd,
  { type: "ammeter", id: "AM", x: 280, y: 60, rotation: 90, label: "IC", highlight: true },
]};

/** Step 4: Insert emitter resistor RE and connect to GND */
export const step04: SchematicData = { width: W, height: H, elements: [
  { type: "ground", id: "GND", ...GND },
  { type: "vsource", id: "VCC", ...VCC, rotation: 90, label: "VCC", value: "12 V" },
  wireVccRc,
  juncGnd,
  // NEW
  { type: "resistor", id: "RE", ...RE, label: "RE", value: "1 kΩ", highlight: true },
  { type: "wire", id: "w_re_gnd", points: [{ x: 100, y: 210 }, { x: 100, y: 260 }, { x: 180, y: 260 }], highlight: true },
]};

/** Step 5: Insert collector resistor RC */
export const step05: SchematicData = { width: W, height: H, elements: [
  { type: "ground", id: "GND", ...GND },
  { type: "vsource", id: "VCC", ...VCC, rotation: 90, label: "VCC", value: "12 V" },
  juncGnd,
  { type: "resistor", id: "RE", ...RE, label: "RE", value: "1 kΩ" },
  { type: "wire", id: "w_re_gnd", points: [{ x: 100, y: 210 }, { x: 100, y: 260 }, { x: 180, y: 260 }] },
  // NEW
  { type: "resistor", id: "RC", ...RC, rotation: 90, label: "RC", value: "4.7 kΩ", highlight: true },
  wireVccRc,
  { type: "wire", id: "w_rc_vcc", points: [{ x: 220, y: 30 }, { x: 220, y: 30 }] },
]};

/** Step 6: Insert input coupling capacitor CIN */
export const step06: SchematicData = { width: W, height: H, elements: [
  { type: "ground", id: "GND", ...GND },
  { type: "vsource", id: "VCC", ...VCC, rotation: 90, label: "VCC", value: "12 V" },
  juncGnd,
  { type: "resistor", id: "RE", ...RE, label: "RE", value: "1 kΩ" },
  { type: "wire", id: "w_re_gnd", points: [{ x: 100, y: 210 }, { x: 100, y: 260 }, { x: 180, y: 260 }] },
  { type: "resistor", id: "RC", ...RC, rotation: 90, label: "RC", value: "4.7 kΩ" },
  wireVccRc,
  wireReIn,
  // NEW
  { type: "capacitor", id: "CIN", ...CIN, label: "Cin", value: "10 µF", highlight: true },
]};

/** Step 7: Insert output LED indicator */
export const step07: SchematicData = { width: W, height: H, elements: [
  { type: "ground", id: "GND", ...GND },
  { type: "vsource", id: "VCC", ...VCC, rotation: 90, label: "VCC", value: "12 V" },
  juncGnd,
  { type: "resistor", id: "RE", ...RE, label: "RE", value: "1 kΩ" },
  { type: "wire", id: "w_re_gnd", points: [{ x: 100, y: 210 }, { x: 100, y: 260 }, { x: 180, y: 260 }] },
  { type: "resistor", id: "RC", ...RC, rotation: 90, label: "RC", value: "4.7 kΩ" },
  wireVccRc,
  wireReIn,
  { type: "capacitor", id: "CIN", ...CIN, label: "Cin", value: "10 µF" },
  // NEW
  { type: "led", id: "LED", x: 300, y: 140, rotation: 90, label: "Out", color: "yellow", highlight: true },
]};

/** Step 8: Wire RC output to LED anode */
export const step08: SchematicData = { width: W, height: H, elements: [
  { type: "ground", id: "GND", ...GND },
  { type: "vsource", id: "VCC", ...VCC, rotation: 90, label: "VCC", value: "12 V" },
  juncGnd,
  { type: "resistor", id: "RE", ...RE, label: "RE", value: "1 kΩ" },
  { type: "wire", id: "w_re_gnd", points: [{ x: 100, y: 210 }, { x: 100, y: 260 }, { x: 180, y: 260 }] },
  { type: "resistor", id: "RC", ...RC, rotation: 90, label: "RC", value: "4.7 kΩ" },
  wireVccRc,
  wireReIn,
  { type: "capacitor", id: "CIN", ...CIN, label: "Cin", value: "10 µF" },
  { type: "led", id: "LED", x: 300, y: 140, rotation: 90, label: "Out", color: "yellow" },
  // Full circuit with transistor
  { type: "npn-bjt", id: "Q1", ...Q1, label: "BC547", highlight: true },
  { ...wireBaseGnd, highlight: true },
  { ...wireRcCol, highlight: true },
  { ...wireEmRe, highlight: true },
  { type: "wire", id: "w_led_col", points: [{ x: 220, y: 100 }, { x: 300, y: 100 }, { x: 300, y: 120 }], highlight: true },
  { type: "wire", id: "w_led_gnd", points: [{ x: 300, y: 160 }, { x: 300, y: 260 }, { x: 180, y: 260 }] },
  juncCol,
]};

/** Step 9: Power on and record characteristics */
export const step09: SchematicData = { width: W, height: H, elements: [
  { type: "ground", id: "GND", ...GND },
  { type: "vsource", id: "VCC", ...VCC, rotation: 90, label: "VCC", value: "12 V" },
  juncGnd,
  { type: "resistor", id: "RE", ...RE, label: "RE", value: "1 kΩ" },
  { type: "wire", id: "w_re_gnd", points: [{ x: 100, y: 210 }, { x: 100, y: 260 }, { x: 180, y: 260 }] },
  { type: "resistor", id: "RC", ...RC, rotation: 90, label: "RC", value: "4.7 kΩ" },
  wireVccRc,
  { type: "capacitor", id: "CIN", ...CIN, label: "Cin", value: "10 µF" },
  { type: "led", id: "LED", x: 300, y: 140, rotation: 90, label: "Out", color: "yellow" },
  { type: "npn-bjt", id: "Q1", ...Q1, label: "BC547" },
  wireBaseGnd,
  wireRcCol,
  wireEmRe,
  wireReIn,
  { type: "wire", id: "w_led_col", points: [{ x: 220, y: 100 }, { x: 300, y: 100 }, { x: 300, y: 120 }] },
  { type: "wire", id: "w_led_gnd", points: [{ x: 300, y: 160 }, { x: 300, y: 260 }, { x: 180, y: 260 }] },
  juncCol,
  // AC input
  { type: "acsource", id: "VIN", ...VIN, label: "Vin", value: "10 mVpp", highlight: true },
  wireVinCin,
  { ...wireVinGnd, highlight: true },
  // Probes
  { type: "probe", id: "pr_in", x: 60, y: 200, label: "Ch1" },
  { type: "probe", id: "pr_out", x: 330, y: 100, label: "Ch2", highlight: true },
  { type: "label", id: "lbl_char", x: 180, y: 270, text: "CB: Low Zin, High Zout, Av ≈ gmRC, no inversion" },
]};

/** Indexed array */
export const cbAmplifierStepSchematics: SchematicData[] = [
  step01, step02, step03, step04, step05, step06, step07, step08, step09,
];

/** Theory diagram */
export const cbAmplifierTheoryDiagram: SchematicData = step09;
