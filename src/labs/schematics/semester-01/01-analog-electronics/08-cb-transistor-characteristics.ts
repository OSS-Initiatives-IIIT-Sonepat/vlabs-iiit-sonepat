import { type SchematicData, type SchematicElement } from "@/labs/CircuitSchematic";

/*
 * Common-Base Transistor Characteristics — progressive 2D schematics.
 *
 * Circuit topology:
 *
 *          ┌──[VCB]──┐ C ──[A_IC]──────────── VCC(+)
 *          │         Q1                          │ VCC(−)
 *   B ─────┤                                    ├── common
 *          ├──[VEB]──┐ E                         │ VEE(+)
 *          │         └── RE ──[A_IE]──────── VEE(−)
 *          └──GND──────────────────────────────┘ (base return)
 *
 *   The base is the common terminal: both supplies return to it.
 */

const W = 440;
const H = 315;

// Positions
const Q1   = { x: 200, y: 140 }; // transistor center: B (180,140), C (220,110), E (220,170)
const RE   = { x: 260, y: 240 }; // emitter resistor (horizontal)
const AIE  = { x: 330, y: 240 }; // emitter ammeter (horizontal)
const VEE  = { x: 380, y: 195 }; // emitter supply: + (380,165), − (380,225)
const AIC  = { x: 280, y: 50  }; // collector ammeter (horizontal)
const VCC  = { x: 380, y: 80  }; // collector supply: + (380,50), − (380,110)
const VMeb = { x: 180, y: 200 }; // VEB voltmeter (horizontal)
const VMcb = { x: 180, y: 70  }; // VCB voltmeter (horizontal)
const GND  = { x: 380, y: 280 }; // ground (on the base return)

// Wires
const wireBaseGnd: SchematicElement = { type: "wire", id: "w_base_gnd", points: [{ x: 180, y: 140 }, { x: 140, y: 140 }, { x: 140, y: 280 }, { x: 380, y: 280 }] };
const wireGndCommon: SchematicElement = { type: "wire", id: "w_gnd_common", points: [{ x: 380, y: 280 }, { x: 410, y: 280 }, { x: 410, y: 140 }, { x: 380, y: 140 }] };
const wireEmRe: SchematicElement = { type: "wire", id: "w_em_re", points: [{ x: 220, y: 170 }, { x: 220, y: 240 }, { x: 230, y: 240 }] };
const wireReAie: SchematicElement = { type: "wire", id: "w_re_aie", points: [{ x: 290, y: 240 }, { x: 306, y: 240 }] };
const wireAieVee: SchematicElement = { type: "wire", id: "w_aie_vee", points: [{ x: 354, y: 240 }, { x: 380, y: 240 }, { x: 380, y: 225 }] };
const wireVeeCommon: SchematicElement = { type: "wire", id: "w_vee_common", points: [{ x: 380, y: 165 }, { x: 380, y: 140 }] };
const wireColAic: SchematicElement = { type: "wire", id: "w_col_aic", points: [{ x: 220, y: 110 }, { x: 220, y: 50 }, { x: 256, y: 50 }] };
const wireAicVcc: SchematicElement = { type: "wire", id: "w_aic_vcc", points: [{ x: 304, y: 50 }, { x: 380, y: 50 }] };
const wireVccCommon: SchematicElement = { type: "wire", id: "w_vcc_common", points: [{ x: 380, y: 110 }, { x: 380, y: 140 }] };
const wireVmebB: SchematicElement = { type: "wire", id: "w_vmeb_b", points: [{ x: 140, y: 200 }, { x: 156, y: 200 }] };
const wireVmebE: SchematicElement = { type: "wire", id: "w_vmeb_e", points: [{ x: 204, y: 200 }, { x: 220, y: 200 }] };
const wireVmcbB: SchematicElement = { type: "wire", id: "w_vmcb_b", points: [{ x: 140, y: 140 }, { x: 140, y: 70 }, { x: 156, y: 70 }] };
const wireVmcbC: SchematicElement = { type: "wire", id: "w_vmcb_c", points: [{ x: 204, y: 70 }, { x: 220, y: 70 }] };
const juncGnd: SchematicElement = { type: "junction", id: "j_gnd", x: 380, y: 280 };
const juncCommon: SchematicElement = { type: "junction", id: "j_common", x: 380, y: 140 };
const juncEbB: SchematicElement = { type: "junction", id: "j_eb_b", x: 140, y: 200 };
const juncEbE: SchematicElement = { type: "junction", id: "j_eb_e", x: 220, y: 200 };
const juncCbB: SchematicElement = { type: "junction", id: "j_cb_b", x: 140, y: 140 };
const juncCbC: SchematicElement = { type: "junction", id: "j_cb_c", x: 220, y: 70 };

const q1 = (highlight?: boolean): SchematicElement => ({ type: "npn-bjt", id: "Q1", ...Q1, label: "BC547", highlight });
const gnd: SchematicElement = { type: "ground", id: "GND", ...GND };
const re = (highlight?: boolean): SchematicElement => ({ type: "resistor", id: "RE", ...RE, label: "RE", value: "470 Ω", highlight });
const vee = (value?: string, highlight?: boolean): SchematicElement => ({ type: "vsource", id: "VEE", ...VEE, label: "VEE", value, highlight });
const aie = (label = "IE", highlight?: boolean): SchematicElement => ({ type: "ammeter", id: "AIE", ...AIE, rotation: 90, label, highlight });
const vmeb = (highlight?: boolean): SchematicElement => ({ type: "voltmeter", id: "VMeb", ...VMeb, rotation: 90, label: "VEB", highlight });
const vcc = (value?: string, highlight?: boolean): SchematicElement => ({ type: "vsource", id: "VCC", ...VCC, label: "VCC", value, highlight });
const aic = (highlight?: boolean): SchematicElement => ({ type: "ammeter", id: "AIC", ...AIC, rotation: 90, label: "IC", highlight });
const vmcb = (label = "VCB", highlight?: boolean): SchematicElement => ({ type: "voltmeter", id: "VMcb", ...VMcb, rotation: 90, label, highlight });

