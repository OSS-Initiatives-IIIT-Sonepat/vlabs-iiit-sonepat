import { type SchematicData, type SchematicElement } from "@/labs/CircuitSchematic";

/*
 * Common-Base Amplifier — progressive 2D schematics.
 *
 * Circuit topology:
 *
 *                 ┌── RC ──[A]───────────┐
 *                 C ───┬──────── Ch2     │
 *        GND ─ B ─Q1   LED               VCC
 *                 E    │                 │
 *   Vin ── Cin ───┤    │                 │
 *                 RE   │                 │
 *   └─────────GND─┴────┴─────────────────┘
 */

const W = 410;
const H = 318;

// Positions
const Q1   = { x: 200, y: 150 }; // B (180,150), C (220,120), E (220,180)
const RC   = { x: 220, y: 70  }; // collector resistor (vertical)
const RE   = { x: 220, y: 230 }; // emitter resistor (vertical)
const AM   = { x: 300, y: 40  }; // collector ammeter (horizontal, in the VCC rail)
const VCC  = { x: 380, y: 160 }; // + (380,130), − (380,190)
const CIN  = { x: 100, y: 200 }; // input coupling capacitor
const VIN  = { x: 50,  y: 240 }; // AC input: (50,210), (50,270)
const LED  = { x: 300, y: 170 }; // output indicator: anode (300,150), cathode (300,190)
const GND  = { x: 140, y: 280 };
const GNDB = { x: 160, y: 170 }; // base tied to ground

// Wires
const wireVccTop: SchematicElement = { type: "wire", id: "w_vcc_top", points: [{ x: 380, y: 130 }, { x: 380, y: 40 }, { x: 324, y: 40 }] };
const wireVccGnd: SchematicElement = { type: "wire", id: "w_vcc_gnd", points: [{ x: 380, y: 190 }, { x: 380, y: 280 }, { x: 140, y: 280 }] };
const wireAmRc: SchematicElement   = { type: "wire", id: "w_am_rc",   points: [{ x: 276, y: 40 }, { x: 220, y: 40 }] };
const wireReGnd: SchematicElement  = { type: "wire", id: "w_re_gnd",  points: [{ x: 220, y: 260 }, { x: 220, y: 280 }] };
const wireCinEm: SchematicElement  = { type: "wire", id: "w_cin_em",  points: [{ x: 120, y: 200 }, { x: 220, y: 200 }] };
const wireLedGnd: SchematicElement = { type: "wire", id: "w_led_gnd", points: [{ x: 300, y: 190 }, { x: 300, y: 280 }] };
const wireBaseGnd: SchematicElement = { type: "wire", id: "w_base_gnd", points: [{ x: 180, y: 150 }, { x: 160, y: 150 }, { x: 160, y: 170 }] };
const wireEm: SchematicElement     = { type: "wire", id: "w_em",      points: [{ x: 220, y: 180 }, { x: 220, y: 200 }] };
const wireCol: SchematicElement    = { type: "wire", id: "w_col",     points: [{ x: 220, y: 100 }, { x: 220, y: 120 }] };
const wireColLed: SchematicElement = { type: "wire", id: "w_col_led", points: [{ x: 220, y: 110 }, { x: 300, y: 110 }, { x: 300, y: 150 }] };
const wireVinCin: SchematicElement = { type: "wire", id: "w_vin_cin", points: [{ x: 50, y: 210 }, { x: 50, y: 200 }, { x: 80, y: 200 }] };
const wireVinGnd: SchematicElement = { type: "wire", id: "w_vin_gnd", points: [{ x: 50, y: 270 }, { x: 50, y: 280 }, { x: 140, y: 280 }] };
const juncReGnd: SchematicElement  = { type: "junction", id: "j_re_gnd",  x: 220, y: 280 };
const juncLedGnd: SchematicElement = { type: "junction", id: "j_led_gnd", x: 300, y: 280 };
const juncCol: SchematicElement    = { type: "junction", id: "j_col",     x: 220, y: 110 };
const juncEm: SchematicElement     = { type: "junction", id: "j_em",      x: 220, y: 200 };
const juncGnd: SchematicElement    = { type: "junction", id: "j_gnd",     x: 140, y: 280 };

const gnd: SchematicElement = { type: "ground", id: "GND", ...GND };
const vcc = (highlight?: boolean): SchematicElement => ({ type: "vsource", id: "VCC", ...VCC, label: "VCC", value: "12 V", highlight });
const am = (highlight?: boolean): SchematicElement => ({ type: "ammeter", id: "AM", ...AM, rotation: 90, label: "IC", highlight });
const re = (highlight?: boolean): SchematicElement => ({ type: "resistor", id: "RE", ...RE, rotation: 90, label: "RE", value: "1 kΩ", highlight });
const rc = (highlight?: boolean): SchematicElement => ({ type: "resistor", id: "RC", ...RC, rotation: 90, label: "RC", value: "4.7 kΩ", highlight });
const cin = (highlight?: boolean): SchematicElement => ({ type: "capacitor", id: "CIN", ...CIN, label: "Cin", value: "10 µF", highlight });
const led = (highlight?: boolean): SchematicElement => ({ type: "led", id: "LED", ...LED, rotation: 90, label: "Out", color: "yellow", highlight });

