import { type SchematicData, type SchematicElement } from "@/labs/CircuitSchematic";

/*
 * S2 DEMUX as Address Decoder
 * 1:2 DEMUX with I=1 acts as address decoder
 *
 * AND0 (260,100) in (234,92)/(234,108) = I·S'   AND1 (260,180) in (234,172)/(234,188) = I·S
 * NOT  (120,140) in (98,140) out (146,140)
 */

const W = 470;
const H = 280;

const wire = (id: string, ...pts: [number, number][]): Extract<SchematicElement, { type: "wire" }> =>
  ({ type: "wire", id, points: pts.map(([x, y]) => ({ x, y })) });
const label = (id: string, x: number, y: number, text: string): SchematicElement =>
  ({ type: "label", id, x, y, text });
const junction = (id: string, x: number, y: number): SchematicElement => ({ type: "junction", id, x, y });
const hl = <T extends SchematicElement>(el: T, highlight?: boolean): T => (highlight ? { ...el, highlight } : el);

/** Gate output → 330Ω → LED → ground. */
const outStage = (id: string, y: number, text: string, highlight?: boolean): SchematicElement[] => [
  hl(wire(`w_${id}`, [286, y], [320, y]), highlight),
  { type: "resistor", id: `r_${id}`, x: 350, y, label: "330Ω", highlight },
  wire(`w_${id}_led`, [380, y], [390, y]),
  { type: "led", id: `led_${id}`, x: 410, y, label: text, highlight },
  wire(`w_${id}_gnd`, [430, y], [445, y], [445, y + 10]),
  { type: "ground", id: `gnd_${id}`, x: 445, y: y + 10 },
];

type Opts = {
  s?: string;
  names?: [string, string, string];
  hlGates?: boolean;
  leds?: [string, string];
  hlLeds?: boolean;
  active?: 0 | 1;
};

const decoder = ({ s = "S", names = ["S'", "Y0", "Y1"], hlGates, leds, hlLeds, active }: Opts = {}): SchematicElement[] => [
  { type: "not-gate", id: "not1", x: 120, y: 140, label: names[0], highlight: hlGates },
  { type: "and-gate", id: "and0", x: 260, y: 100, label: names[1], highlight: hlGates || active === 0 || undefined },
  { type: "and-gate", id: "and1", x: 260, y: 180, label: names[2], highlight: hlGates || active === 1 || undefined },
  label("li", 16, 92, "I=1"), wire("wi", [30, 92], [234, 92]),
  wire("wi2", [180, 92], [180, 172], [234, 172]), junction("ji", 180, 92),
  label("ls", 20, 140, s), wire("ws", [30, 140], [98, 140]),
  wire("ws2", [60, 140], [60, 188], [234, 188]), junction("js", 60, 140),
  wire("wn", [146, 140], [200, 140], [200, 108], [234, 108]),
  ...(leds ? [...outStage("y0", 100, leds[0], hlLeds || active === 0), ...outStage("y1", 180, leds[1], hlLeds || active === 1)] : []),
];

/** Step 1: Build 1:2 DEMUX with I=1 */
export const step01: SchematicData = { width: W, height: H, elements: [
  label("title", 235, 20, "Step 1: 1:2 DEMUX as Decoder"),
  label("eq", 235, 45, "Y0 = I·S' = S', Y1 = I·S = S (when I=1)"),
  ...decoder({ hlGates: true }),
  label("desc", 235, 250, "I permanently HIGH → pure decoder"),
]};

/** Step 2: Connect address switch and LED indicators */
export const step02: SchematicData = { width: W, height: H, elements: [
  label("title", 235, 20, "Step 2: Address Switch & LEDs"),
  ...decoder({ leds: ["Dev0", "Dev1"], hlLeds: true }),
  label("desc", 235, 250, "LEDs represent chip-select for 2 devices"),
]};

/** Step 3: Verify deselected peripheral */
export const step03: SchematicData = { width: W, height: H, elements: [
  label("title", 235, 20, "Step 3: Verify Deselection"),
  label("addr", 235, 45, "Address S=0"),
  ...decoder({ s: "S=0", names: ["0'=1", "Y0=1", "Y1=0"], leds: ["ON", "OFF"], active: 0 }),
  label("note", 235, 240, "Device 0 selected (Y0=1)"),
  label("note2", 235, 262, "Device 1 deselected (Y1=0)"),
]};

/** Step 4: Switch address and verify other device */
export const step04: SchematicData = { width: W, height: H, elements: [
  label("title", 235, 20, "Step 4: Switch Address"),
  label("addr", 235, 45, "Address S=1"),
  ...decoder({ s: "S=1", names: ["1'=0", "Y0=0", "Y1=1"], leds: ["OFF", "ON"], active: 1 }),
  label("note", 235, 240, "Device 1 now selected (Y1=1)"),
  label("note2", 235, 262, "Device 0 deselected (Y0=0)"),
]};

/** Step 5: Simulate bus conflict prevention */
export const step05: SchematicData = { width: W, height: H, elements: [
  label("title", 235, 20, "Step 5: Bus Conflict Prevention"),
  label("note1", 235, 45, "Decoder ensures EXACTLY ONE output HIGH"),
  ...decoder({ names: ["S'", "CS0", "CS1"], leds: ["Mem 0", "Mem 1"], hlLeds: true }),
  label("desc", 235, 250, "Only the selected device drives the shared data bus → no conflict"),
]};

export const s2DemuxAddressDecoderStepSchematics: SchematicData[] = [
  step01, step02, step03, step04, step05,
];

export const s2DemuxAddressDecoderTheoryDiagram: SchematicData = { width: W, height: H, elements: [
  label("title", 235, 20, "DEMUX as Address Decoder"),
  ...decoder({ names: ["S'", "CS0", "CS1"], leds: ["Dev 0", "Dev 1"] }),
  label("t1", 235, 236, "S=0: Y0=1 (Dev0), Y1=0  |  S=1: Y0=0, Y1=1 (Dev1)"),
  label("app", 235, 260, "Application: Memory bank selection"),
]};
