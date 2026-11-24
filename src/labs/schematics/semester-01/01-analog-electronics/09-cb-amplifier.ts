import {
  type SchematicData,
  type SchematicElement,
} from "@/labs/CircuitSchematic";

/*
 * Common-Base Amplifier (dual supply) — progressive 2D schematics.
 *
 *            ┌─[A I_C]─ VCC+          VCC− ─ GND
 *            RC
 *            C ── CRO
 *   GND ─ B ─Q1
 *            E
 *   Vin─Cin──┤
 *            RE
 *            [A I_E]
 *            └──── VEE−           VEE+ ─ GND
 */

const W = 420;
const H = 360;

const Q1 = { x: 200, y: 140 }; // B (180,140), C (220,110), E (220,170)

const gnd = (id: string, x: number, y: number): SchematicElement => ({
  type: "ground",
  id,
  x,
  y,
});
const wire = (
  id: string,
  pts: [number, number][],
  highlight?: boolean,
): SchematicElement => ({
  type: "wire",
  id,
  points: pts.map(([x, y]) => ({ x, y })),
  highlight,
});
const hl = (el: SchematicElement, on: boolean): SchematicElement =>
  on ? ({ ...el, highlight: true } as SchematicElement) : el;

// ── Supplies ────────────────────────────────────────────────────────────
const vcc: SchematicElement = {
  type: "vsource",
  id: "VCC",
  x: 370,
  y: 100,
  label: "VCC",
  value: "9 V",
};
const wVccTop = wire("w_vcc_top", [
  [370, 70],
  [370, 40],
  [324, 40],
]);
const wVccGnd = wire("w_vcc_gnd", [
  [370, 130],
  [370, 150],
]);
const gVcc = gnd("GND_CC", 370, 150);

const vee: SchematicElement = {
  type: "vsource",
  id: "VEE",
  x: 300,
  y: 300,
  label: "VEE",
  value: "1.7 V",
};
const wVeeGnd = wire("w_vee_gnd", [
  [300, 270],
  [300, 255],
  [340, 255],
  [340, 262],
]);
const gVee = gnd("GND_EE", 340, 262);
// Open end of the V_CC lead until the I_C ammeter is placed.
const tVcc: SchematicElement = { type: "junction", id: "t_vcc", x: 324, y: 40 };
const wVeeAm = wire("w_vee_am", [
  [220, 304],
  [220, 340],
  [300, 340],
  [300, 330],
]);

// ── Transistor and base ─────────────────────────────────────────────────
const q1: SchematicElement = {
  type: "npn-bjt",
  id: "Q1",
  ...Q1,
  label: "BC547",
};
const wBase = wire("w_base_gnd", [
  [180, 140],
  [160, 140],
  [160, 155],
]);
const gBase = gnd("GND_B", 160, 155);

// ── Emitter circuit ─────────────────────────────────────────────────────
const wEm = wire("w_em", [
  [220, 170],
  [220, 190],
]);
const re: SchematicElement = {
  type: "resistor",
  id: "RE",
  x: 220,
  y: 220,
  rotation: 90,
  label: "RE",
  value: "1 kΩ",
};
const wReAm = wire("w_re_am", [
  [220, 250],
  [220, 256],
]);
const amE: SchematicElement = {
  type: "ammeter",
  id: "AM_E",
  x: 220,
  y: 280,
  label: "IE",
};

// ── Collector circuit ───────────────────────────────────────────────────
const rc: SchematicElement = {
  type: "resistor",
  id: "RC",
  x: 220,
  y: 70,
  rotation: 90,
  label: "RC",
  value: "4.7 kΩ",
};
const wCol = wire("w_col", [
  [220, 100],
  [220, 110],
]);
const amC: SchematicElement = {
  type: "ammeter",
  id: "AM_C",
  x: 300,
  y: 40,
  rotation: 90,
  label: "IC",
};
const wAmRc = wire("w_am_rc", [
  [276, 40],
  [220, 40],
]);

// ── AC input and output ─────────────────────────────────────────────────
const jEm: SchematicElement = { type: "junction", id: "j_em", x: 220, y: 190 };
const cin: SchematicElement = {
  type: "capacitor",
  id: "CIN",
  x: 130,
  y: 190,
  label: "Cin",
  value: "10 µF",
};
const wCinEm = wire("w_cin_em", [
  [150, 190],
  [220, 190],
]);
const vin: SchematicElement = {
  type: "acsource",
  id: "VIN",
  x: 60,
  y: 230,
  label: "Vin",
  value: "20 mVpp",
};
const wVinCin = wire("w_vin_cin", [
  [60, 200],
  [60, 190],
  [110, 190],
]);
const wVinGnd = wire("w_vin_gnd", [
  [60, 260],
  [60, 275],
]);
const gVin = gnd("GND_IN", 60, 275);
const jCol: SchematicElement = {
  type: "junction",
  id: "j_col",
  x: 220,
  y: 105,
};
const wProbe = wire("w_pr_out", [
  [220, 105],
  [274, 105],
]);
const probe: SchematicElement = {
  type: "probe",
  id: "pr_out",
  x: 280,
  y: 105,
  label: "CRO",
};

const supplies = [vcc, wVccTop, wVccGnd, gVcc, vee, wVeeGnd, gVee];
const transistor = [q1, wBase, gBase];
const emitter = [wEm, re, wReAm, amE, wVeeAm];
const collector = [rc, wCol, amC, wAmRc];
const acIn = [jEm, cin, wCinEm];

const sheet = (...elements: SchematicElement[]): SchematicData => ({
  width: W,
  height: H,
  elements,
});

/** Step 1: Place breadboard */
export const step01 = sheet({
  type: "label",
  id: "lbl_title",
  x: 210,
  y: 30,
  text: "Common-Base Amplifier",
});

/** Step 2: Connect V_CC and V_EE */
export const step02 = sheet(...supplies.map((e) => hl(e, true)), tVcc);

/** Step 3: Insert the BC547 and ground the base */
export const step03 = sheet(
  ...supplies,
  tVcc,
  ...transistor.map((e) => hl(e, true)),
);

/** Step 4: R_E and the I_E ammeter */
export const step04 = sheet(
  ...supplies,
  tVcc,
  ...transistor,
  ...emitter.map((e) => hl(e, true)),
);

/** Step 5: R_C and the I_C ammeter */
export const step05 = sheet(
  ...supplies,
  ...transistor,
  ...emitter,
  ...collector.map((e) => hl(e, true)),
);

/** Steps 6–7: meters connected, DC readings */
export const step06 = sheet(
  ...supplies,
  ...transistor,
  ...emitter,
  ...collector,
);

/** Step 8: C_in to the emitter */
export const step08 = sheet(
  ...supplies,
  ...transistor,
  ...emitter,
  ...collector,
  ...acIn.map((e) => hl(e, true)),
);

/** Step 9: AC signal in, CRO on the collector */
export const step09 = sheet(
  ...supplies,
  ...transistor,
  ...emitter,
  ...collector,
  ...acIn,
  hl(vin, true),
  hl(wVinCin, true),
  hl(wVinGnd, true),
  gVin,
  jCol,
  hl(wProbe, true),
  hl(probe, true),
  {
    type: "label",
    id: "lbl_char",
    x: 120,
    y: 330,
    text: "Av ≈ gm·RC, in phase",
  },
);

/** Indexed array */
export const cbAmplifierStepSchematics: SchematicData[] = [
  step01,
  step02,
  step03,
  step04,
  step05,
  step06,
  step06,
  step08,
  step09,
];

/** Theory diagram */
export const cbAmplifierTheoryDiagram: SchematicData = step09;
