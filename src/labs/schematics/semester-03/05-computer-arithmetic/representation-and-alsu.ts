import { flow } from "../diagram";

/**
 * One declaration of the system. Each step names the boxes to reveal
 * and which one this step is about. `labels` changes the ALSU caption
 * without a second drawing.
 */
const nodes = [
  { id: "data", kind: "block" as const, x: 210, y: 78, w: 210, h: 40, label: "Magnitude 0110" },
  { id: "comp", kind: "block" as const, x: 210, y: 168, w: 210, h: 40, label: "1's, then +1 = 2's" },
  { id: "point", kind: "decision" as const, x: 210, y: 278, label: "Fixed point?" },
  { id: "float", kind: "block" as const, x: 490, y: 278, w: 180, h: 40, label: "0.1101 × 2³" },
  { id: "rtl", kind: "block" as const, x: 210, y: 388, w: 210, h: 40, label: "RTL: R2 ← R1" },
  { id: "bus", kind: "block" as const, x: 210, y: 488, w: 210, h: 40, label: "Three-state buffer" },
  { id: "alsu", kind: "block" as const, x: 210, y: 588, w: 230, h: 40, label: "Arithmetic logic shift unit" },
  { id: "op", kind: "block" as const, x: 500, y: 588, w: 150, h: 40, label: "ADD" },
];

const links = [
  { id: "a1", from: "data", to: "comp" },
  { id: "a2", from: "comp", to: "point" },
  { id: "a3", from: "point", to: "float" },
  { id: "a4", from: "point", to: "rtl" },
  { id: "a5", from: "rtl", to: "bus" },
  { id: "a6", from: "bus", to: "alsu" },
  { id: "a7", from: "alsu", to: "op" },
];

const shown = ["data", "comp", "point", "float", "rtl", "bus", "alsu", "op"];

export const representationAndAlsuStepSchematics = flow(nodes, links, [
  {
    title: "A binary magnitude",
    show: ["data"],
    highlight: "data",
    notes: ["0110 is the unsigned value 6."],
  },
  {
    title: "Complements",
    show: ["data", "comp"],
    highlight: "comp",
    notes: ["Flip the bits, then add 1. 1010 is −6."],
  },
  {
    title: "Fixed point or floating point",
    show: ["data", "comp", "point", "float"],
    highlight: "point",
    notes: ["0110.10 is fixed. The same 6.5 normalises to 0.1101 × 2³."],
  },
  {
    title: "Register transfer",
    show: ["data", "comp", "point", "float", "rtl"],
    highlight: "rtl",
    notes: ["R2 ← R1 copies the word. Nothing is added."],
  },
  {
    title: "A three-state bus",
    show: ["data", "comp", "point", "float", "rtl", "bus"],
    highlight: "bus",
    notes: ["E = 1 connects R1 to the bus. E = 0 leaves the bus free."],
  },
  {
    title: "Arithmetic micro-operation",
    show: shown,
    highlight: "op",
    labels: { op: "ADD" },
    notes: ["R1 ← R1 + R2. 0110 + 0011 = 1001."],
  },
  {
    title: "Logic micro-operation",
    show: shown,
    highlight: "op",
    labels: { op: "XOR" },
    notes: ["R1 ← R1 ⊕ R2. 0110 ⊕ 0011 = 0101."],
  },
  {
    title: "Shift micro-operation",
    show: shown,
    highlight: "op",
    labels: { op: "SHL" },
    notes: ["shl 0110 is 1100. The vacated bit is 0."],
  },
  {
    title: "One arithmetic logic shift unit",
    show: shown,
    highlight: "alsu",
    labels: { op: "ADD  XOR  SHL" },
    notes: ["One unit. The select lines pick add, xor, or shift."],
  },
]);

export const representationAndAlsuTheoryDiagram =
  representationAndAlsuStepSchematics[8];
