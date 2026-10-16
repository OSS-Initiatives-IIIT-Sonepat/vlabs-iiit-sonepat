import { type SchematicData, type SchematicElement } from "@/labs/CircuitSchematic";

/*
 * RC Low-Pass and High-Pass Filters, R = 1 kΩ, C = 0.1 µF, fc ≈ 1.59 kHz.
 *
 *   Low-pass                         High-pass
 *   FG ─┬─[ R ]──┬──● Vo            FG ─┬──| C |──┬──● Vo
 *       │        C                      │         R
 *       └──GND───┘                      └──GND────┘
 *
 * Each filter is drawn by one builder that can be shifted by dx, so the
 * theory diagram places both side by side.
 */

const W = 360;
const H = 240;

const wire = (id: string, ...pts: [number, number][]): Extract<SchematicElement, { type: "wire" }> =>
  ({ type: "wire", id, points: pts.map(([x, y]) => ({ x, y })) });
const label = (id: string, x: number, y: number, text: string): SchematicElement =>
  ({ type: "label", id, x, y, text });
const junction = (id: string, x: number, y: number): SchematicElement => ({ type: "junction", id, x, y });
const hl = <T extends SchematicElement>(el: T, highlight?: boolean): T => (highlight ? { ...el, highlight } : el);

type Kind = "lp" | "hp";
type Opts = {
  dx?: number;
  /** Highlight the R and C network. */
  hlNet?: boolean;
  /** Draw the generator and scope probe. */
  instruments?: boolean;
  hlInstruments?: boolean;
  source?: string;
};

const filter = (kind: Kind, { dx = 0, hlNet, instruments, hlInstruments, source = "2 Vpp" }: Opts = {}): SchematicElement[] => {
  const x = (v: number) => v + dx;
  const p = `${kind}_`;
  const series: SchematicElement =
    kind === "lp"
      ? { type: "resistor", id: `${p}R`, x: x(150), y: 70, label: "R", value: "1 kΩ", highlight: hlNet }
      : { type: "capacitor", id: `${p}C`, x: x(150), y: 70, label: "C", value: "0.1 µF", highlight: hlNet };
  const shunt: SchematicElement =
    kind === "lp"
      ? { type: "capacitor", id: `${p}C`, x: x(240), y: 130, rotation: 90, label: "C", value: "0.1 µF", highlight: hlNet }
      : { type: "resistor", id: `${p}R`, x: x(240), y: 130, rotation: 90, label: "R", value: "1 kΩ", highlight: hlNet };
  const seriesPin = kind === "lp" ? 30 : 20;
  const shuntPin = kind === "lp" ? 20 : 30;

  const els: SchematicElement[] = [
    series,
    shunt,
    hl(wire(`${p}w_out`, [x(150 + seriesPin), 70], [x(240), 70], [x(240), 130 - shuntPin]), hlNet),
    hl(wire(`${p}w_shunt_gnd`, [x(240), 130 + shuntPin], [x(240), 190], [x(150), 190]), hlNet),
    { type: "ground", id: `${p}gnd`, x: x(150), y: 190 },
  ];
  if (instruments) {
    els.push(
      { type: "acsource", id: `${p}FG`, x: x(60), y: 130, label: "FG", value: source, highlight: hlInstruments },
      hl(wire(`${p}w_in`, [x(60), 100], [x(60), 70], [x(150 - seriesPin), 70]), hlInstruments),
      hl(wire(`${p}w_fg_gnd`, [x(60), 160], [x(60), 190], [x(150), 190]), hlInstruments),
      junction(`${p}j_gnd`, x(150), 190),
      junction(`${p}j_out`, x(240), 70),
      hl(wire(`${p}w_probe`, [x(240), 70], [x(294), 70]), hlInstruments),
      { type: "probe", id: `${p}CH1`, x: x(300), y: 70, label: "Vo", highlight: hlInstruments },
    );
  }
  return els;
};

const title = (text: string): SchematicElement => label("title", W / 2, 22, text);
const caption = (text: string): SchematicElement => label("caption", W / 2, 228, text);

const sheet = (t: string, els: SchematicElement[], c: string): SchematicData =>
  ({ width: W, height: H, elements: [title(t), ...els, caption(c)] });

export const step01 = sheet("Low-Pass: R in series, C to ground", [...filter("lp", { hlNet: true, instruments: true, source: "off" })], "fc = 1 / (2πRC) ≈ 1.59 kHz");
export const step02 = sheet("Connect the Generator and CRO", [...filter("lp", { instruments: true, hlInstruments: true, source: "100 Hz" })], "Vin = 2 Vpp sine, CH1 across C");
export const step03 = sheet("Below fc: Vo ≈ Vin", [...filter("lp", { instruments: true, source: "1 kHz" })], "1 kHz: Vo ≈ 1.69 Vpp, φ ≈ −32°");
export const step04 = sheet("At fc: Vo = 0.707 Vin", [...filter("lp", { instruments: true, hlNet: true, source: "1.59 kHz" })], "Vo ≈ 1.41 Vpp (−3 dB), φ = −45°");
export const step05 = sheet("Above fc: −20 dB/decade", [...filter("lp", { instruments: true, source: "10 kHz" })], "10 kHz: Vo ≈ 0.31 Vpp, φ ≈ −81°");
export const step06 = sheet("High-Pass: C in series, R to ground", [...filter("hp", { instruments: true, hlNet: true, hlInstruments: true })], "Same R and C: fc ≈ 1.59 kHz");
export const step07 = sheet("Below fc: output blocked", [...filter("hp", { instruments: true, source: "100 Hz" })], "100 Hz: Vo ≈ 0.13 Vpp, φ ≈ +86°");
export const step08 = sheet("At fc: Vo = 0.707 Vin", [...filter("hp", { instruments: true, hlNet: true, source: "1.59 kHz" })], "Vo ≈ 1.41 Vpp (−3 dB), φ = +45°");
export const step09 = sheet("Above fc: Vo ≈ Vin", [...filter("hp", { instruments: true, source: "10 kHz" })], "10 kHz: Vo ≈ 1.98 Vpp, φ ≈ +9°");

export const rcFiltersStepSchematics: SchematicData[] = [
  step01, step02, step03, step04, step05, step06, step07, step08, step09,
];

export const rcFiltersTheoryDiagram: SchematicData = {
  width: 700,
  height: H,
  elements: [
    label("title_lp", 190, 22, "Low-pass (integrator form)"),
    ...filter("lp", { instruments: true, source: "Vin" }),
    label("title_hp", 530, 22, "High-pass (differentiator form)"),
    ...filter("hp", { dx: 340, instruments: true, source: "Vin" }),
    label("caption", 350, 228, "|H| = 1/√(1+(f/fc)²) for LPF,  (f/fc)/√(1+(f/fc)²) for HPF"),
  ],
};
