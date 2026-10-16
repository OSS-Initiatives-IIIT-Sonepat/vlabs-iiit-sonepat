import { type SchematicData, type SchematicElement } from "@/labs/CircuitSchematic";

/*
 * RC Charging Transient — square wave into a series RC, CRO across C.
 *
 *   FG(□) ─┬─[ R ]──┬──● Vc (CH1)
 *          │        C
 *          └──GND───┘
 *
 * R = 10 kΩ (4.7 kΩ in the last steps), C = 0.1 µF, τ = RC = 1 ms.
 */

const W = 360;
const H = 240;

const wire = (id: string, ...pts: [number, number][]): Extract<SchematicElement, { type: "wire" }> =>
  ({ type: "wire", id, points: pts.map(([x, y]) => ({ x, y })) });
const label = (id: string, x: number, y: number, text: string): SchematicElement =>
  ({ type: "label", id, x, y, text });
const junction = (id: string, x: number, y: number): SchematicElement => ({ type: "junction", id, x, y });
const hl = <T extends SchematicElement>(el: T, highlight?: boolean): T => (highlight ? { ...el, highlight } : el);

type Opts = {
  r?: string;
  hlNet?: boolean;
  hlR?: boolean;
  instruments?: boolean;
  hlInstruments?: boolean;
  source?: string;
};

const rc = ({ r = "10 kΩ", hlNet, hlR, instruments = true, hlInstruments, source = "□ 100 Hz" }: Opts = {}): SchematicElement[] => {
  const els: SchematicElement[] = [
    { type: "resistor", id: "R", x: 150, y: 70, label: "R", value: r, highlight: hlNet || hlR },
    { type: "capacitor", id: "C", x: 240, y: 130, rotation: 90, label: "C", value: "0.1 µF", highlight: hlNet },
    hl(wire("w_out", [180, 70], [240, 70], [240, 110]), hlNet),
    hl(wire("w_c_gnd", [240, 150], [240, 190], [150, 190]), hlNet),
    { type: "ground", id: "gnd", x: 150, y: 190 },
  ];
  if (instruments) {
    els.push(
      { type: "acsource", id: "FG", x: 60, y: 130, label: "FG", value: source, highlight: hlInstruments },
      hl(wire("w_in", [60, 100], [60, 70], [120, 70]), hlInstruments),
      hl(wire("w_fg_gnd", [60, 160], [60, 190], [150, 190]), hlInstruments),
      junction("j_gnd", 150, 190),
      junction("j_out", 240, 70),
      hl(wire("w_probe", [240, 70], [294, 70]), hlInstruments),
      { type: "probe", id: "CH1", x: 300, y: 70, label: "Vc", highlight: hlInstruments },
    );
  }
  return els;
};

const sheet = (t: string, els: SchematicElement[], c: string): SchematicData =>
  ({ width: W, height: H, elements: [label("title", W / 2, 22, t), ...els, label("caption", W / 2, 228, c)] });

export const step01 = sheet("Series RC Network", rc({ hlNet: true, source: "off" }), "τ = RC = 10 kΩ × 0.1 µF = 1 ms");
export const step02 = sheet("Square-Wave Drive, CRO across C", rc({ hlInstruments: true }), "0–5 V, 100 Hz: half-period 5 ms = 5τ");
export const step03 = sheet("Charging: Vc = V(1 − e^(−t/τ))", rc(), "Vc = 63.2% of 5 V = 3.16 V at t = τ");
export const step04 = sheet("Discharging: Vc = V·e^(−t/τ)", rc(), "Vc = 36.8% of 5 V = 1.84 V at t = τ");
export const step05 = sheet("Full Charge after 5τ", rc(), "Vc ≈ 99.3% of 5 V after 5τ = 5 ms");
export const step06 = sheet("Smaller R: Faster Transient", rc({ r: "4.7 kΩ", hlR: true }), "τ = 4.7 kΩ × 0.1 µF = 0.47 ms");
export const step07 = sheet("Compare τ: Measured vs RC", rc({ r: "4.7 kΩ" }), "τ ∝ R: halving R halves the time constant");

export const rcTransientStepSchematics: SchematicData[] = [
  step01, step02, step03, step04, step05, step06, step07,
];

export const rcTransientTheoryDiagram: SchematicData = sheet(
  "RC Charging and Discharging",
  rc({ source: "□ Vin" }),
  "t = τ: 63.2% charged; t = 5τ: fully charged",
);
