import {
  type SchematicData,
  type SchematicElement,
} from "@/labs/CircuitSchematic";

/*
 * Norton, on the same divider. No second network and no fake current source.
 * Measure Voc, then IN with an ammeter short, then RN, then the loaded divider.
 */

const W = 360;
const H = 270;

const vs = (highlight?: boolean): SchematicElement => ({
  type: "vsource",
  id: "VS",
  x: 50,
  y: 130,
  label: "Vs",
  value: "9 V",
  highlight,
});
const r1 = (highlight?: boolean): SchematicElement => ({
  type: "resistor",
  id: "R1",
  x: 120,
  y: 50,
  label: "R₁",
  value: "1 kΩ",
  highlight,
});
const r2 = (highlight?: boolean): SchematicElement => ({
  type: "resistor",
  id: "R2",
  x: 190,
  y: 130,
  rotation: 90,
  label: "R₂",
  value: "2.2 kΩ",
  highlight,
});
const gnd: SchematicElement = { type: "ground", id: "GND", x: 120, y: 210 };

const wVsGnd: SchematicElement = {
  type: "wire",
  id: "w_vs_gnd",
  points: [
    { x: 50, y: 160 },
    { x: 50, y: 210 },
    { x: 120, y: 210 },
  ],
};
const wShort: SchematicElement = {
  type: "wire",
  id: "w_short",
  points: [
    { x: 50, y: 100 },
    { x: 50, y: 160 },
  ],
  highlight: true,
};
const wVsR1: SchematicElement = {
  type: "wire",
  id: "w_vs_r1",
  points: [
    { x: 50, y: 100 },
    { x: 50, y: 50 },
    { x: 90, y: 50 },
  ],
};
const wR1A: SchematicElement = {
  type: "wire",
  id: "w_r1_a",
  points: [
    { x: 150, y: 50 },
    { x: 250, y: 50 },
  ],
};
const wNodeR2: SchematicElement = {
  type: "wire",
  id: "w_node_r2",
  points: [
    { x: 190, y: 50 },
    { x: 190, y: 100 },
  ],
};
const wR2Gnd: SchematicElement = {
  type: "wire",
  id: "w_r2_gnd",
  points: [
    { x: 190, y: 160 },
    { x: 190, y: 210 },
    { x: 120, y: 210 },
  ],
};
const wTop: SchematicElement = {
  type: "wire",
  id: "w_top",
  points: [
    { x: 250, y: 50 },
    { x: 250, y: 106 },
  ],
};
const wBot: SchematicElement = {
  type: "wire",
  id: "w_bot",
  points: [
    { x: 250, y: 154 },
    { x: 250, y: 210 },
  ],
};
const wB: SchematicElement = {
  type: "wire",
  id: "w_b",
  points: [
    { x: 190, y: 210 },
    { x: 250, y: 210 },
  ],
};
const wRlTop: SchematicElement = {
  type: "wire",
  id: "w_rl_top",
  points: [
    { x: 250, y: 50 },
    { x: 310, y: 50 },
    { x: 310, y: 100 },
  ],
};
const wRlBot: SchematicElement = {
  type: "wire",
  id: "w_rl_bot",
  points: [
    { x: 310, y: 160 },
    { x: 310, y: 210 },
    { x: 250, y: 210 },
  ],
};

const jNode: SchematicElement = { type: "junction", id: "j_node", x: 190, y: 50 };
const jGnd: SchematicElement = { type: "junction", id: "j_gnd", x: 120, y: 210 };
const jB: SchematicElement = { type: "junction", id: "j_b", x: 190, y: 210 };
const jA: SchematicElement = { type: "junction", id: "j_a", x: 250, y: 50 };
const jLoad: SchematicElement = { type: "junction", id: "j_load", x: 250, y: 210 };
const lblA: SchematicElement = { type: "label", id: "lbl_a", x: 228, y: 38, text: "A" };
const lblB: SchematicElement = { type: "label", id: "lbl_b", x: 228, y: 198, text: "B" };
const cap = (text: string): SchematicElement => ({
  type: "label",
  id: "lbl",
  x: 180,
  y: 258,
  text,
});

const divider: SchematicElement[] = [
  wVsR1,
  r1(),
  wR1A,
  jNode,
  wNodeR2,
  r2(),
  wR2Gnd,
  jGnd,
];
const across: SchematicElement[] = [wTop, wBot, wB, jB, lblA, lblB];

function fig(
  source: "live" | "short" | "none",
  extra: SchematicElement[],
  caption?: string,
): SchematicData {
  return {
    width: W,
    height: H,
    elements: [
      ...(source === "live" ? [vs()] : source === "short" ? [wShort] : []),
      ...(source === "none" ? [] : [wVsGnd, gnd]),
      ...divider,
      ...extra,
      ...(caption ? [cap(caption)] : []),
    ],
  };
}

export const step01: SchematicData = {
  width: W,
  height: H,
  elements: [
    { type: "label", id: "lbl", x: 180, y: 135, text: "Place the breadboard" },
  ],
};
export const step02: SchematicData = {
  width: W,
  height: H,
  elements: [vs(true), wVsGnd, gnd],
};
export const step03: SchematicData = {
  width: W,
  height: H,
  elements: [vs(), wVsGnd, gnd, wVsR1, r1(true)],
};
export const step04: SchematicData = {
  width: W,
  height: H,
  elements: [
    vs(),
    wVsGnd,
    gnd,
    wVsR1,
    r1(),
    wR1A,
    jNode,
    wNodeR2,
    r2(true),
    wR2Gnd,
    jGnd,
    jA,
    lblA,
    lblB,
  ],
};
export const step05: SchematicData = fig(
  "live",
  [
    {
      type: "voltmeter",
      id: "VM",
      x: 250,
      y: 130,
      label: "Voc",
      highlight: true,
    },
    ...across,
  ],
  "Voc = 6.19 V",
);
export const step06: SchematicData = fig(
  "live",
  [
    {
      type: "ammeter",
      id: "AM",
      x: 250,
      y: 130,
      label: "IN",
      highlight: true,
    },
    ...across,
  ],
  "IN = 9.00 mA",
);
export const step07: SchematicData = fig(
  "short",
  [
    {
      type: "voltmeter",
      id: "VM",
      x: 250,
      y: 130,
      label: "RN",
      highlight: true,
    },
    ...across,
  ],
  "RN = 688 Ω",
);
export const step08: SchematicData = fig(
  "live",
  [
    {
      type: "voltmeter",
      id: "VM",
      x: 250,
      y: 130,
      label: "Voc",
      highlight: true,
    },
    ...across,
  ],
  "6.19 V / 688 Ω = 9.00 mA",
);
export const step09: SchematicData = fig(
  "live",
  [
    {
      type: "voltmeter",
      id: "VM",
      x: 250,
      y: 130,
      highlight: true,
    },
    ...across,
    jA,
    wRlTop,
    {
      type: "resistor",
      id: "RL",
      x: 310,
      y: 130,
      rotation: 90,
      label: "R_L",
      value: "3.3 kΩ",
    },
    wRlBot,
    jLoad,
  ],
  "VL = 5.12 V, IL = 1.55 mA",
);

export const theoryDiagram = step06;

export const nortonStepSchematics: SchematicData[] = [
  step01,
  step02,
  step03,
  step04,
  step05,
  step06,
  step07,
  step08,
  step09,
];
