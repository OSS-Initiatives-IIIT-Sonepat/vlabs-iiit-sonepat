import {
  type SchematicData,
  type SchematicElement,
} from "@/labs/CircuitSchematic";

const W = 480;
const H = 300;

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
    { type: "label", id: "caption", x: W / 2, y: 286, text: caption },
  ],
});

const q = (highlight?: boolean): SchematicElement => ({
  type: "npn-bjt",
  id: "Q",
  x: 220,
  y: 150,
  label: "Q1",
  highlight,
});
const rb = (highlight?: boolean): SchematicElement => ({
  type: "resistor",
  id: "RB",
  x: 140,
  y: 100,
  label: "RB",
  value: "100 kΩ",
  highlight,
});
const vbb = (value: string): SchematicElement => ({
  type: "vsource",
  id: "VBB",
  x: 50,
  y: 150,
  label: "VBB",
  value,
});
const vcc = (value: string): SchematicElement => ({
  type: "vsource",
  id: "VCC",
  x: 380,
  y: 90,
  label: "VCC",
  value,
});
const gnd: SchematicElement = { type: "ground", id: "GND", x: 140, y: 250 };

const wB = wire("w_b", [
  [170, 100],
  [170, 150],
  [200, 150],
]);
const wE = wire("w_e", [
  [240, 180],
  [240, 250],
]);
const wSpan = wire("w_span", [
  [140, 250],
  [240, 250],
]);
const wBb = wire("w_bb", [
  [50, 120],
  [50, 100],
  [110, 100],
]);
const wBbGnd = wire("w_bb_gnd", [
  [50, 180],
  [50, 250],
  [140, 250],
]);

const amIb: SchematicElement = {
  type: "ammeter",
  id: "IB",
  x: 110,
  y: 70,
  label: "IB",
  highlight: true,
};
const vmBe: SchematicElement = {
  type: "voltmeter",
  id: "VBE",
  x: 200,
  y: 210,
  rotation: 90,
  label: "VBE",
};
const amIc: SchematicElement = {
  type: "ammeter",
  id: "IC",
  x: 320,
  y: 60,
  rotation: 90,
  label: "IC",
  highlight: true,
};
const vmCe: SchematicElement = {
  type: "voltmeter",
  id: "VCE",
  x: 440,
  y: 150,
  rotation: 90,
  label: "VCE",
};

const base = (v: string, meters: boolean): SchematicElement[] => {
  const els: SchematicElement[] = [
    q(),
    rb(),
    vbb(v),
    wB,
    wE,
    wSpan,
    wBbGnd,
    gnd,
  ];
  if (meters) {
    els.push(
      amIb,
      wire("w_bb_m", [
        [50, 120],
        [50, 46],
        [110, 46],
      ]),
      wire("w_ib_rb", [
        [110, 94],
        [110, 100],
      ]),
      vmBe,
      wire("w_be1", [
        [200, 150],
        [200, 186],
        [176, 186],
        [176, 210],
      ]),
      wire("w_be2", [
        [224, 210],
        [224, 250],
      ]),
      junction("j_b", 200, 150),
      junction("j_gnd", 140, 250),
      junction("j_be", 224, 250),
    );
  } else {
    els.push(wBb, junction("j_gnd", 140, 250));
  }
  return els;
};

const collector = (value: string): SchematicElement[] => [
  vcc(value),
  wire("w_c", [
    [240, 120],
    [240, 60],
    [296, 60],
  ]),
  amIc,
  wire("w_ic", [
    [344, 60],
    [380, 60],
  ]),
  wire("w_vcc_gnd", [
    [380, 120],
    [380, 250],
    [240, 250],
  ]),
  junction("j_e", 240, 250),
];

const vceMeter: SchematicElement[] = [
  vmCe,
  wire("w_ce1", [
    [240, 120],
    [270, 120],
    [270, 150],
    [416, 150],
  ]),
  wire("w_ce2", [
    [464, 150],
    [464, 250],
    [380, 250],
  ]),
  junction("j_c", 240, 120),
  junction("j_rail", 380, 250),
];

const shorted = (): SchematicElement[] => [
  wire("w_short", [
    [240, 120],
    [300, 120],
    [300, 250],
    [240, 250],
  ]),
  vmCe,
  wire("w_ce_s", [
    [300, 120],
    [416, 120],
    [416, 150],
  ]),
  wire("w_ce_r", [
    [464, 150],
    [464, 250],
    [300, 250],
  ]),
  junction("j_short", 300, 120),
  junction("j_sbot", 300, 250),
  junction("j_e", 240, 250),
];

export const step01 = sheet(
  "CE characteristics",
  [q(true)],
  "BC547, emitter common",
);
export const step02 = sheet(
  "Emitter to ground",
  [q(), wE, wSpan, gnd],
  "Emitter is the common terminal",
);
export const step03 = sheet(
  "Base resistor 100 kΩ",
  [q(), rb(true), wB, wE, wSpan, gnd],
  "IB = (VBB − VBE) / RB",
);
export const step04 = sheet(
  "Base supply",
  base("0 V", false),
  "VBB returns to the emitter",
);
export const step05 = sheet(
  "Input point, IB = 40 µA",
  base("4.69 V", true),
  "VBE = 0.69 V",
);
export const step06 = sheet(
  "Collector supply and IC",
  [...base("4.69 V", true), ...collector("2 V")],
  "IC = 4.04 mA at VCE = 2 V",
);
export const step07 = sheet(
  "VCE = 2 V",
  [...base("4.69 V", true), ...collector("2 V"), ...vceMeter],
  "IC = 4.04 mA",
);
export const step08 = sheet(
  "VCE = 5 V",
  [...base("4.69 V", true), ...collector("5 V"), ...vceMeter],
  "IC = 4.10 mA, ro = 50 kΩ",
);
export const step09 = sheet(
  "IB = 20 µA",
  [...base("2.67 V", true), ...collector("5 V"), ...vceMeter],
  "IC = 2.05 mA",
);
export const step10 = sheet(
  "IB = 60 µA",
  [...base("6.70 V", true), ...collector("5 V"), ...vceMeter],
  "IC = 6.15 mA",
);
export const step11 = sheet(
  "Input curve at VCE = 0",
  [...base("4.71 V", true), ...shorted()],
  "VBE = 0.71 V at the same IB",
);
export const step12 = sheet(
  "β, ri and ro",
  [...base("4.69 V", true), ...collector("5 V"), ...vceMeter],
  "β = 102.5, ri = 1.0 kΩ, ro = 50 kΩ",
);

export const theoryDiagram = step08;
