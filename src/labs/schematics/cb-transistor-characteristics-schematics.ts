import { type SchematicData, type SchematicElement } from "@/labs/CircuitSchematic";

/*
 * Common-Base Transistor Characteristics — progressive 2D schematics.
 *
 * Circuit topology:
 *   VEE(−) ──[A_IE]── RE ── E─┐
 *                             │ Q1 (CB)
 *   GND ─────────────────── B─┤
 *                             │
 *   VCC(+) ──[A_IC]────────── C─┘
 *
 *   Voltmeters: VEB across E-B, VCB across C-B
 */

const W = 380;
const H = 280;

// Positions
const Q1   = { x: 200, y: 140 }; // transistor center
const RE   = { x: 80, y: 140 };  // emitter resistor (horizontal)
const VEE  = { x: 40, y: 200 };  // emitter supply
const VCC  = { x: 320, y: 60 };  // collector supply
const AIE  = { x: 40, y: 100 };  // emitter ammeter
const AIC  = { x: 280, y: 60 };  // collector ammeter
const VMeb = { x: 140, y: 200 }; // VEB voltmeter
const VMcb = { x: 280, y: 200 }; // VCB voltmeter
const GND  = { x: 200, y: 250 }; // ground

// Base wires
const wireBaseGnd: SchematicElement = { type: "wire", id: "w_base_gnd", points: [{ x: 180, y: 140 }, { x: 180, y: 250 }, { x: 200, y: 250 }] };
const wireVeeUp: SchematicElement = { type: "wire", id: "w_vee_up", points: [{ x: 40, y: 170 }, { x: 40, y: 76 }] };
const wireVeeGnd: SchematicElement = { type: "wire", id: "w_vee_gnd", points: [{ x: 40, y: 230 }, { x: 40, y: 250 }, { x: 200, y: 250 }] };
const wireAieRe: SchematicElement = { type: "wire", id: "w_aie_re", points: [{ x: 40, y: 124 }, { x: 40, y: 140 }, { x: 50, y: 140 }] };
const wireReQ: SchematicElement = { type: "wire", id: "w_re_q", points: [{ x: 110, y: 140 }, { x: 180, y: 140 }] };
const wireVccDown: SchematicElement = { type: "wire", id: "w_vcc_down", points: [{ x: 320, y: 90 }, { x: 320, y: 110 }, { x: 220, y: 110 }] };
const wireAicCol: SchematicElement = { type: "wire", id: "w_aic_col", points: [{ x: 256, y: 60 }, { x: 220, y: 60 }, { x: 220, y: 110 }] };
const wireVccAic: SchematicElement = { type: "wire", id: "w_vcc_aic", points: [{ x: 320, y: 30 }, { x: 320, y: 60 }, { x: 304, y: 60 }] };
const wireVmebE: SchematicElement = { type: "wire", id: "w_vmeb_e", points: [{ x: 140, y: 140 }, { x: 140, y: 176 }] };
const wireVmebB: SchematicElement = { type: "wire", id: "w_vmeb_b", points: [{ x: 140, y: 224 }, { x: 140, y: 250 }] };
const wireVmcbC: SchematicElement = { type: "wire", id: "w_vmcb_c", points: [{ x: 220, y: 110 }, { x: 280, y: 110 }, { x: 280, y: 176 }] };
const wireVmcbB: SchematicElement = { type: "wire", id: "w_vmcb_b", points: [{ x: 280, y: 224 }, { x: 280, y: 250 }, { x: 200, y: 250 }] };
const juncE: SchematicElement = { type: "junction", id: "j_e", x: 140, y: 140 };
const juncC: SchematicElement = { type: "junction", id: "j_c", x: 220, y: 110 };
const juncGnd: SchematicElement = { type: "junction", id: "j_gnd", x: 200, y: 250 };
const juncB: SchematicElement = { type: "junction", id: "j_b", x: 180, y: 250 };

/** Step 1: Place transistor */
export const step01: SchematicData = { width: W, height: H, elements: [
  { type: "npn-bjt", id: "Q1", ...Q1, label: "BC547", highlight: true },
  { type: "label", id: "lbl_cb", x: 200, y: 270, text: "Common-Base Configuration" },
]};

/** Step 2: Connect base to ground */
export const step02: SchematicData = { width: W, height: H, elements: [
  { type: "npn-bjt", id: "Q1", ...Q1, label: "BC547" },
  { ...wireBaseGnd, highlight: true },
  { type: "ground", id: "GND", ...GND },
]};

/** Step 3: Add emitter resistor RE */
export const step03: SchematicData = { width: W, height: H, elements: [
  { type: "npn-bjt", id: "Q1", ...Q1, label: "BC547" },
  wireBaseGnd,
  { type: "ground", id: "GND", ...GND },
  { type: "resistor", id: "RE", ...RE, label: "RE", value: "470 Ω", highlight: true },
  { ...wireReQ, highlight: true },
]};

