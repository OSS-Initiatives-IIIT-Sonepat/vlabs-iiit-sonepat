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
    id: "regs",
    kind: "block",
    x: 210,
    y: 186,
    w: 260,
    label: "M=10111  Q=10011  count=5",
  },
  {
    id: "bits",
    kind: "decision",
    x: 210,
    y: 294,
    w: 150,
    label: "Q0 Q−1",
  },
  {
    id: "add",
    kind: "block",
    x: 500,
    y: 294,
    w: 188,
    label: "01:  AC ← AC + BR",
  },
  {
    id: "sub",
    kind: "block",
    x: 210,
    y: 424,
    w: 220,
    label: "10:  AC ← AC − BR",
  },
  {
    id: "shift",
    kind: "block",
    x: 210,
    y: 532,
    w: 220,
    label: "ASR,  count ← count − 1",
  },
  {
    id: "done",
    kind: "decision",
    x: 210,
    y: 640,
    w: 150,
    label: "count = 0?",
  },
  {
    id: "loop",
    kind: "block",
    x: 500,
    y: 640,
    w: 188,
    label: "Repeat the test",
  },
  {
    id: "end",
    kind: "terminal",
    x: 210,
    y: 770,
    w: 188,
    label: "END  117",
  },
];

const links: FlowLink[] = [
  {
    id: "l0",
    from: "start",
    to: "regs",
  },
  {
    id: "l1",
    from: "regs",
    to: "bits",
  },
  {
    id: "l2",
    from: "bits",
    to: "add",
    label: "01",
  },
  {
    id: "l3",
    from: "bits",
    to: "sub",
    label: "10",
  },
  {
    id: "l4",
    from: "sub",
    to: "shift",
  },
  {
    id: "l5",
    from: "shift",
    to: "done",
  },
  {
    id: "l6",
    from: "done",
    to: "loop",
    label: "no",
  },
  {
    id: "l7",
    from: "done",
    to: "end",
    label: "yes",
  },
];

export const boothAlgorithmStepSchematics = flow(nodes, links, [
  {
    title: "Initial registers",
    notes: [
      "AC is 00000, Q is 10011, Q−1 is 0, the multiplicand BR is 10111 (−9), and the count is 5. The multiplier is −13.",
    ],
    show: ["start", "regs"],
    highlight: "regs",
  },
  {
    title: "Inspect the pair",
    notes: [
      "Q0 is 1 and Q−1 is 0, so the pair is 10. The 01 arm would add BR. 00 and 11 would change nothing.",
    ],
    show: ["start", "regs", "bits", "add"],
    highlight: "bits",
  },
  {
    title: "Subtract M",
    notes: [
      "The two's complement of 10111 is 01001. AC becomes 00000 + 01001 = 01001.",
    ],
    show: ["start", "regs", "bits", "add", "sub"],
    highlight: "sub",
  },
  {
    title: "Shift",
    notes: [
      "An arithmetic right shift gives AC = 00100, Q = 11001, Q−1 = 1, count = 4.",
    ],
    show: ["start", "regs", "bits", "add", "sub", "shift"],
    highlight: "shift",
  },
  {
    title: "The middle cycles",
    notes: [
      "Cycle 2 sees 11 and only shifts. Cycle 3 sees 01, adds BR, and shifts. Cycle 4 sees 00 and only shifts.",
    ],
    show: ["start", "regs", "bits", "add", "sub", "shift", "done", "loop"],
    highlight: "loop",
  },
  {
    title: "The product",
    notes: [
      "Cycle 5 sees 10, subtracts BR, and shifts. Count is 0. AC and Q are 00011 10101, which is 117. (−9) × (−13) = 117.",
    ],
    show: [
      "start",
      "regs",
      "bits",
      "add",
      "sub",
      "shift",
      "done",
      "loop",
      "end",
    ],
    highlight: "end",
  },
]);

export const boothAlgorithmTheoryDiagram = boothAlgorithmStepSchematics[5];