// Emitter (input) loop and collector (output) loop, as built up by the procedure.
const emitterLoop = (veeValue = "0-5 V", ieLabel = "IE", highlight?: boolean): SchematicElement[] => [
  wireEmRe, re(), wireReAie, aie(ieLabel, highlight), wireAieVee,
  vee(veeValue, highlight), wireVeeCommon, wireGndCommon, juncGnd,
];
const ebMeter = (highlight?: boolean): SchematicElement[] => [
  wireVmebB, vmeb(highlight), wireVmebE, juncEbB, juncEbE,
];
const collectorLoop = (vccValue = "0-12 V", highlight?: boolean): SchematicElement[] => [
  wireColAic, aic(highlight), wireAicVcc, vcc(vccValue, highlight), wireVccCommon, juncCommon,
];
const cbMeter = (label = "VCB", highlight?: boolean): SchematicElement[] => [
  wireVmcbB, vmcb(label, highlight), wireVmcbC, juncCbB, juncCbC,
];

/** Step 1: Place transistor */
export const step01: SchematicData = { width: W, height: H, elements: [
  q1(true),
  { type: "label", id: "lbl_cb", x: 220, y: 305, text: "Common-Base Configuration" },
]};

/** Step 2: Connect base to ground */
export const step02: SchematicData = { width: W, height: H, elements: [
  q1(),
  { ...wireBaseGnd, highlight: true },
  gnd,
]};

/** Step 3: Add emitter resistor RE */
export const step03: SchematicData = { width: W, height: H, elements: [
  q1(),
  wireBaseGnd,
  gnd,
  re(true),
  { ...wireEmRe, highlight: true },
]};

/** Step 4: Connect emitter supply VEE and ammeter A_IE */
export const step04: SchematicData = { width: W, height: H, elements: [
  q1(),
  wireBaseGnd,
  gnd,
  wireEmRe,
  re(),
  { ...wireReAie, highlight: true },
  aie("IE", true),
  { ...wireAieVee, highlight: true },
  vee("0-5 V", true),
  { ...wireVeeCommon, highlight: true },
  { ...wireGndCommon, highlight: true },
  juncGnd,
]};

/** Step 5: Connect DMM across E-B junction */
export const step05: SchematicData = { width: W, height: H, elements: [
  q1(), wireBaseGnd, gnd,
  ...emitterLoop(),
  ...ebMeter(true),
]};

/** Step 6: Connect collector supply VCC and ammeter A_IC */
export const step06: SchematicData = { width: W, height: H, elements: [
  q1(), wireBaseGnd, gnd,
  ...emitterLoop(),
  ...ebMeter(),
  ...collectorLoop("0-12 V", true),
]};

/** Step 7: Connect voltmeter across C-B junction */
export const step07: SchematicData = { width: W, height: H, elements: [
  q1(), wireBaseGnd, gnd,
  ...emitterLoop(),
  ...ebMeter(),
  ...collectorLoop(),
  ...cbMeter("VCB", true),
]};

/** Step 8: Input characteristics at VCB = 0 V */
export const step08: SchematicData = { width: W, height: H, elements: [
  q1(), wireBaseGnd, gnd,
  ...emitterLoop("sweep", "IE", true),
  ...ebMeter(true),
  ...collectorLoop("0 V"),
  ...cbMeter("VCB = 0 V"),
  { type: "label", id: "lbl_inp", x: 220, y: 305, text: "Input: IE vs VEB at VCB = 0 V" },
]};

/** Step 9: Input characteristics at VCB = 5 V */
export const step09: SchematicData = { width: W, height: H, elements: [
  q1(), wireBaseGnd, gnd,
  ...emitterLoop("sweep"),
  ...ebMeter(),
  ...collectorLoop("5 V", true),
  ...cbMeter("VCB = 5 V", true),
  { type: "label", id: "lbl_inp5", x: 220, y: 305, text: "Input: IE vs VEB at VCB = 5 V" },
]};

/** Step 10: Output characteristics at constant IE */
export const step10: SchematicData = { width: W, height: H, elements: [
  q1(), wireBaseGnd, gnd,
  ...emitterLoop("adj", "IE = 2,4,6 mA"),
  ...ebMeter(),
  ...collectorLoop("sweep", true),
  ...cbMeter("VCB", true),
  { type: "label", id: "lbl_out", x: 220, y: 305, text: "Output: IC vs VCB at const IE" },
]};

/** Step 11: Calculate ri, ro, alpha */
export const step11: SchematicData = { width: W, height: H, elements: [
  q1(), wireBaseGnd, gnd,
  ...emitterLoop(undefined),
  ...ebMeter(),
  ...collectorLoop(undefined),
  ...cbMeter(),
  { type: "label", id: "lbl_ri", x: 66, y: 112, text: "ri = ΔVEB/ΔIE" },
  { type: "label", id: "lbl_ro", x: 66, y: 128, text: "ro = ΔVCB/ΔIC" },
  { type: "label", id: "lbl_alpha", x: 220, y: 305, text: "α = ΔIC/ΔIE ≈ 0.98" },
]};

/** Indexed array */
export const cbTransistorCharacteristicsStepSchematics: SchematicData[] = [
  step01, step02, step03, step04, step05, step06, step07, step08, step09, step10, step11,
];

/** Theory diagram */
export const cbTransistorCharacteristicsTheoryDiagram: SchematicData = step11;
