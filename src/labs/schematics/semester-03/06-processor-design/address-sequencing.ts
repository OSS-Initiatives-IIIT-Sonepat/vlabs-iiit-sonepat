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
    id: "map",
    kind: "decision",
    x: 210,
    y: 186,
    w: 150,
    label: "Mapping?",
  },
  {
    id: "mapv",
    kind: "block",
    x: 500,
    y: 186,
    w: 188,
    label: "CAR ← 40",
  },
  {
    id: "inc",
    kind: "decision",
    x: 210,
    y: 316,
    w: 150,
    label: "Increment?",
  },
  {
    id: "incv",
    kind: "block",
    x: 500,
    y: 316,
    w: 188,
    label: "CAR ← 41",
  },
  {
    id: "br",
    kind: "decision",
    x: 210,
    y: 446,
    w: 150,
    label: "Branch?",
  },
  {
    id: "brv",
    kind: "block",
    x: 500,
    y: 446,
    w: 188,
    label: "CAR ← 60",
  },
  {
    id: "end",
    kind: "terminal",
    x: 210,
    y: 576,
    w: 188,
    label: "END  CAR ← 16",
  },
];

const links: FlowLink[] = [
  {
    id: "l0",
    from: "start",
    to: "map",
  },
  {
    id: "l1",
    from: "map",
    to: "mapv",
    label: "yes",
  },
  {
    id: "l2",
    from: "map",
    to: "inc",
    label: "no",
  },
  {
    id: "l3",
    from: "inc",
    to: "incv",
    label: "yes",
  },
  {
    id: "l4",
    from: "inc",
    to: "br",
    label: "no",
  },
  {
    id: "l5",
    from: "br",
    to: "brv",
    label: "yes",
  },
  {
    id: "l6",
    from: "br",
    to: "end",
    label: "no",
  },
];

export const addressSequencingStepSchematics = flow(nodes, links, [
  {
    title: "Mapping",
    notes: [
      "The machine opcode is mapped to control address 40. The microprogram for that opcode begins there.",
    ],
    show: ["start", "map", "mapv"],
    highlight: "mapv",
  },
  {
    title: "Increment",
    notes: ["The next microinstruction is in sequence, so CAR becomes 41."],
    show: ["start", "map", "mapv", "inc", "incv"],
    highlight: "incv",
  },
  {
    title: "Branch",
    notes: ["The address field says 60. CAR is loaded with 60 instead of 42."],
    show: ["start", "map", "mapv", "inc", "incv", "br", "brv"],
    highlight: "brv",
  },
  {
    title: "Return",
    notes: [
      "A micro-subroutine saved 16. The return loads CAR from that saved address.",
    ],
    show: ["start", "map", "mapv", "inc", "incv", "br", "brv", "end"],
    highlight: "end",
  },
]);

export const addressSequencingTheoryDiagram =
  addressSequencingStepSchematics[3];
