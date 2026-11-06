import { flow, type FlowLink, type FlowNode } from "../diagram";

/** Register stack grows up (SP+1). Memory stack grows down (SP−1). */
const nodes: FlowNode[] = [
  {
    id: "start",
    kind: "terminal",
    x: 210,
    y: 78,
    w: 210,
    label: "START  64-word stack",
  },
  { id: "push", kind: "decision", x: 210, y: 208, label: "Register PUSH?" },
  {
    id: "mem",
    kind: "block",
    x: 500,
    y: 208,
    w: 200,
    label: "Memory: SP ← SP − 1",
  },
  {
    id: "inc",
    kind: "block",
    x: 210,
    y: 338,
    w: 230,
    label: "SP ← SP + 1, then write",
  },
  {
    id: "end",
    kind: "terminal",
    x: 210,
    y: 446,
    w: 200,
    label: "END  then POP",
  },
];

const links: FlowLink[] = [
  { id: "l0", from: "start", to: "push" },
  { id: "l1", from: "push", to: "mem", label: "no" },
  { id: "l2", from: "push", to: "inc", label: "yes" },
  { id: "l3", from: "inc", to: "end" },
];

export const stackOrganizationStepSchematics = flow(nodes, links, [
  {
    title: "A 64-word register stack",
    show: ["start"],
    highlight: "start",
    notes: [
      "SP is 6 bits, so it addresses 0 to 63. FULL and EMTY are one-bit flags. DR holds the word.",
    ],
  },
  {
    title: "Register PUSH increments SP",
    show: ["start", "push", "inc"],
    highlight: "inc",
    notes: [
      "SP ← SP + 1, then M[SP] ← DR, then EMTY ← 0. If SP becomes 0, FULL ← 1.",
    ],
  },
  {
    title: "Memory PUSH decrements SP",
    show: ["start", "push", "mem", "inc"],
    highlight: "mem",
    notes: [
      "A memory stack does the opposite: SP ← SP − 1, then M[SP] ← DR. The figure places the stack under address 4000.",
    ],
  },
  {
    title: "Register POP",
    show: ["start", "push", "mem", "inc", "end"],
    highlight: "end",
    notes: [
      "POP reads first: DR ← M[SP], then SP ← SP − 1. If SP becomes 0, EMTY ← 1 and FULL ← 0.",
    ],
  },
]);

export const stackOrganizationTheoryDiagram =
  stackOrganizationStepSchematics[3];
