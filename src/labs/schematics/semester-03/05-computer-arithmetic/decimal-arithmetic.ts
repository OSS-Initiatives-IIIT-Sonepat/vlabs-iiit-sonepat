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
    id: "add",
    kind: "block",
    x: 210,
    y: 186,
    w: 250,
    label: "1001 + 0111 = 1 0000",
  },
  {
    id: "test",
    kind: "decision",
    x: 210,
    y: 294,
    w: 150,
    label: "> 9 or carry?",
  },
  {
    id: "keep",
    kind: "block",
    x: 500,
    y: 294,
    w: 188,
    label: "Sum is already BCD",
  },
  {
    id: "fix",
    kind: "block",
    x: 210,
    y: 424,
    w: 220,
    label: "Add 0110",
  },
  {
    id: "end",
    kind: "terminal",
    x: 210,
    y: 532,
    w: 188,
    label: "END  BCD 16",
  },
];

const links: FlowLink[] = [
  {
    id: "l0",
    from: "start",
    to: "add",
  },
  {
    id: "l1",
    from: "add",
    to: "test",
  },
  {
    id: "l2",
    from: "test",
    to: "keep",
    label: "no",
  },
  {
    id: "l3",
    from: "test",
    to: "fix",
    label: "yes",
  },
  {
    id: "l4",
    from: "fix",
    to: "end",
  },
];

export const decimalArithmeticStepSchematics = flow(nodes, links, [
  {
    title: "Add the digits",
    notes: [
      "9 and 7 as BCD are 1001 and 0111. The binary sum is 1 0000, so the carry K is 1.",
    ],
    show: ["start", "add"],
    highlight: "add",
  },
  {
    title: "Test the sum",
    notes: [
      "The four-bit sum is 0000, which is a legal digit, but K = 1. Correction is required when K = 1 or when Z8(Z4 + Z2) = 1.",
    ],
    show: ["start", "add", "test", "keep"],
    highlight: "test",
  },
  {
    title: "The legal arm",
    notes: [
      "A sum from 0000 to 1001 with K = 0 would skip the correction. This sum has K = 1.",
    ],
    show: ["start", "add", "test", "keep"],
    highlight: "keep",
  },
  {
    title: "Add six",
    notes: [
      "0000 + 0110 = 0110. The carry K stays 1, so the BCD digits are 1 and 6.",
    ],
    show: ["start", "add", "test", "keep", "fix"],
    highlight: "fix",
  },
  {
    title: "The BCD result",
    notes: ["The digits are 0001 and 0110, which is decimal 16."],
    show: ["start", "add", "test", "keep", "fix", "end"],
    highlight: "end",
  },
]);

export const decimalArithmeticTheoryDiagram =
  decimalArithmeticStepSchematics[4];
