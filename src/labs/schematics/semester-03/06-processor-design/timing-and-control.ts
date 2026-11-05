import { flow } from "../diagram";

/** Hardwired timing for a direct ADD. SC clears on the last execute step. */
const nodes = [
  { id: "sc", kind: "block" as const, x: 230, y: 78, w: 200, h: 40, label: "Sequence counter" },
  { id: "t0", kind: "block" as const, x: 230, y: 168, w: 200, h: 40, label: "T0" },
  { id: "t1", kind: "block" as const, x: 230, y: 258, w: 220, h: 40, label: "T1" },
  { id: "t2", kind: "block" as const, x: 230, y: 348, w: 220, h: 40, label: "T2  decode" },
  { id: "ind", kind: "decision" as const, x: 230, y: 458, label: "I = 1?" },
  { id: "t4", kind: "block" as const, x: 230, y: 568, w: 200, h: 40, label: "T4" },
  { id: "t5", kind: "block" as const, x: 230, y: 658, w: 220, h: 40, label: "T5  then SC ← 0" },
];

const links = [
  { id: "a1", from: "sc", to: "t0" },
  { id: "a2", from: "t0", to: "t1" },
  { id: "a3", from: "t1", to: "t2" },
  { id: "a4", from: "t2", to: "ind" },
  { id: "a5", from: "ind", to: "t4" },
  { id: "a6", from: "t4", to: "t5" },
];

const upto = (n: number) => ["sc", "t0", "t1", "t2", "ind", "t4", "t5"].slice(0, n);

export const timingAndControlStepSchematics = flow(nodes, links, [
  {
    title: "The sequence counter",
    show: ["sc"],
    highlight: "sc",
    notes: ["SC is decoded into one active time, T0, T1, T2, …"],
  },
  {
    title: "T0 fetches the address",
    show: upto(2),
    highlight: "t0",
    labels: { t0: "T0:  AR ← PC" },
    notes: ["Only T0 is active. The other times are 0."],
  },
  {
    title: "T1 reads the instruction",
    show: upto(3),
    highlight: "t1",
    labels: { t1: "T1:  IR ← M[AR], PC+1" },
    notes: ["SC has advanced. T0 is off."],
  },
  {
    title: "T2 decodes",
    show: upto(4),
    highlight: "t2",
    labels: { t2: "T2:  D0–D7, AR ← address" },
    notes: ["The opcode becomes one of D0 to D7. I is copied from bit 15."],
  },
  {
    title: "Direct, so T3 does not read again",
    show: upto(5),
    highlight: "ind",
    notes: ["I = 0. An indirect instruction would do AR ← M[AR] here."],
  },
  {
    title: "T4 reads the operand",
    show: upto(6),
    highlight: "t4",
    labels: { t4: "T4:  DR ← M[AR]" },
    notes: ["Direct ADD. D1 and T4 open this transfer."],
  },
  {
    title: "T5 adds and clears SC",
    show: upto(7),
    highlight: "t5",
    labels: { t5: "T5:  AC ← AC + DR, SC ← 0" },
    notes: ["The control returns to T0 for the next instruction."],
  },
]);

export const timingAndControlTheoryDiagram = timingAndControlStepSchematics[6];
