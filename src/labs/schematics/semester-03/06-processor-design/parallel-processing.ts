import { flow, type FlowLink, type FlowNode } from "../diagram";

const nodes: FlowNode[] = [
  {
    id: "start",
    kind: "terminal",
    x: 210,
    y: 78,
    w: 188,
    label: "START  4 adds",
  },
  {
    id: "free",
    kind: "decision",
    x: 210,
    y: 186,
    w: 150,
    label: "Two processors?",
  },
  {
    id: "serial",
    kind: "block",
    x: 500,
    y: 186,
    w: 188,
    label: "Four steps in series",
  },
  {
    id: "split",
    kind: "block",
    x: 210,
    y: 316,
    w: 220,
    label: "P1 two, P2 two",
  },
  {
    id: "end",
    kind: "terminal",
    x: 210,
    y: 424,
    w: 188,
    label: "END  join",
  },
];

const links: FlowLink[] = [
  {
    id: "l0",
    from: "start",
    to: "free",
  },
  {
    id: "l1",
    from: "free",
    to: "serial",
    label: "no",
  },
  {
    id: "l2",
    from: "free",
    to: "split",
    label: "yes",
  },
  {
    id: "l3",
    from: "split",
    to: "end",
  },
];

export const parallelProcessingStepSchematics = flow(nodes, links, [
  {
    title: "The work",
    notes: [
      "The adds are 1+4, 2+5, 3+6, and 4+7. None of them reads another's result.",
    ],
    show: ["start"],
    highlight: "start",
  },
  {
    title: "Only one processor",
    notes: ["The four adds would take four steps, one after another."],
    show: ["start", "free", "serial"],
    highlight: "serial",
  },
  {
    title: "Split",
    notes: ["P1 takes 1+4 and 4+7. P2 takes 2+5 and 3+6."],
    show: ["start", "free", "serial", "split"],
    highlight: "split",
  },
  {
    title: "Join",
    notes: ["The sums are 5, 7, 9, and 11. Two steps were enough."],
    show: ["start", "free", "serial", "split", "end"],
    highlight: "end",
  },
]);

export const parallelProcessingTheoryDiagram =
  parallelProcessingStepSchematics[3];
