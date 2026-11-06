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
    id: "cpu",
    kind: "decision",
    x: 210,
    y: 186,
    w: 150,
    label: "CPU copies it?",
  },
  {
    id: "dma",
    kind: "block",
    x: 500,
    y: 186,
    w: 188,
    label: "DMA",
  },
  {
    id: "poll",
    kind: "decision",
    x: 210,
    y: 316,
    w: 150,
    label: "CPU polls?",
  },
  {
    id: "intr",
    kind: "block",
    x: 500,
    y: 316,
    w: 188,
    label: "Interrupt",
  },
  {
    id: "end",
    kind: "terminal",
    x: 210,
    y: 446,
    w: 188,
    label: "END  programmed I/O",
  },
];

const links: FlowLink[] = [
  {
    id: "l0",
    from: "start",
    to: "cpu",
  },
  {
    id: "l1",
    from: "cpu",
    to: "dma",
    label: "no",
  },
  {
    id: "l2",
    from: "cpu",
    to: "poll",
    label: "yes",
  },
  {
    id: "l3",
    from: "poll",
    to: "intr",
    label: "no",
  },
  {
    id: "l4",
    from: "poll",
    to: "end",
    label: "yes",
  },
];

export const transferModesStepSchematics = flow(nodes, links, [
  {
    title: "DMA",
    notes: [
      "The controller copies the byte. The CPU is not the mover, so the mode is DMA.",
    ],
    show: ["start", "cpu", "dma"],
    highlight: "dma",
  },
  {
    title: "Interrupt",
    notes: [
      "The CPU copies the byte, but it does not poll. The device interrupts, and the CPU then copies.",
    ],
    show: ["start", "cpu", "dma", "poll", "intr"],
    highlight: "intr",
  },
  {
    title: "Programmed I/O",
    notes: [
      "The CPU polls the status flag and, when it is set, copies the byte itself.",
    ],
    show: ["start", "cpu", "dma", "poll", "intr", "end"],
    highlight: "end",
  },
]);

export const transferModesTheoryDiagram = transferModesStepSchematics[2];
