import { type SchematicData, type SchematicElement } from "@/labs/CircuitSchematic";

/*
 * MOSFET Common Source Amplifier — progressive 2D schematics.
 *
 * Circuit topology:
 *
 *                     ┌── RD ──(A ID)───────────────┐ +
 *                     │                             │
 *   Vin ── Cin ──┬── G┤ M1   D ── Cout ──┬── Vout   VDD
 *                RG   │ S                RL         │ −
 *                VGG  │                  │          │
 *   ─────────────┴────┴──────── GND ─────┴──────────┘
 *
 *   VGG biases the gate through RG; Cin / Cout couple the AC signal.
 */

const W = 500;
const H = 352;

// ── Symbols ───────────────────────────────────────────────────
const vdd = (highlight?: boolean): SchematicElement =>
  ({ type: "vsource", id: "VDD", x: 470, y: 160, label: "VDD", value: "10 V", highlight });
const m1 = (highlight?: boolean): SchematicElement =>
  ({ type: "n-mosfet", id: "M1", x: 240, y: 155, label: "2N7000", highlight });
const rd = (highlight?: boolean): SchematicElement =>
  ({ type: "resistor", id: "RD", x: 250, y: 70, rotation: 90, label: "RD", value: "1 kΩ", highlight });
const amId = (highlight?: boolean): SchematicElement =>
  ({ type: "ammeter", id: "AM_D", x: 340, y: 40, rotation: 90, label: "ID", highlight });
const rg = (highlight?: boolean): SchematicElement =>
  ({ type: "resistor", id: "RG", x: 155, y: 185, rotation: 90, label: "RG", value: "100 kΩ", highlight });
const vgg = (value: string, highlight?: boolean): SchematicElement =>
  ({ type: "vsource", id: "VGG", x: 155, y: 255, label: "VGG", value, highlight });
const cin = (highlight?: boolean): SchematicElement =>
  ({ type: "capacitor", id: "CIN", x: 105, y: 155, label: "Cin", value: "1 µF", highlight });
const vin = (highlight?: boolean): SchematicElement =>
  ({ type: "acsource", id: "VIN", x: 70, y: 215, label: "Vin", value: "100 mVpp", highlight });
const cout = (highlight?: boolean): SchematicElement =>
  ({ type: "capacitor", id: "COUT", x: 320, y: 115, label: "Cout", value: "1 µF", highlight });
const rl = (highlight?: boolean): SchematicElement =>
  ({ type: "resistor", id: "RL", x: 390, y: 170, rotation: 90, label: "RL", value: "10 kΩ", highlight });
const gnd: SchematicElement = { type: "ground", id: "GND", x: 320, y: 300 };

