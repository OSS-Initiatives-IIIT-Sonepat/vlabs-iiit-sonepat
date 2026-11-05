import { flow, type FlowLink, type FlowNode } from "../diagram";

/** Unit 5: R1 ← R2 + R3 through SELA, SELB, OPR, and SELD. */
const nodes: FlowNode[] = [
  { id: "start", kind: "terminal", x: 210, y: 78, w: 188, label: "START" },
  {
    id: "sel",
    kind: "block",
    x: 210,
    y: 186,
    w: 240,
    label: "SELA = R2,  SELB = R3",
  },
  { id: "opr", kind: "decision", x: 210, y: 316, label: "OPR = ADD?" },
  {
    id: "other",
    kind: "block",
    x: 500,
    y: 316,
    w: 170,
    label: "AND, OR, shift…",
  },
  { id: "alu", kind: "block", x: 210, y: 446, w: 200, label: "4 + 5 = 9" },
  {
    id: "end",
    kind: "terminal",
    x: 210,
    y: 554,
    w: 210,
    label: "END  SELD → R1",
  },
];

const links: FlowLink[] = [
  { id: "l0", from: "start", to: "sel" },
  { id: "l1", from: "sel", to: "opr" },
  { id: "l2", from: "opr", to: "other", label: "no" },
  { id: "l3", from: "opr", to: "alu", label: "yes" },
  { id: "l4", from: "alu", to: "end" },
];

export const generalRegistersStepSchematics = flow(nodes, links, [
  {
    title: "The operation",
    show: ["start"],
    highlight: "start",
    notes: ["The slide's example is R1 ← R2 + R3. R2 holds 4 and R3 holds 5."],
  },
  {
    title: "Select the source registers",
    show: ["start", "sel"],
    highlight: "sel",
    notes: [
      "SELA = 010 places R2 on the A bus. SELB = 011 places R3 on the B bus.",
    ],
  },
  {
    title: "Choose ADD",
    show: ["start", "sel", "opr", "other"],
    highlight: "opr",
    notes: [
      "OPR = 00010 is A + B. The other codes are transfer, AND, OR, XOR, and shifts.",
    ],
  },
  {
    title: "Load R1",
    show: ["start", "sel", "opr", "other", "alu", "end"],
    highlight: "end",
    notes: ["The ALU outputs 9. SELD = 001 loads that output bus into R1."],
  },
]);

export const generalRegistersTheoryDiagram = generalRegistersStepSchematics[3];
