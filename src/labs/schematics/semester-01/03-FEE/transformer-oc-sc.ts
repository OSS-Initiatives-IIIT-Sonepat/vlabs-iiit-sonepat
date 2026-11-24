import {
  type SchematicData,
  type SchematicElement,
} from "@/labs/CircuitSchematic";

const W = 420;
const H = 270;

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
    { type: "label", id: "caption", x: W / 2, y: 256, text: caption },
  ],
});

const src = (value: string): SchematicElement => ({
  type: "acsource",
  id: "AC",
  x: 50,
  y: 140,
  label: "AC",
  value,
});
const pri = (highlight?: boolean): SchematicElement => ({
  type: "inductor",
  id: "P",
  x: 300,
  y: 140,
  rotation: 90,
  label: "P",
  value: "230 V",
  highlight,
});
const sec = (highlight?: boolean): SchematicElement => ({
  type: "inductor",
  id: "S",
  x: 170,
  y: 140,
  rotation: 90,
  label: "S",
  value: "115 V",
  highlight,
});
const gnd: SchematicElement = { type: "ground", id: "GND", x: 50, y: 230 };

const oc = (live: boolean): SchematicElement[] => [
  src(live ? "115 V" : "0 V"),
  {
    type: "wire",
    id: "w_top",
    points: [
      { x: 50, y: 110 },
      { x: 50, y: 70 },
      { x: 96, y: 70 },
    ],
  },
  {
    type: "ammeter",
    id: "AM",
    x: 120,
    y: 70,
    rotation: 90,
    label: "I0",
    highlight: true,
  },
  {
    type: "wire",
    id: "w_am_s",
    points: [
      { x: 144, y: 70 },
      { x: 170, y: 70 },
      { x: 170, y: 110 },
    ],
  },
  sec(true),
  {
    type: "wire",
    id: "w_s_bot",
    points: [
      { x: 170, y: 170 },
      { x: 170, y: 200 },
    ],
  },
  {
    type: "wire",
    id: "w_ret",
    points: [
      { x: 170, y: 200 },
      { x: 50, y: 200 },
    ],
  },
  {
    type: "wire",
    id: "w_src",
    points: [
      { x: 50, y: 170 },
      { x: 50, y: 230 },
    ],
  },
  gnd,
  { type: "junction", id: "j_src", x: 50, y: 200 },
  { type: "junction", id: "j_bot", x: 170, y: 200 },
  {
    type: "voltmeter",
    id: "VM",
    x: 230,
    y: 140,
    label: "V0",
    highlight: live,
  },
  {
    type: "wire",
    id: "w_vm_top",
    points: [
      { x: 170, y: 70 },
      { x: 230, y: 70 },
      { x: 230, y: 116 },
    ],
  },
  { type: "junction", id: "j_top", x: 170, y: 70 },
  {
    type: "wire",
    id: "w_vm_bot",
    points: [
      { x: 230, y: 164 },
      { x: 230, y: 200 },
      { x: 170, y: 200 },
    ],
  },
  pri(),
];

const sc = (live: boolean): SchematicElement[] => [
  src(live ? "10 V" : "0 V"),
  {
    type: "wire",
    id: "w_top",
    points: [
      { x: 50, y: 110 },
      { x: 50, y: 70 },
      { x: 136, y: 70 },
    ],
  },
  {
    type: "ammeter",
    id: "AM",
    x: 160,
    y: 70,
    rotation: 90,
    label: "Isc",
    highlight: true,
  },
  {
    type: "wire",
    id: "w_am_p",
    points: [
      { x: 184, y: 70 },
      { x: 300, y: 70 },
      { x: 300, y: 110 },
    ],
  },
  { type: "junction", id: "j_pri", x: 300, y: 70 },
  pri(true),
  {
    type: "wire",
    id: "w_p_bot",
    points: [
      { x: 300, y: 170 },
      { x: 300, y: 210 },
      { x: 50, y: 210 },
    ],
  },
  {
    type: "wire",
    id: "w_src",
    points: [
      { x: 50, y: 170 },
      { x: 50, y: 230 },
    ],
  },
  gnd,
  { type: "junction", id: "j_ret", x: 50, y: 210 },
  {
    type: "voltmeter",
    id: "VM",
    x: 360,
    y: 140,
    label: "Vsc",
  },
  {
    type: "wire",
    id: "w_vm_top",
    points: [
      { x: 300, y: 70 },
      { x: 360, y: 70 },
      { x: 360, y: 116 },
    ],
  },
  {
    type: "wire",
    id: "w_vm_bot",
    points: [
      { x: 360, y: 164 },
      { x: 360, y: 210 },
      { x: 300, y: 210 },
    ],
  },
  { type: "junction", id: "j_vm", x: 300, y: 210 },
  sec(true),
  {
    type: "wire",
    id: "w_short",
    points: [
      { x: 170, y: 110 },
      { x: 210, y: 110 },
      { x: 210, y: 170 },
      { x: 170, y: 170 },
    ],
    highlight: true,
  },
];

export const step01 = sheet(
  "Transformer OC and SC tests",
  [],
  "230 / 115 V, 230 VA",
);
export const step02 = sheet(
  "Primary P, secondary S",
  [pri(true), sec(true)],
  "P is 230 V, S is 115 V",
);
export const step03 = sheet(
  "Open-circuit test on S",
  oc(false),
  "P is left open",
);
export const step04 = sheet(
  "Rated voltage on S",
  oc(true),
  "V0 = 115 V, I0 = 0.20 A, W0 = 10 W",
);
export const step05 = sheet(
  "Short-circuit test on P",
  sc(false),
  "S is shorted",
);
export const step06 = sheet(
  "Full-load current on P",
  sc(true),
  "Vsc = 10 V, Isc = 1.00 A, Wsc = 8 W",
);
export const step07 = sheet(
  "Efficiency from the two tests",
  sc(true),
  "η = 92.7% at full load, unity pf",
);

export const theoryDiagram = step04;
