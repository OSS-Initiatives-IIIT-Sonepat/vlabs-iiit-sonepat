import {
  type SchematicData,
  type SchematicElement,
} from "@/labs/CircuitSchematic";

const W = 400;
const H = 280;

const v1 = (value = "9 V", highlight?: boolean): SchematicElement => ({
  type: "vsource",
  id: "V1",
  x: 50,
  y: 150,
  label: "V₁",
  value,
  highlight,
});
const v2 = (highlight?: boolean): SchematicElement => ({
  type: "vsource",
  id: "V2",
  x: 350,
  y: 150,
  label: "V₂",
  value: "6 V",
  highlight,
});
const r1 = (highlight?: boolean): SchematicElement => ({
  type: "resistor",
  id: "R1",
  x: 140,
  y: 70,
  label: "R₁",
  value: "1 kΩ",
  highlight,
});
const r2 = (highlight?: boolean): SchematicElement => ({
  type: "resistor",
  id: "R2",
  x: 260,
  y: 70,
  label: "R₂",
  value: "2.2 kΩ",
  highlight,
});
const r3 = (highlight?: boolean): SchematicElement => ({
  type: "resistor",
  id: "R3",
  x: 200,
  y: 160,
  rotation: 90,
  label: "R₃",
  value: "3.3 kΩ",
  highlight,
});
const gnd: SchematicElement = { type: "ground", id: "GND", x: 200, y: 240 };
const jNode: SchematicElement = { type: "junction", id: "j_node", x: 200, y: 70 };
const jGnd: SchematicElement = { type: "junction", id: "j_gnd", x: 200, y: 240 };

const wV1g: SchematicElement = {
  type: "wire",
  id: "w_v1_gnd",
  points: [
    { x: 50, y: 180 },
    { x: 50, y: 240 },
    { x: 200, y: 240 },
  ],
};
const wV2g: SchematicElement = {
  type: "wire",
  id: "w_v2_gnd",
  points: [
    { x: 350, y: 180 },
    { x: 350, y: 240 },
    { x: 200, y: 240 },
  ],
};
const wV1r1: SchematicElement = {
  type: "wire",
  id: "w_v1_r1",
  points: [
    { x: 50, y: 120 },
    { x: 50, y: 70 },
    { x: 110, y: 70 },
  ],
};
const wR1r2: SchematicElement = {
  type: "wire",
  id: "w_r1_r2",
  points: [
    { x: 170, y: 70 },
    { x: 230, y: 70 },
  ],
};
const wR2v2: SchematicElement = {
  type: "wire",
  id: "w_r2_v2",
  points: [
    { x: 290, y: 70 },
    { x: 350, y: 70 },
    { x: 350, y: 120 },
  ],
};
const wNode: SchematicElement = {
  type: "wire",
  id: "w_node",
  points: [
    { x: 200, y: 70 },
    { x: 200, y: 130 },
  ],
};
const wR3g: SchematicElement = {
  type: "wire",
  id: "w_r3_gnd",
  points: [
    { x: 200, y: 190 },
    { x: 200, y: 240 },
  ],
};

const note = (text: string): SchematicElement => ({
  type: "label",
  id: "lbl",
  x: 200,
  y: 268,
  text,
});

const blank = (text: string): SchematicData => ({
  width: W,
  height: H,
  elements: [{ type: "label", id: "lbl", x: 200, y: 140, text }],
});

export const step01: SchematicData = blank("Place the breadboard");

export const step02: SchematicData = {
  width: W,
  height: H,
  elements: [v1("9 V", true), wV1g, gnd],
};

export const step03: SchematicData = {
  width: W,
  height: H,
  elements: [v1(), wV1g, v2(true), wV2g, gnd, jGnd],
};

export const step04: SchematicData = {
  width: W,
  height: H,
  elements: [v1(), wV1g, v2(), wV2g, gnd, jGnd, wV1r1, r1(true)],
};

export const step05: SchematicData = {
  width: W,
  height: H,
  elements: [
    v1(),
    wV1g,
    v2(),
    wV2g,
    gnd,
    jGnd,
    wV1r1,
    r1(),
    wR1r2,
    r2(true),
    wR2v2,
  ],
};

export const step06: SchematicData = {
  width: W,
  height: H,
  elements: [
    v1(),
    wV1g,
    v2(),
    wV2g,
    gnd,
    jGnd,
    wV1r1,
    r1(),
    wR1r2,
    jNode,
    r2(),
    wR2v2,
    wNode,
    r3(true),
    wR3g,
  ],
};

const network = (v1Value = "9 V"): SchematicElement[] => [
  v1(v1Value),
  wV1g,
  v2(),
  wV2g,
  gnd,
  jGnd,
  wV1r1,
  r1(),
  wR1r2,
  jNode,
  r2(),
  wR2v2,
  wNode,
  r3(),
  wR3g,
];

export const step07: SchematicData = {
  width: W,
  height: H,
  elements: [...network(), note("I₁ = 2.33 mA")],
};
export const step08: SchematicData = {
  width: W,
  height: H,
  elements: [...network(), note("I₂ = −0.31 mA")],
};
export const step09: SchematicData = {
  width: W,
  height: H,
  elements: [...network(), note("I₃ = 2.02 mA    2.33 + (−0.31) − 2.02 = 0")],
};
export const step10: SchematicData = {
  width: W,
  height: H,
  elements: [...network(), note("Loop 1: 9.00 − 2.33 − 6.67 = 0")],
};
export const step11: SchematicData = {
  width: W,
  height: H,
  elements: [...network(), note("Loop 2: 6.00 − (−0.67) − 6.67 = 0")],
};
export const step12: SchematicData = {
  width: W,
  height: H,
  elements: [
    ...network("12 V"),
    note("12 V: I₁ = 3.62 mA, I₂ = −1.08 mA, I₃ = 2.54 mA"),
  ],
};

export const theoryDiagram: SchematicData = step09;
