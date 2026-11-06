import { flow, type FlowLink, type FlowNode } from "../diagram";

const nodes: FlowNode[] = [
  {
    id: "start",
    kind: "terminal",
    x: 210,
    y: 78,
    w: 188,
    label: "START  4 segments",
  },
  {
    id: "c1",
    kind: "block",
    x: 210,
    y: 186,
    w: 220,
    label: "Clock 1:  I1 in S1",
  },
  {
    id: "c2",
    kind: "block",
    x: 210,
    y: 294,
    w: 220,
    label: "Clock 2:  I1 in S2",
  },
  {
    id: "c3",
    kind: "block",
    x: 210,
    y: 402,
    w: 220,
    label: "Clock 3:  I1 in S3",
  },
  {
    id: "end",
    kind: "terminal",
    x: 210,
    y: 510,
    w: 188,
    label: "END  speedup → 4",
  },
];

const links: FlowLink[] = [
  {
    id: "l0",
    from: "start",
    to: "c1",
  },
  {
    id: "l1",
    from: "c1",
    to: "c2",
  },
  {
    id: "l2",
    from: "c2",
    to: "c3",
  },
  {
    id: "l3",
    from: "c3",
    to: "end",
  },
];

export const pipelineOverlapStepSchematics = flow(nodes, links, [
  {
    title: "First clock",
    notes: [
      "Four segments, each a circuit plus a register: S1 R1, S2 R2, S3 R3, S4 R4. I1 enters S1.",
    ],
    show: ["start", "c1"],
    highlight: "c1",
  },
  {
    title: "Second clock",
    notes: [
      "I1 moves into S2 and I2 enters S1. The register after each segment holds that segment's output.",
    ],
    show: ["start", "c1", "c2"],
    highlight: "c2",
  },
  {
    title: "Full",
    notes: ["I1 is in S3, I2 is in S2, and I3 is in S1. S4 is still empty."],
    show: ["start", "c1", "c2", "c3"],
    highlight: "c3",
  },
  {
    title: "Steady",
    notes: [
      "I1 reaches S4. Once the pipe is full, one result leaves each clock, so the speedup approaches 4.",
    ],
    show: ["start", "c1", "c2", "c3", "end"],
    highlight: "end",
  },
]);

export const pipelineOverlapTheoryDiagram = pipelineOverlapStepSchematics[3];
