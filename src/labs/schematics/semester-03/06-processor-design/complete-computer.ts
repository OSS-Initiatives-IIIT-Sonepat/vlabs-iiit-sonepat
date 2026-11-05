import { flow } from "../diagram";

/** The basic computer as one block diagram, not a breadboard. */
const nodes = [
  {
    id: "mem",
    kind: "block" as const,
    x: 230,
    y: 78,
    w: 200,
    h: 40,
    label: "Memory 4096 × 16",
  },
  {
    id: "bus",
    kind: "block" as const,
    x: 230,
    y: 178,
    w: 200,
    h: 40,
    label: "Common bus",
  },
  {
    id: "regs",
    kind: "block" as const,
    x: 230,
    y: 278,
    w: 240,
    h: 40,
    label: "AR  PC  DR  AC  IR",
  },
  {
    id: "io",
    kind: "block" as const,
    x: 520,
    y: 278,
    w: 160,
    h: 40,
    label: "INPR  OUTR",
  },
  {
    id: "ctl",
    kind: "block" as const,
    x: 230,
    y: 388,
    w: 220,
    h: 40,
    label: "Control unit",
  },
];

const links = [
  { id: "a1", from: "mem", to: "bus" },
  { id: "a2", from: "bus", to: "regs" },
  { id: "a3", from: "regs", to: "io" },
  { id: "a4", from: "regs", to: "ctl" },
];

export const completeComputerStepSchematics = flow(nodes, links, [
  {
    title: "Memory",
    show: ["mem"],
    highlight: "mem",
    notes: ["4096 words, 16 bits each. The program and the data live here."],
  },
  {
    title: "One common bus",
    show: ["mem", "bus"],
    highlight: "bus",
    notes: ["Registers and memory share this bus. Only one driver is enabled."],
  },
  {
    title: "The processor registers",
    show: ["mem", "bus", "regs"],
    highlight: "regs",
    notes: [
      "AR addresses memory. PC sequences instructions. DR and AC hold data. IR holds the instruction.",
    ],
  },
  {
    title: "Input and output registers",
    show: ["mem", "bus", "regs", "io"],
    highlight: "io",
    notes: [
      "INPR receives a character. OUTR sends one. Both meet the same bus.",
    ],
  },
  {
    title: "Control",
    show: ["mem", "bus", "regs", "io", "ctl"],
    highlight: "ctl",
    notes: [
      "Control turns the enables and the read or write line on for one time T.",
    ],
  },
  {
    title: "A memory read on this computer",
    show: ["mem", "bus", "regs", "io", "ctl"],
    highlight: "mem",
    labels: { mem: "M[AR] drives the bus", ctl: "Read = 1" },
    notes: ["DR takes the word. No second machine is required."],
  },
]);

export const completeComputerTheoryDiagram = completeComputerStepSchematics[5];
