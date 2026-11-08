import {
  type SchematicData,
  type SchematicElement,
} from "@/labs/CircuitSchematic";

const W = 400;
const H = 280;

const v1 = (on = true, highlight?: boolean): SchematicElement =>
  on
    ? {
        type: "vsource",
        id: "V1",
        x: 50,
        y: 150,
        label: "V₁",
        value: "9 V",
        highlight,
      }
    : {
        type: "wire",
        id: "w_kill_v1",
        points: [
          { x: 50, y: 120 },
          { x: 50, y: 180 },
        ],
        highlight: true,
      };
const v2 = (on = true, highlight?: boolean): SchematicElement =>
  on
    ? {
        type: "vsource",
        id: "V2",
        x: 350,
        y: 150,
        label: "V₂",
        value: "6 V",
        highlight,
      }
    : {
        type: "wire",
        id: "w_kill_v2",
        points: [
          { x: 350, y: 120 },
          { x: 350, y: 180 },
        ],
        highlight: true,
      };

const r1: SchematicElement = {
  type: "resistor",
  id: "R1",
  x: 140,
  y: 70,
  label: "R₁",
  value: "1 kΩ",
};
const r2: SchematicElement = {
  type: "resistor",
  id: "R2",
  x: 260,
  y: 70,
  label: "R₂",
  value: "2.2 kΩ",
};
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

const wires: SchematicElement[] = [
  {
    type: "wire",
    id: "w_v1_gnd",
    points: [
      { x: 50, y: 180 },
      { x: 50, y: 240 },
      { x: 200, y: 240 },
    ],
  },
  {
    type: "wire",
    id: "w_v2_gnd",
    points: [
      { x: 350, y: 180 },
      { x: 350, y: 240 },
      { x: 200, y: 240 },
    ],
  },
  {
    type: "wire",
    id: "w_v1_r1",
    points: [
      { x: 50, y: 120 },
      { x: 50, y: 70 },
      { x: 110, y: 70 },
    ],
  },
  {
    type: "wire",
    id: "w_r1_r2",
    points: [
      { x: 170, y: 70 },
      { x: 230, y: 70 },
    ],
  },
  {
    type: "wire",
    id: "w_r2_v2",
    points: [
      { x: 290, y: 70 },
      { x: 350, y: 70 },
      { x: 350, y: 120 },
    ],
  },
  {
    type: "wire",
    id: "w_node",
    points: [
      { x: 200, y: 70 },
      { x: 200, y: 130 },
    ],
  },
  {
    type: "wire",
    id: "w_r3_gnd",
    points: [
      { x: 200, y: 190 },
      { x: 200, y: 240 },
    ],
  },
];

const note = (text: string): SchematicElement => ({
  type: "label",
  id: "lbl",
  x: 200,
  y: 268,
  text,
});

function fig(
  sources: { v1?: boolean; v2?: boolean },
  parts: SchematicElement[],
  caption?: string,
): SchematicData {
  return {
    width: W,
    height: H,
    elements: [
      v1(sources.v1 !== false),
      v2(sources.v2 !== false),
      ...parts,
      ...(caption ? [note(caption)] : []),
    ],
  };
}

const upToR3: SchematicElement[] = [
  ...wires,
  gnd,
  jGnd,
  jNode,
  r1,
  r2,
  r3(),
];

export const step01: SchematicData = {
  width: W,
  height: H,
  elements: [
    { type: "label", id: "lbl", x: 200, y: 140, text: "Place the breadboard" },
  ],
};
export const step02: SchematicData = {
  width: W,
  height: H,
  elements: [v1(true, true), wires[0], gnd],
};
export const step03: SchematicData = fig({}, [wires[0], wires[1], gnd, jGnd]);
export const step04: SchematicData = fig({}, [
  wires[0],
  wires[1],
  gnd,
  jGnd,
  wires[2],
  r1,
]);
export const step05: SchematicData = fig({}, [
  wires[0],
  wires[1],
  gnd,
  jGnd,
  wires[2],
  r1,
  wires[3],
  r2,
  wires[4],
]);
export const step06: SchematicData = fig({}, [...upToR3.slice(0, -1), r3(true)]);
export const step07: SchematicData = fig({}, upToR3, "Both on: I = 2.02 mA, V = 6.67 V");
export const step08: SchematicData = fig(
  { v2: false },
  upToR3,
  "V₁ alone: I = 1.55 mA, V = 5.12 V",
);
export const step09: SchematicData = fig(
  { v1: false },
  upToR3,
  "V₂ alone: I = 0.47 mA, V = 1.55 V",
);
export const step10: SchematicData = fig(
  {},
  upToR3,
  "1.55 + 0.47 = 2.02 mA    5.12 + 1.55 = 6.67 V",
);

export const theoryDiagram = step07;
