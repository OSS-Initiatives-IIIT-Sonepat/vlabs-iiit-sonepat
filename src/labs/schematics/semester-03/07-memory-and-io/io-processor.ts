import { flow, type FlowLink, type FlowNode } from "../diagram";

const nodes: FlowNode[] = [
  {
    id: "start",
    kind: "terminal",
    x: 210,
    y: 78,
    w: 188,
    label: "START  command",
  },
  {
    id: "prog",
    kind: "block",
    x: 210,
    y: 186,
    w: 220,
    label: "IOP fetches the program",
  },
  {
    id: "move",
    kind: "block",
    x: 210,
    y: 294,
    w: 220,
    label: "IOP moves the block",
  },
  {
    id: "done",
    kind: "decision",
    x: 210,
    y: 402,
    w: 150,
    label: "Block done?",
  },
  {
    id: "more",
    kind: "block",
    x: 500,
    y: 402,
    w: 188,
    label: "Keep transferring",
  },
  {
    id: "end",
    kind: "terminal",
    x: 210,
    y: 532,
    w: 188,
    label: "END  interrupt CPU",
  },
];

const links: FlowLink[] = [
  {
    id: "l0",
    from: "start",
    to: "prog",
  },
  {
    id: "l1",
    from: "prog",
    to: "move",
  },
  {
    id: "l2",
    from: "move",
    to: "done",
  },
  {
    id: "l3",
    from: "done",
    to: "more",
    label: "no",
  },
  {
    id: "l4",
    from: "done",
    to: "end",
    label: "yes",
  },
];

export const ioProcessorStepSchematics = flow(nodes, links, [
  {
    title: "The command",
    notes: [
      "The CPU tells the IOP to write a block, then leaves the transfer.",
    ],
    show: ["start"],
    highlight: "start",
  },
  {
    title: "The channel program",
    notes: [
      "The IOP reads its program from memory. That program names the address and the count.",
    ],
    show: ["start", "prog"],
    highlight: "prog",
  },
  {
    title: "The move",
    notes: ["The IOP transfers the block. The CPU is not in this loop."],
    show: ["start", "prog", "move", "done", "more"],
    highlight: "move",
  },
  {
    title: "Completion",
    notes: [
      "The IOP writes the status and interrupts the CPU. The CPU reads the status.",
    ],
    show: ["start", "prog", "move", "done", "more", "end"],
    highlight: "end",
  },
]);

export const ioProcessorTheoryDiagram = ioProcessorStepSchematics[3];
