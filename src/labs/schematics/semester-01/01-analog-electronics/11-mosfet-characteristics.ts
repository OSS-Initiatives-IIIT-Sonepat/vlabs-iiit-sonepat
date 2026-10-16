import { type SchematicData, type SchematicElement } from "@/labs/CircuitSchematic";

/*
 * MOSFET Drain and Transfer Characteristics — progressive 2D schematics.
 *
 * Circuit topology:
 *
 *          ┌── RD ──┬──────(A ID)──────┐
 *          │        D                  │ +
 *   VGS ───┼──── G─┤ M1          (V VDS)  VDD
 *   (V VGS)│        S                  │ −
 *          └────────┴──────── GND ─────┘
 *
 *   ID is read on a series ammeter; VDS and VGS on voltmeters to ground.
 */

const W = 440;
const H = 300;

// ── Symbols ───────────────────────────────────────────────────
const vdd = (value: string, highlight?: boolean): SchematicElement =>
  ({ type: "vsource", id: "VDD", x: 400, y: 145, label: "VDD", value, highlight });
const vgs = (value: string, highlight?: boolean): SchematicElement =>
  ({ type: "vsource", id: "VGS", x: 60, y: 180, label: "VGS", value, highlight });
const rd = (highlight?: boolean): SchematicElement =>
  ({ type: "resistor", id: "RD", x: 210, y: 70, rotation: 90, label: "RD", value: "100 Ω", highlight });
const m1 = (highlight?: boolean): SchematicElement =>
  ({ type: "n-mosfet", id: "M1", x: 200, y: 150, label: "2N7000", highlight });
const amId = (label: string, highlight?: boolean): SchematicElement =>
  ({ type: "ammeter", id: "DMM_ID", x: 300, y: 40, rotation: 90, label, highlight });
const vmVds = (label: string, highlight?: boolean): SchematicElement =>
  ({ type: "voltmeter", id: "DMM_VDS", x: 300, y: 175, label, highlight });
const vmVgs = (label: string, highlight?: boolean): SchematicElement =>
  ({ type: "voltmeter", id: "DMM_VGS", x: 130, y: 200, label, highlight });
const gnd: SchematicElement = { type: "ground", id: "GND", x: 250, y: 250 };

// ── Wires ─────────────────────────────────────────────────────
// Drain supply: VDD (+) → top rail → RD (meter-less until step 7)
const wireTop: SchematicElement = { type: "wire", id: "w_top", points: [{ x: 400, y: 115 }, { x: 400, y: 40 }, { x: 210, y: 40 }] };
const wireTopVdd: SchematicElement = { type: "wire", id: "w_top_vdd", points: [{ x: 400, y: 115 }, { x: 400, y: 40 }, { x: 324, y: 40 }] };
const wireTopRd: SchematicElement = { type: "wire", id: "w_top_rd", points: [{ x: 276, y: 40 }, { x: 210, y: 40 }] };
const wireVddGnd: SchematicElement = { type: "wire", id: "w_vdd_gnd", points: [{ x: 400, y: 175 }, { x: 400, y: 250 }, { x: 250, y: 250 }] };
const wireRdDrain: SchematicElement = { type: "wire", id: "w_rd_drain", points: [{ x: 210, y: 100 }, { x: 210, y: 120 }] };
const wireSrcGnd: SchematicElement = { type: "wire", id: "w_src_gnd", points: [{ x: 210, y: 180 }, { x: 210, y: 250 }, { x: 250, y: 250 }] };
// Gate supply
const wireVgsGate: SchematicElement = { type: "wire", id: "w_vgs_gate", points: [{ x: 60, y: 150 }, { x: 176, y: 150 }] };
const wireVgsGnd: SchematicElement = { type: "wire", id: "w_vgs_gnd", points: [{ x: 60, y: 210 }, { x: 60, y: 250 }, { x: 210, y: 250 }] };
// Voltmeter taps
const wireVdsD: SchematicElement = { type: "wire", id: "w_vds_d", points: [{ x: 210, y: 110 }, { x: 300, y: 110 }, { x: 300, y: 151 }] };
const wireVdsS: SchematicElement = { type: "wire", id: "w_vds_s", points: [{ x: 300, y: 199 }, { x: 300, y: 250 }] };
const wireVgsG: SchematicElement = { type: "wire", id: "w_vgs_g", points: [{ x: 130, y: 150 }, { x: 130, y: 176 }] };
const wireVgsS: SchematicElement = { type: "wire", id: "w_vgs_s", points: [{ x: 130, y: 224 }, { x: 130, y: 250 }] };

// ── Junctions ─────────────────────────────────────────────────
const juncGnd: SchematicElement    = { type: "junction", id: "j_gnd",     x: 250, y: 250 };
const juncSrcGnd: SchematicElement = { type: "junction", id: "j_src_gnd", x: 210, y: 250 };
const juncDrain: SchematicElement  = { type: "junction", id: "j_drain",   x: 210, y: 110 };
const juncVdsGnd: SchematicElement = { type: "junction", id: "j_vds_gnd", x: 300, y: 250 };
const juncGate: SchematicElement   = { type: "junction", id: "j_gate",    x: 130, y: 150 };
const juncVgsGnd: SchematicElement = { type: "junction", id: "j_vgs_gnd", x: 130, y: 250 };