// ── Wires ─────────────────────────────────────────────────────
const wireTop: SchematicElement = { type: "wire", id: "w_top", points: [{ x: 470, y: 130 }, { x: 470, y: 40 }, { x: 250, y: 40 }] };
const wireTopVdd: SchematicElement = { type: "wire", id: "w_top_vdd", points: [{ x: 470, y: 130 }, { x: 470, y: 40 }, { x: 364, y: 40 }] };
const wireTopRd: SchematicElement = { type: "wire", id: "w_top_rd", points: [{ x: 316, y: 40 }, { x: 250, y: 40 }] };
const wireVddGnd: SchematicElement = { type: "wire", id: "w_vdd_gnd", points: [{ x: 470, y: 190 }, { x: 470, y: 300 }, { x: 320, y: 300 }] };
const wireSrcGnd: SchematicElement = { type: "wire", id: "w_src_gnd", points: [{ x: 250, y: 185 }, { x: 250, y: 300 }, { x: 320, y: 300 }] };
const wireRdDrain: SchematicElement = { type: "wire", id: "w_rd_drain", points: [{ x: 250, y: 100 }, { x: 250, y: 125 }] };
// Gate bias: VGG (+) → RG → gate
const wireGate: SchematicElement = { type: "wire", id: "w_gate", points: [{ x: 155, y: 155 }, { x: 216, y: 155 }] };
const wireRgVgg: SchematicElement = { type: "wire", id: "w_rg_vgg", points: [{ x: 155, y: 215 }, { x: 155, y: 225 }] };
const wireVggGnd: SchematicElement = { type: "wire", id: "w_vgg_gnd", points: [{ x: 155, y: 285 }, { x: 155, y: 300 }, { x: 250, y: 300 }] };
// AC input: Vin → Cin → gate node
const wireVinCin: SchematicElement = { type: "wire", id: "w_vin_cin", points: [{ x: 70, y: 185 }, { x: 70, y: 155 }, { x: 85, y: 155 }] };
const wireCinGate: SchematicElement = { type: "wire", id: "w_cin_gate", points: [{ x: 125, y: 155 }, { x: 155, y: 155 }] };
const wireVinGnd: SchematicElement = { type: "wire", id: "w_vin_gnd", points: [{ x: 70, y: 245 }, { x: 70, y: 300 }, { x: 155, y: 300 }] };
// AC output: drain → Cout → RL
const wireDrainCout: SchematicElement = { type: "wire", id: "w_drain_cout", points: [{ x: 250, y: 115 }, { x: 300, y: 115 }] };
const wireCoutRl: SchematicElement = { type: "wire", id: "w_cout_rl", points: [{ x: 340, y: 115 }, { x: 390, y: 115 }, { x: 390, y: 140 }] };
const wireRlGnd: SchematicElement = { type: "wire", id: "w_rl_gnd", points: [{ x: 390, y: 200 }, { x: 390, y: 300 }] };
// Probe stubs
const wireVgsProbe: SchematicElement = { type: "wire", id: "w_vgs_probe", points: [{ x: 195, y: 155 }, { x: 195, y: 179 }] };
const wireVdsProbe: SchematicElement = { type: "wire", id: "w_vds_probe", points: [{ x: 250, y: 115 }, { x: 284, y: 115 }] };
const wireCh1: SchematicElement = { type: "wire", id: "w_ch1", points: [{ x: 70, y: 155 }, { x: 70, y: 131 }] };
const wireCh2: SchematicElement = { type: "wire", id: "w_ch2", points: [{ x: 390, y: 115 }, { x: 390, y: 96 }] };

// ── Junctions ─────────────────────────────────────────────────
const juncGnd: SchematicElement     = { type: "junction", id: "j_gnd",      x: 320, y: 300 };
const juncSrcGnd: SchematicElement  = { type: "junction", id: "j_src_gnd",  x: 250, y: 300 };
const juncVggGnd: SchematicElement  = { type: "junction", id: "j_vgg_gnd",  x: 155, y: 300 };
const juncRlGnd: SchematicElement   = { type: "junction", id: "j_rl_gnd",   x: 390, y: 300 };
const juncGate: SchematicElement    = { type: "junction", id: "j_gate",     x: 155, y: 155 };
const juncDrain: SchematicElement   = { type: "junction", id: "j_drain",    x: 250, y: 115 };
const juncVgsProbe: SchematicElement = { type: "junction", id: "j_vgs_probe", x: 195, y: 155 };
const juncCh1: SchematicElement     = { type: "junction", id: "j_ch1",      x: 70, y: 155 };
const juncCh2: SchematicElement     = { type: "junction", id: "j_ch2",      x: 390, y: 115 };

const caption = (id: string, text: string): SchematicElement =>
  ({ type: "label", id, x: 250, y: 340, text });

// Supply + MOSFET + drain resistor with the ID ammeter (step 4 onwards).
const drainStage = (hl: { rd?: boolean; am?: boolean } = {}): SchematicElement[] => [
  vdd(), wireTopVdd, amId(hl.am), wireTopRd, wireVddGnd, gnd, juncGnd,
  m1(), wireSrcGnd, rd(hl.rd), wireRdDrain,
];
// Gate bias network (step 5 onwards).
const gateBias = (vggValue: string, highlight?: boolean): SchematicElement[] => [
  { ...wireGate, highlight }, rg(highlight), { ...wireRgVgg, highlight }, vgg(vggValue, highlight),
  { ...wireVggGnd, highlight }, juncSrcGnd,
];
const vgsProbe = (label: string, highlight?: boolean): SchematicElement[] => [
  { ...wireVgsProbe, highlight }, juncVgsProbe,
  { type: "probe", id: "pr_vgs", x: 195, y: 185, label, highlight },
];
const vdsProbe = (label: string, highlight?: boolean): SchematicElement[] => [
  { ...wireVdsProbe, highlight }, juncDrain,
  { type: "probe", id: "pr_vds", x: 290, y: 115, label, highlight },
];
// AC coupling network (step 9 onwards).
const acNetwork = (highlight?: boolean): SchematicElement[] => [
  vin(highlight), { ...wireVinCin, highlight }, cin(highlight), { ...wireCinGate, highlight }, juncGate,
  { ...wireVinGnd, highlight }, juncVggGnd,
  { ...wireDrainCout, highlight }, juncDrain, cout(highlight), { ...wireCoutRl, highlight },
  rl(highlight), { ...wireRlGnd, highlight }, juncRlGnd,
];

