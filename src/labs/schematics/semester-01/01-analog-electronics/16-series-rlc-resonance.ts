import { type SchematicData, type SchematicElement } from "@/labs/CircuitSchematic";

/*
 * Series RLC Resonance — L = 10 mH, C = 0.1 µF, R = 100 Ω.
 *
 *            ┌──(V)──┐  (AC voltmeter across C)
 *   FG ─┬─[ L ]──┴─| C |─┴──┬──● VR (CH1)
 *       │                   R
 *       └──────GND──────────┘
 *
 * f0 = 1/(2π√LC) ≈ 5.03 kHz, Q = (1/R)√(L/C) ≈ 3.16, BW ≈ 1.59 kHz.
 */

const W = 380;
const H = 240;

const wire = (id: string, ...pts: [number, number][]): Extract<SchematicElement, { type: "wire" }> =>
  ({ type: "wire", id, points: pts.map(([x, y]) => ({ x, y })) });
const label = (id: string, x: number, y: number, text: string): SchematicElement =>
  ({ type: "label", id, x, y, text });
const junction = (id: string, x: number, y: number): SchematicElement => ({ type: "junction", id, x, y });
const hl = <T extends SchematicElement>(el: T, highlight?: boolean): T => (highlight ? { ...el, highlight } : el);

type Opts = {
  hlL?: boolean;
  hlNet?: boolean;
  instruments?: boolean;
  hlInstruments?: boolean;
  meter?: boolean;
  source?: string;
};

const rlc = ({ hlL, hlNet, instruments = true, hlInstruments, meter, source = "2 Vpp" }: Opts = {}): SchematicElement[] => {
  const els: SchematicElement[] = [
    { type: "inductor", id: "L", x: 120, y: 90, label: "L", value: "10 mH", highlight: hlNet || hlL },
    hl(wire("w_l_c", [150, 90], [190, 90]), hlNet),
    { type: "capacitor", id: "C", x: 210, y: 90, label: "C", value: "0.1 µF", highlight: hlNet },
    hl(wire("w_c_r", [230, 90], [290, 90], [290, 110]), hlNet),
    { type: "resistor", id: "R", x: 290, y: 140, rotation: 90, label: "R", value: "100 Ω", highlight: hlNet },
    hl(wire("w_r_gnd", [290, 170], [290, 200], [170, 200]), hlNet),
    { type: "ground", id: "gnd", x: 170, y: 200 },
  ];
  if (instruments) {
    els.push(
      { type: "acsource", id: "FG", x: 50, y: 145, label: "FG", value: source, highlight: hlInstruments },
      hl(wire("w_in", [50, 115], [50, 90], [90, 90]), hlInstruments),
      hl(wire("w_fg_gnd", [50, 175], [50, 200], [170, 200]), hlInstruments),
      junction("j_gnd", 170, 200),
      junction("j_vr", 290, 90),
      hl(wire("w_probe", [290, 90], [334, 90]), hlInstruments),
      { type: "probe", id: "CH1", x: 340, y: 90, label: "VR" },
    );
  }
  if (meter) {
    els.push(
      { type: "voltmeter", id: "VM", x: 210, y: 45, rotation: 90, highlight: true },
      hl(wire("w_vm_l", [186, 45], [170, 45], [170, 90]), true),
      hl(wire("w_vm_r", [234, 45], [250, 45], [250, 90]), true),
      junction("j_vm_l", 170, 90),
      junction("j_vm_r", 250, 90),
    );
  }
  return els;
};

const sheet = (t: string, els: SchematicElement[], c: string): SchematicData =>
  ({ width: W, height: H, elements: [label("title", W / 2, 18, t), ...els, label("caption", W / 2, 230, c)] });

export const step01 = sheet("Series RLC: L, C and R in Series", rlc({ hlL: true, hlNet: true, source: "off" }), "f0 = 1 / (2π√LC) ≈ 5.03 kHz");
export const step02 = sheet("Drive with FG, CRO across R", rlc({ hlInstruments: true, source: "1 kHz" }), "VR = I·R: CH1 shows the current");
export const step03 = sheet("Below f0: Capacitive (XC > XL)", rlc({ source: "3 kHz" }), "3 kHz: VR ≈ 0.56 Vpp, I leads V");
export const step04 = sheet("At f0: XL = XC, Z = R", rlc({ hlNet: true, source: "5.03 kHz" }), "VR = Vin = 2.0 Vpp, I in phase with V");
export const step05 = sheet("Voltage Magnification across C", rlc({ meter: true, source: "5.03 kHz" }), "VC = Q × Vin ≈ 6.3 Vpp (2.24 V rms)");
export const step06 = sheet("Lower Half-Power Point f1", rlc({ source: "4.30 kHz" }), "VR = 0.707 × 2 V = 1.41 Vpp");
export const step07 = sheet("Upper Half-Power Point f2", rlc({ source: "5.89 kHz" }), "VR = 1.41 Vpp, I lags V by 45°");
export const step08 = sheet("Above f0: Inductive (XL > XC)", rlc({ source: "10 kHz" }), "Q = f0 / (f2 − f1) ≈ 3.2");

export const seriesRlcStepSchematics: SchematicData[] = [
  step01, step02, step03, step04, step05, step06, step07, step08,
];

export const seriesRlcTheoryDiagram: SchematicData = sheet(
  "Series RLC Circuit",
  rlc({ meter: true, source: "Vin" }),
  "Z = √(R² + (XL − XC)²); minimum Z = R at f0",
);