const caption = (id: string, text: string): SchematicElement =>
  ({ type: "label", id, x: 220, y: 288, text });

// Drain loop (VDD → RD → M1 → GND) without the ammeter.
const drainLoop = (vddValue: string, highlight?: boolean): SchematicElement[] => [
  vdd(vddValue), { ...wireTop, highlight }, wireVddGnd, gnd, juncGnd,
  rd(highlight), { ...wireRdDrain, highlight }, m1(highlight), { ...wireSrcGnd, highlight },
];
// Gate loop (VGS → G, return to ground rail).
const gateLoop = (vgsValue: string, highlight?: boolean): SchematicElement[] => [
  vgs(vgsValue, highlight), { ...wireVgsGate, highlight }, { ...wireVgsGnd, highlight }, juncSrcGnd,
];
// Full measuring circuit with all three meters.
const measured = (
  vddValue: string, vgsValue: string,
  meters: { id: string; vds: string; vgs: string },
  hl: { vdd?: boolean; vgs?: boolean; id?: boolean; vds?: boolean; vgsMeter?: boolean } = {},
): SchematicElement[] => [
  vdd(vddValue, hl.vdd), wireTopVdd, amId(meters.id, hl.id), wireTopRd, wireVddGnd, gnd, juncGnd,
  rd(), wireRdDrain, m1(), wireSrcGnd,
  vgs(vgsValue, hl.vgs), wireVgsGate, wireVgsGnd, juncSrcGnd,
  wireVdsD, juncDrain, vmVds(meters.vds, hl.vds), wireVdsS, juncVdsGnd,
  wireVgsG, juncGate, vmVgs(meters.vgs, hl.vgsMeter), wireVgsS, juncVgsGnd,
];

/** Step 1: Place breadboard */
export const step01: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "lbl_title", x: 220, y: 30, text: "N-channel Enhancement MOSFET" },
  gnd,
]};

/** Step 2: Connect drain supply VDD */
export const step02: SchematicData = { width: W, height: H, elements: [
  vdd("0-15 V", true),
  { ...wireTop, highlight: true },
  { type: "junction", id: "j_top_end", x: 210, y: 40 },
  { ...wireVddGnd, highlight: true },
  gnd,
]};

/** Step 3: Add drain resistor RD and MOSFET */
export const step03: SchematicData = { width: W, height: H, elements: [
  vdd("0-15 V"), wireTop, wireVddGnd, gnd, juncGnd,
  // NEW
  rd(true),
  { ...wireRdDrain, highlight: true },
  m1(true),
  { ...wireSrcGnd, highlight: true },
]};

/** Step 4: Connect gate supply VGS */
export const step04: SchematicData = { width: W, height: H, elements: [
  ...drainLoop("0-15 V"),
  // NEW
  ...gateLoop("0-5 V", true),
]};

/** Step 5: Complete drain wiring */
export const step05: SchematicData = { width: W, height: H, elements: [
  ...drainLoop("0-15 V", true),
  ...gateLoop("0-5 V"),
  caption("lbl_drain", "Drain loop: VDD → RD → D → S → GND"),
]};

/** Step 6: Gate wiring complete */
export const step06: SchematicData = { width: W, height: H, elements: [
  ...drainLoop("0-15 V"),
  ...gateLoop("0-5 V", true),
  caption("lbl_gate", "Gate loop: VGS → G (insulated, IG ≈ 0)"),
]};

/** Step 7: Connect multimeters */
export const step07: SchematicData = { width: W, height: H, elements: [
  ...measured("0-15 V", "0-5 V", { id: "ID", vds: "VDS", vgs: "VGS" }, { id: true, vds: true, vgsMeter: true }),
]};

/** Step 8: Check cut-off (VGS = 0) */
export const step08: SchematicData = { width: W, height: H, elements: [
  ...measured("10 V", "0 V", { id: "ID ≈ 0", vds: "VDS ≈ VDD", vgs: "VGS = 0" }, { vgs: true }),
  caption("lbl_cutoff", "Cut-off: VGS < Vth → ID ≈ 0"),
]};

/** Step 9: Drain (output) characteristics */
export const step09: SchematicData = { width: W, height: H, elements: [
  ...measured("sweep", "3,4,5 V", { id: "ID", vds: "VDS", vgs: "VGS" }, { vdd: true, id: true, vds: true }),
  caption("lbl_drain_char", "Drain: ID vs VDS at const VGS"),
]};

/** Step 10: Transfer characteristics */
export const step10: SchematicData = { width: W, height: H, elements: [
  ...measured("10 V", "sweep", { id: "ID", vds: "VDS", vgs: "VGS" }, { vgs: true, id: true, vgsMeter: true }),
  caption("lbl_transfer", "Transfer: ID vs VGS → find Vth, gm"),
]};

/** Indexed array */
export const mosfetCharacteristicsStepSchematics: SchematicData[] = [
  step01, step02, step03, step04, step05, step06, step07, step08, step09, step10,
];

/** Theory diagram */
export const mosfetCharacteristicsTheoryDiagram: SchematicData = step10;
