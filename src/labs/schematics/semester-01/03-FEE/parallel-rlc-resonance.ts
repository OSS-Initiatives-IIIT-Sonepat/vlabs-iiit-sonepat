import {
  type SchematicData,
  type SchematicElement,
} from "@/labs/CircuitSchematic";

const W = 430;
const H = 280;

const wire = (id: string, pts: number[][]): SchematicElement => ({
  type: "wire",
  id,
  points: pts.map(([x, y]) => ({ x, y })),
});
const junction = (id: string, x: number, y: number): SchematicElement => ({
  type: "junction",
  id,
  x,
  y,
});

const fg = (value: string): SchematicElement => ({
  type: "acsource",
  id: "FG",
  x: 50,
  y: 150,
  label: "FG",
  value,
});
const am = (): SchematicElement => ({
  type: "ammeter",
  id: "AM",
  x: 120,
  y: 80,
  rotation: 90,
  label: "I",
  highlight: true,
});
const r = (value: string, highlight?: boolean): SchematicElement => ({
  type: "resistor",
  id: "R",
  x: 190,
  y: 150,
  rotation: 90,
  label: "R",
  value,
  highlight,
});
const l = (highlight?: boolean): SchematicElement => ({
  type: "inductor",
  id: "L",
  x: 260,
  y: 150,
  rotation: 90,
  label: "L",
  value: "10 mH",
  highlight,
});
const c = (value: string, highlight?: boolean): SchematicElement => ({
  type: "capacitor",
  id: "C",
  x: 340,
  y: 160,
  rotation: 90,
  label: "C",
  value,
  highlight,
});
const gnd: SchematicElement = { type: "ground", id: "GND", x: 190, y: 230 };
const probe: SchematicElement = {
  type: "probe",
  id: "CH1",
  x: 310,
  y: 80,
  label: "CRO",
};

const branches = (
  valueR: string,
  valueC: string,
  hl?: "r" | "l" | "c",
): SchematicElement[] => [
  r(valueR, hl === "r"),
  l(hl === "l"),
  c(valueC, hl === "c"),
  wire("w_top_l", [
    [190, 120],
    [260, 120],
  ]),
  wire("w_top_c", [
    [260, 120],
    [340, 120],
    [340, 140],
  ]),
  wire("w_r_bot", [
    [190, 180],
    [190, 230],
  ]),
  wire("w_l_bot", [
    [260, 180],
    [260, 230],
  ]),
  wire("w_bot_l", [
    [190, 230],
    [260, 230],
  ]),
  wire("w_bot_c", [
    [260, 230],
    [340, 230],
  ]),
  wire("w_c_bot", [
    [340, 180],
    [340, 230],
  ]),
  gnd,
  junction("j_lt", 260, 120),
  junction("j_gnd", 190, 230),
  junction("j_lb", 260, 230),
];

const driven = (
  valueR: string,
  valueC: string,
  source: string,
  hl?: "r" | "l" | "c",
  ic?: boolean,
): SchematicElement[] => {
  const els: SchematicElement[] = [
    ...branches(valueR, valueC, hl),
    fg(source),
    wire("w_fg_top", [
      [50, 120],
      [50, 80],
      [96, 80],
    ]),
    am(),
    wire("w_am", [
      [144, 80],
      [190, 80],
      [190, 120],
    ]),
    wire("w_fg_bot", [
      [50, 180],
      [50, 230],
      [190, 230],
    ]),
    wire("w_cro", [
      [260, 120],
      [260, 80],
      [304, 80],
    ]),
    probe,
    junction("j_node", 190, 120),
  ];
  if (ic) {
    return els
      .filter((el) => el.id !== "w_top_c")
      .concat(
        wire("w_top_c", [
          [260, 120],
          [276, 120],
        ]),
        {
          type: "ammeter",
          id: "AMC",
          x: 300,
          y: 120,
          rotation: 90,
          label: "IC",
          highlight: true,
        },
        wire("w_cam_out", [
          [324, 120],
          [340, 120],
          [340, 140],
        ]),
      );
  }
  return els;
};

const sheet = (
  title: string,
  elements: SchematicElement[],
  caption: string,
): SchematicData => ({
  width: W,
  height: H,
  elements: [
    { type: "label", id: "title", x: W / 2, y: 16, text: title },
    ...elements,
    { type: "label", id: "caption", x: W / 2, y: 266, text: caption },
  ],
});

export const step01 = sheet("Parallel RLC", [], "R, L and C in parallel");
export const step02 = sheet(
  "Place R = 1 kΩ",
  [r("1 kΩ", true)],
  "The resistor is the first branch",
);
export const step03 = sheet(
  "L in parallel with R",
  [
    r("1 kΩ"),
    l(true),
    wire("w_top", [
      [190, 120],
      [260, 120],
    ]),
    wire("w_r_bot", [
      [190, 180],
      [190, 230],
    ]),
    wire("w_l_bot", [
      [260, 180],
      [260, 230],
    ]),
    wire("w_join", [
      [260, 230],
      [190, 230],
    ]),
    gnd,
    junction("j_gnd", 190, 230),
  ],
  "Both ends of L meet R",
);
export const step04 = sheet(
  "C in parallel",
  branches("1 kΩ", "0.1 µF", "c"),
  "f0 = 5.03 kHz",
);
export const step05 = sheet(
  "Drive the tank at 2 Vpp",
  driven("1 kΩ", "0.1 µF", "1 kHz"),
  "CRO holds the tank at 2 Vpp",
);
export const step06 = sheet(
  "Below f0 the current is high",
  driven("1 kΩ", "0.1 µF", "3 kHz"),
  "3 kHz: I = 7.13 mA",
);
export const step07 = sheet(
  "Line current is minimum at f0",
  driven("1 kΩ", "0.1 µF", "5.03 kHz"),
  "Imin = 2.00 mA",
);
export const step08 = sheet(
  "Half-power frequencies",
  driven("1 kΩ", "0.1 µF", "4.30 kHz"),
  "f1 = 4.30 kHz, f2 = 5.89 kHz, Q = 3.16",
);
export const step09 = sheet(
  "Capacitor current at f0",
  driven("1 kΩ", "0.1 µF", "5.03 kHz", undefined, true),
  "IC = 6.32 mA, Q = IC / I",
);
export const step10 = sheet(
  "Lower R, same f0",
  driven("470 Ω", "0.1 µF", "5.03 kHz", "r"),
  "Imin = 4.26 mA, Q = 1.49",
);
export const step11 = sheet(
  "Larger C moves f0",
  driven("1 kΩ", "0.22 µF", "3.39 kHz", "c"),
  "f0 = 3.39 kHz, Q = 4.69",
);

export const theoryDiagram = step07;