// Parts placed in steps 2–7, before the transistor goes in.
const supply = [gnd, vcc(), wireVccTop, wireVccGnd];
const passives = [am(), wireAmRc, re(), wireReGnd, juncReGnd, rc()];

/** Step 1: Place breadboard */
export const step01: SchematicData = { width: W, height: H, elements: [
  gnd,
  { type: "label", id: "lbl_title", x: 205, y: 30, text: "Common-Base Amplifier" },
]};

/** Step 2: Connect DC power supply */
export const step02: SchematicData = { width: W, height: H, elements: [
  gnd,
  vcc(true),
  { ...wireVccTop, highlight: true },
  { ...wireVccGnd, highlight: true },
  { type: "junction", id: "t_vcc", x: 324, y: 40 },
]};

/** Step 3: Connect DMM as ammeter */
export const step03: SchematicData = { width: W, height: H, elements: [
  ...supply,
  am(true),
  { ...wireAmRc, highlight: true },
  { type: "junction", id: "t_rc", x: 220, y: 40 },
]};

/** Step 4: Insert emitter resistor RE and connect to GND */
export const step04: SchematicData = { width: W, height: H, elements: [
  ...supply,
  am(), wireAmRc,
  { type: "junction", id: "t_rc", x: 220, y: 40 },
  // NEW
  re(true),
  { ...wireReGnd, highlight: true },
  juncReGnd,
]};

/** Step 5: Insert collector resistor RC */
export const step05: SchematicData = { width: W, height: H, elements: [
  ...supply,
  am(), wireAmRc,
  re(), wireReGnd, juncReGnd,
  // NEW
  rc(true),
]};

/** Step 6: Insert input coupling capacitor CIN */
export const step06: SchematicData = { width: W, height: H, elements: [
  ...supply,
  ...passives,
  // NEW
  cin(true),
  { ...wireCinEm, highlight: true },
]};

/** Step 7: Insert output LED indicator */
export const step07: SchematicData = { width: W, height: H, elements: [
  ...supply,
  ...passives,
  cin(), wireCinEm,
  // NEW
  led(true),
  { ...wireLedGnd, highlight: true },
  juncLedGnd,
]};

/** Step 8: Wire the transistor: base to ground, collector to RC and the LED */
export const step08: SchematicData = { width: W, height: H, elements: [
  ...supply,
  ...passives,
  cin(), wireCinEm,
  led(), wireLedGnd, juncLedGnd,
  // NEW — full circuit with transistor
  { type: "npn-bjt", id: "Q1", ...Q1, label: "BC547", highlight: true },
  { ...wireBaseGnd, highlight: true },
  { type: "ground", id: "GND_B", ...GNDB },
  { ...wireEm, highlight: true },
  { ...wireCol, highlight: true },
  { ...wireColLed, highlight: true },
  juncCol,
  juncEm,
]};

/** Step 9: Power on and record characteristics */
export const step09: SchematicData = { width: W, height: H, elements: [
  ...supply,
  ...passives,
  cin(), wireCinEm,
  led(), wireLedGnd, juncLedGnd,
  { type: "npn-bjt", id: "Q1", ...Q1, label: "BC547" },
  wireBaseGnd,
  { type: "ground", id: "GND_B", ...GNDB },
  wireEm, wireCol, wireColLed, juncCol, juncEm,
  // AC input
  { type: "acsource", id: "VIN", ...VIN, label: "Vin", value: "10 mVpp", highlight: true },
  { ...wireVinCin, highlight: true },
  { ...wireVinGnd, highlight: true },
  juncGnd,
  // Probes
  { type: "junction", id: "j_pr_in", x: 60, y: 200 },
  { type: "wire", id: "w_pr_in", points: [{ x: 60, y: 200 }, { x: 60, y: 186 }] },
  { type: "probe", id: "pr_in", x: 60, y: 180, label: "Ch1" },
  { type: "junction", id: "j_pr_out", x: 300, y: 110 },
  { type: "wire", id: "w_pr_out", points: [{ x: 300, y: 110 }, { x: 334, y: 110 }], highlight: true },
  { type: "probe", id: "pr_out", x: 340, y: 110, label: "Ch2", highlight: true },
  { type: "label", id: "lbl_char", x: 205, y: 313, text: "CB: Low Zin, High Zout, Av ≈ gmRC, no inversion" },
]};

/** Indexed array */
export const cbAmplifierStepSchematics: SchematicData[] = [
  step01, step02, step03, step04, step05, step06, step07, step08, step09,
];

/** Theory diagram */
export const cbAmplifierTheoryDiagram: SchematicData = step09;