/** Step 4: Connect emitter supply VEE and ammeter A_IE */
export const step04: SchematicData = { width: W, height: H, elements: [
  { type: "npn-bjt", id: "Q1", ...Q1, label: "BC547" },
  wireBaseGnd,
  { type: "ground", id: "GND", ...GND },
  { type: "resistor", id: "RE", ...RE, label: "RE", value: "470 Ω" },
  wireReQ,
  juncGnd,
  { type: "vsource", id: "VEE", ...VEE, label: "VEE", value: "0-5 V", highlight: true },
  { ...wireVeeUp, highlight: true },
  { ...wireVeeGnd, highlight: true },
  { type: "ammeter", id: "AIE", ...AIE, label: "IE", highlight: true },
  { ...wireAieRe, highlight: true },
]};

/** Step 5: Connect DMM across E-B junction */
export const step05: SchematicData = { width: W, height: H, elements: [
  { type: "npn-bjt", id: "Q1", ...Q1, label: "BC547" },
  wireBaseGnd,
  { type: "ground", id: "GND", ...GND },
  { type: "resistor", id: "RE", ...RE, label: "RE", value: "470 Ω" },
  wireReQ,
  juncGnd,
  { type: "vsource", id: "VEE", ...VEE, label: "VEE", value: "0-5 V" },
  wireVeeUp,
  wireVeeGnd,
  { type: "ammeter", id: "AIE", ...AIE, label: "IE" },
  wireAieRe,
  juncE,
  { ...wireVmebE, highlight: true },
  { type: "voltmeter", id: "VMeb", ...VMeb, label: "VEB", highlight: true },
  { ...wireVmebB, highlight: true },
]};

/** Step 6: Connect collector supply VCC and ammeter A_IC */
export const step06: SchematicData = { width: W, height: H, elements: [
  { type: "npn-bjt", id: "Q1", ...Q1, label: "BC547" },
  wireBaseGnd,
  { type: "ground", id: "GND", ...GND },
  { type: "resistor", id: "RE", ...RE, label: "RE", value: "470 Ω" },
  wireReQ,
  juncGnd,
  { type: "vsource", id: "VEE", ...VEE, label: "VEE", value: "0-5 V" },
  wireVeeUp,
  wireVeeGnd,
  { type: "ammeter", id: "AIE", ...AIE, label: "IE" },
  wireAieRe,
  juncE,
  wireVmebE,
  { type: "voltmeter", id: "VMeb", ...VMeb, label: "VEB" },
  wireVmebB,
  // NEW
  { type: "vsource", id: "VCC", ...VCC, rotation: 180, label: "VCC", value: "0-12 V", highlight: true },
  { ...wireVccAic, highlight: true },
  { type: "ammeter", id: "AIC", ...AIC, rotation: 90, label: "IC", highlight: true },
  { ...wireAicCol, highlight: true },
  { ...wireVccDown, highlight: true },
  juncC,
]};

/** Step 7: Connect voltmeter across C-B junction */
export const step07: SchematicData = { width: W, height: H, elements: [
  { type: "npn-bjt", id: "Q1", ...Q1, label: "BC547" },
  wireBaseGnd,
  { type: "ground", id: "GND", ...GND },
  { type: "resistor", id: "RE", ...RE, label: "RE", value: "470 Ω" },
  wireReQ,
  juncGnd, juncB,
  { type: "vsource", id: "VEE", ...VEE, label: "VEE", value: "0-5 V" },
  wireVeeUp, wireVeeGnd,
  { type: "ammeter", id: "AIE", ...AIE, label: "IE" },
  wireAieRe, juncE,
  wireVmebE,
  { type: "voltmeter", id: "VMeb", ...VMeb, label: "VEB" },
  wireVmebB,
  { type: "vsource", id: "VCC", ...VCC, rotation: 180, label: "VCC", value: "0-12 V" },
  wireVccAic,
  { type: "ammeter", id: "AIC", ...AIC, rotation: 90, label: "IC" },
  wireAicCol, wireVccDown, juncC,
  // NEW
  { ...wireVmcbC, highlight: true },
  { type: "voltmeter", id: "VMcb", ...VMcb, label: "VCB", highlight: true },
  { ...wireVmcbB, highlight: true },
]};

/** Step 8: Input characteristics at VCB = 0 V */
export const step08: SchematicData = { width: W, height: H, elements: [
  { type: "npn-bjt", id: "Q1", ...Q1, label: "BC547" },
  wireBaseGnd,
  { type: "ground", id: "GND", ...GND },
  { type: "resistor", id: "RE", ...RE, label: "RE", value: "470 Ω" },
  wireReQ, juncGnd, juncB,
  { type: "vsource", id: "VEE", ...VEE, label: "VEE", value: "sweep", highlight: true },
  wireVeeUp, wireVeeGnd,
  { type: "ammeter", id: "AIE", ...AIE, label: "IE", highlight: true },
  wireAieRe, juncE,
  wireVmebE,
  { type: "voltmeter", id: "VMeb", ...VMeb, label: "VEB", highlight: true },
  wireVmebB,
  { type: "vsource", id: "VCC", ...VCC, rotation: 180, label: "VCC", value: "0 V" },
  wireVccAic,
  { type: "ammeter", id: "AIC", ...AIC, rotation: 90, label: "IC" },
  wireAicCol, wireVccDown, juncC,
  wireVmcbC,
  { type: "voltmeter", id: "VMcb", ...VMcb, label: "VCB = 0 V" },
  wireVmcbB,
  { type: "label", id: "lbl_inp", x: 200, y: 270, text: "Input: IE vs VEB at VCB = 0 V" },
]};

