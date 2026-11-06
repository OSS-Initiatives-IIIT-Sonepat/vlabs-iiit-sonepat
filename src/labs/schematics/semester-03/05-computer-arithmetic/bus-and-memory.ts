import { flow } from "../diagram";

/** Three-state bus plus a memory read and a memory write. */
const nodes = [
  {
    id: "ar",
    kind: "block" as const,
    x: 220,
    y: 78,
    w: 200,
    h: 40,
    label: "AR holds 5",
  },
  {
    id: "buf",
    kind: "block" as const,
    x: 220,
    y: 178,
    w: 220,
    h: 40,
    label: "Three-state buffer",
  },
  {
    id: "bus",
    kind: "block" as const,
    x: 220,
    y: 278,
    w: 200,
    h: 40,
    label: "Common bus",
  },
  {
    id: "mem",
    kind: "block" as const,
    x: 500,
    y: 278,
    w: 160,
    h: 40,
    label: "M[5]",
  },
  {
    id: "dr",
    kind: "block" as const,
    x: 220,
    y: 388,
    w: 200,
    h: 40,
    label: "DR",
  },
];

const links = [
  { id: "a1", from: "ar", to: "buf" },
  { id: "a2", from: "buf", to: "bus" },
  { id: "a3", from: "bus", to: "mem" },
  { id: "a4", from: "bus", to: "dr" },
];

const all = ["ar", "buf", "bus", "mem", "dr"];

export const busAndMemoryStepSchematics = flow(nodes, links, [
  {
    title: "The address register",
    show: ["ar"],
    highlight: "ar",
    notes: ["Memory is selected by the address in AR. Here that address is 5."],
  },
  {
    title: "One register drives the bus",
    show: ["ar", "buf", "bus"],
    highlight: "buf",
    labels: { buf: "E = 1, R1 drives" },
    notes: [
      "R1 holds 1010. Its three-state buffer is the only driver enabled.",
    ],
  },
  {
    title: "Memory read",
    show: all,
    highlight: "mem",
    labels: { mem: "Read M[5]", buf: "R1 buffer off" },
    notes: ["The memory buffer drives the bus. DR receives 1100."],
  },
  {
    title: "Memory write",
    show: all,
    highlight: "dr",
    labels: { dr: "DR = 0011", mem: "Write M[5]" },
    notes: ["DR now drives the bus. The write stores 0011 at address 5."],
  },
  {
    title: "The bus is released",
    show: all,
    highlight: "bus",
    labels: { bus: "Bus free", buf: "E = 0" },
    notes: ["No buffer is enabled. M[5] keeps 0011."],
  },
]);

export const busAndMemoryTheoryDiagram = busAndMemoryStepSchematics[4];
