import { flow } from "../diagram";

/** Inside the accumulator. Each operation starts from AC = 0101 and DR = 0011. */
const nodes = [
  { id: "dr", kind: "block" as const, x: 230, y: 78, w: 180, h: 40, label: "DR = 0011" },
  { id: "ac", kind: "block" as const, x: 230, y: 178, w: 180, h: 40, label: "AC = 0101" },
  { id: "op", kind: "block" as const, x: 230, y: 288, w: 200, h: 40, label: "ADD" },
  { id: "out", kind: "block" as const, x: 230, y: 388, w: 180, h: 40, label: "AC result" },
];

const links = [
  { id: "a1", from: "dr", to: "ac" },
  { id: "a2", from: "ac", to: "op" },
  { id: "a3", from: "op", to: "out" },
];

const all = ["dr", "ac", "op", "out"];

export const accumulatorUnitStepSchematics = flow(nodes, links, [
  {
    title: "What the unit can see",
    show: ["dr", "ac"],
    highlight: "ac",
    notes: ["AC holds 0101. DR holds 0011. Every row below starts from these two."],
  },
  {
    title: "Add",
    show: all,
    highlight: "op",
    labels: { op: "ADD", out: "AC = 1000" },
    notes: ["0101 + 0011 = 1000."],
  },
  {
    title: "AND",
    show: all,
    highlight: "op",
    labels: { op: "AND", out: "AC = 0001" },
    notes: ["0101 ∧ 0011 = 0001. Bits are masked, not added."],
  },
  {
    title: "Complement",
    show: all,
    highlight: "op",
    labels: { op: "CMA", out: "AC = 1010" },
    notes: ["CMA flips AC. DR is not used. 0101 becomes 1010."],
  },
  {
    title: "Shift right",
    show: all,
    highlight: "op",
    labels: { op: "SHR", out: "AC = 0010" },
    notes: ["A logical shift right of 0101 is 0010. The incoming bit is 0."],
  },
]);

export const accumulatorUnitTheoryDiagram = accumulatorUnitStepSchematics[4];
