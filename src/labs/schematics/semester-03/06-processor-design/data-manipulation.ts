import { flow, type FlowLink, type FlowNode } from "../diagram";

const nodes: FlowNode[] = [
  {
    id: "start",
    kind: "terminal",
    x: 210,
    y: 78,
    w: 188,
    label: "START",
  },
  {
    id: "mov",
    kind: "decision",
    x: 210,
    y: 186,
    w: 150,
    label: "Transfer?",
  },
  {
    id: "movv",
    kind: "block",
    x: 500,
    y: 186,
    w: 188,
    label: "MOV  R1 ← 0101",
  },
  {
    id: "add",
    kind: "decision",
    x: 210,
    y: 316,
    w: 150,
    label: "Arithmetic?",
  },
  {
    id: "addv",
    kind: "block",
    x: 500,
    y: 316,
    w: 188,
    label: "ADD → 1000",
  },
  {
    id: "xor",
    kind: "decision",
    x: 210,
    y: 446,
    w: 150,
    label: "Logic?",
  },
  {
    id: "xorv",
    kind: "block",
    x: 500,
    y: 446,
    w: 188,
    label: "XOR → 0110",
  },
  {
    id: "end",
    kind: "terminal",
    x: 210,
    y: 576,
    w: 188,
    label: "END  SHR → 0010",
  },
];

const links: FlowLink[] = [
  {
    id: "l0",
    from: "start",
    to: "mov",
  },
  {
    id: "l1",
    from: "mov",
    to: "movv",
    label: "yes",
  },
  {
    id: "l2",
    from: "mov",
    to: "add",
    label: "no",
  },
  {
    id: "l3",
    from: "add",
    to: "addv",
    label: "yes",
  },
  {
    id: "l4",
    from: "add",
    to: "xor",
    label: "no",
  },
  {
    id: "l5",
    from: "xor",
    to: "xorv",
    label: "yes",
  },
  {
    id: "l6",
    from: "xor",
    to: "end",
    label: "no",
  },
];

export const dataManipulationStepSchematics = flow(nodes, links, [
  {
    title: "A copy",
    notes: ["MOV R1, R2 writes 0101 into R1. Nothing is added or shifted."],
    show: ["start", "mov", "movv"],
    highlight: "movv",
  },
  {
    title: "An add",
    notes: ["0101 + 0011 = 1000. This is an arithmetic manipulation."],
    show: ["start", "mov", "movv", "add", "addv"],
    highlight: "addv",
  },
  {
    title: "A logic operation",
    notes: ["0101 ⊕ 0011 = 0110. Bits are combined without a carry."],
    show: ["start", "mov", "movv", "add", "addv", "xor", "xorv"],
    highlight: "xorv",
  },
  {
    title: "A shift",
    notes: ["SHR moves 0101 one place right. The result is 0010."],
    show: ["start", "mov", "movv", "add", "addv", "xor", "xorv", "end"],
    highlight: "end",
  },
]);

export const dataManipulationTheoryDiagram = dataManipulationStepSchematics[3];
