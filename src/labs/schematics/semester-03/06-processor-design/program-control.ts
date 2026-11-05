import { flow, type FlowLink, type FlowNode } from "../diagram";

const nodes: FlowNode[] = [
  {
    id: "start",
    kind: "terminal",
    x: 210,
    y: 78,
    w: 188,
    label: "START  PC = 101",
  },
  {
    id: "z",
    kind: "decision",
    x: 210,
    y: 186,
    w: 150,
    label: "Z = 1?",
  },
  {
    id: "fall",
    kind: "block",
    x: 500,
    y: 186,
    w: 188,
    label: "PC ← 102",
  },
  {
    id: "take",
    kind: "block",
    x: 210,
    y: 316,
    w: 220,
    label: "PC ← 200",
  },
  {
    id: "end",
    kind: "terminal",
    x: 210,
    y: 424,
    w: 188,
    label: "END",
  },
];

const links: FlowLink[] = [
  {
    id: "l0",
    from: "start",
    to: "z",
  },
  {
    id: "l1",
    from: "z",
    to: "fall",
    label: "no",
  },
  {
    id: "l2",
    from: "z",
    to: "take",
    label: "yes",
  },
  {
    id: "l3",
    from: "take",
    to: "end",
  },
];

export const programControlStepSchematics = flow(nodes, links, [
  {
    title: "The test",
    notes: [
      "The branch instruction is at 101 and Z is 1. The target in the instruction is 200.",
    ],
    show: ["start", "z"],
    highlight: "z",
  },
  {
    title: "Not taken",
    notes: [
      "If Z were 0 the next instruction would be at 102. That arm is not used.",
    ],
    show: ["start", "z", "fall"],
    highlight: "fall",
  },
  {
    title: "Taken",
    notes: [
      "Z is 1, so PC is replaced by 200. The word at 102 is not fetched.",
    ],
    show: ["start", "z", "fall", "take", "end"],
    highlight: "end",
  },
]);

export const programControlTheoryDiagram = programControlStepSchematics[2];