/** Step 9: Input characteristics at VCB = 5 V */
export const step09: SchematicData = { width: W, height: H, elements: [
  { type: "npn-bjt", id: "Q1", ...Q1, label: "BC547" },
  wireBaseGnd,
  { type: "ground", id: "GND", ...GND },
  { type: "resistor", id: "RE", ...RE, label: "RE", value: "470 Ω" },
  wireReQ, juncGnd, juncB,
  { type: "vsource", id: "VEE", ...VEE, label: "VEE", value: "sweep" },
  wireVeeUp, wireVeeGnd,
  { type: "ammeter", id: "AIE", ...AIE, label: "IE" },
  wireAieRe, juncE,
  wireVmebE,
  { type: "voltmeter", id: "VMeb", ...VMeb, label: "VEB" },
  wireVmebB,
  { type: "vsource", id: "VCC", ...VCC, rotation: 180, label: "VCC", value: "5 V", highlight: true },
  wireVccAic,
  { type: "ammeter", id: "AIC", ...AIC, rotation: 90, label: "IC" },
  wireAicCol, wireVccDown, juncC,
  wireVmcbC,
  { type: "voltmeter", id: "VMcb", ...VMcb, label: "VCB = 5 V", highlight: true },
  wireVmcbB,
  { type: "label", id: "lbl_inp5", x: 200, y: 270, text: "Input: IE vs VEB at VCB = 5 V" },
]};

/** Step 10: Output characteristics at constant IE */
export const step10: SchematicData = { width: W, height: H, elements: [
  { type: "npn-bjt", id: "Q1", ...Q1, label: "BC547" },
  wireBaseGnd,
  { type: "ground", id: "GND", ...GND },
  { type: "resistor", id: "RE", ...RE, label: "RE", value: "470 Ω" },
  wireReQ, juncGnd, juncB,
  { type: "vsource", id: "VEE", ...VEE, label: "VEE", value: "adj" },
  wireVeeUp, wireVeeGnd,
  { type: "ammeter", id: "AIE", ...AIE, label: "IE = 2,4,6 mA", highlight: true },
  wireAieRe, juncE,
  wireVmebE,
  { type: "voltmeter", id: "VMeb", ...VMeb, label: "VEB" },
  wireVmebB,
  { type: "vsource", id: "VCC", ...VCC, rotation: 180, label: "VCC", value: "sweep", highlight: true },
  wireVccAic,
  { type: "ammeter", id: "AIC", ...AIC, rotation: 90, label: "IC", highlight: true },
  wireAicCol, wireVccDown, juncC,
  wireVmcbC,
  { type: "voltmeter", id: "VMcb", ...VMcb, label: "VCB", highlight: true },
  wireVmcbB,
  { type: "label", id: "lbl_out", x: 200, y: 270, text: "Output: IC vs VCB at const IE" },
]};

/** Step 11: Calculate ri, ro, alpha */
export const step11: SchematicData = { width: W, height: H, elements: [
  { type: "npn-bjt", id: "Q1", ...Q1, label: "BC547" },
  wireBaseGnd,
  { type: "ground", id: "GND", ...GND },
  { type: "resistor", id: "RE", ...RE, label: "RE", value: "470 Ω" },
  wireReQ, juncGnd, juncB,
  { type: "vsource", id: "VEE", ...VEE, label: "VEE" },
  wireVeeUp, wireVeeGnd,
  { type: "ammeter", id: "AIE", ...AIE, label: "IE" },
  wireAieRe, juncE,
  wireVmebE,
  { type: "voltmeter", id: "VMeb", ...VMeb, label: "VEB" },
  wireVmebB,
  { type: "vsource", id: "VCC", ...VCC, rotation: 180, label: "VCC" },
  wireVccAic,
  { type: "ammeter", id: "AIC", ...AIC, rotation: 90, label: "IC" },
  wireAicCol, wireVccDown, juncC,
  wireVmcbC,
  { type: "voltmeter", id: "VMcb", ...VMcb, label: "VCB" },
  wireVmcbB,
  { type: "label", id: "lbl_ri", x: 80, y: 30, text: "ri = ΔVEB/ΔIE" },
  { type: "label", id: "lbl_ro", x: 280, y: 30, text: "ro = ΔVCB/ΔIC" },
  { type: "label", id: "lbl_alpha", x: 200, y: 270, text: "α = ΔIC/ΔIE ≈ 0.98" },
]};

/** Indexed array */
export const cbTransistorCharacteristicsStepSchematics: SchematicData[] = [
  step01, step02, step03, step04, step05, step06, step07, step08, step09, step10, step11,
];

/** Theory diagram */
export const cbTransistorCharacteristicsTheoryDiagram: SchematicData = step11;