/** Step 1: Place breadboard + power supplies */
export const step01: SchematicData = { width: W, height: H, elements: [
  vdd(true),
  { ...wireTop, highlight: true },
  { type: "junction", id: "j_top_end", x: 250, y: 40 },
  { ...wireVddGnd, highlight: true },
  gnd,
]};

/** Step 2: Insert MOSFET */
export const step02: SchematicData = { width: W, height: H, elements: [
  vdd(), wireTop, { type: "junction", id: "j_top_end", x: 250, y: 40 }, wireVddGnd, gnd, juncGnd,
  // NEW
  m1(true),
  { ...wireSrcGnd, highlight: true },
]};

/** Step 3: Ground connections */
export const step03: SchematicData = { width: W, height: H, elements: [
  vdd(), wireTop, { type: "junction", id: "j_top_end", x: 250, y: 40 },
  { ...wireVddGnd, highlight: true }, gnd, juncGnd,
  m1(),
  { ...wireSrcGnd, highlight: true },
  caption("lbl_gnd", "Source to ground (common)"),
]};

/** Step 4: Add drain resistor RD + ammeter */
export const step04: SchematicData = { width: W, height: H, elements: [
  ...drainStage({ rd: true, am: true }),
]};

/** Step 5: Gate bias (VGG through RG) */
export const step05: SchematicData = { width: W, height: H, elements: [
  ...drainStage(),
  // NEW
  ...gateBias("0-5 V", true),
]};

/** Step 6: Add voltmeters VGS and VDS */
export const step06: SchematicData = { width: W, height: H, elements: [
  ...drainStage(),
  ...gateBias("3 V"),
  // NEW — probes
  ...vgsProbe("VGS", true),
  ...vdsProbe("VDS", true),
]};

/** Step 7: DC operating point */
export const step07: SchematicData = { width: W, height: H, elements: [
  ...drainStage(),
  ...gateBias("3 V", true),
  ...vgsProbe("VGS=3V"),
  ...vdsProbe("VDS≈6V"),
  caption("lbl_qpt", "Q-point: ID ≈ 4 mA, VDS ≈ 6 V"),
]};

/** Step 8: Vary VGS, observe ID */
export const step08: SchematicData = { width: W, height: H, elements: [
  ...drainStage({ am: true }),
  ...gateBias("sweep", true),
  ...vgsProbe("VGS"),
  caption("lbl_sweep", "Sweep VGS 2→5 V, record ID"),
]};

/** Step 9: Apply AC input (coupling capacitors) */
export const step09: SchematicData = { width: W, height: H, elements: [
  ...drainStage(),
  ...gateBias("3 V"),
  // NEW — AC input and output coupling
  ...acNetwork(true),
]};

/** Step 10: Observe output — voltage gain and phase */
export const step10: SchematicData = { width: W, height: H, elements: [
  ...drainStage(),
  ...gateBias("3 V"),
  ...acNetwork(),
  // Probes
  wireCh1, juncCh1,
  { type: "probe", id: "pr_in", x: 70, y: 125, label: "Ch1" },
  { ...wireCh2, highlight: true }, juncCh2,
  { type: "probe", id: "pr_out", x: 390, y: 90, label: "Ch2 (Vout)", highlight: true },
  caption("lbl_gain", "Av ≈ −8, 180° phase shift"),
]};

/** Indexed array */
export const mosfetCommonSourceStepSchematics: SchematicData[] = [
  step01, step02, step03, step04, step05, step06, step07, step08, step09, step10,
];

/** Theory diagram */
export const mosfetCommonSourceTheoryDiagram: SchematicData = step10;
