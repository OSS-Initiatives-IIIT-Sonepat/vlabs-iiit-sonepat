import { flow } from "../diagram";

/** The basic computer as boxes. Each step reveals the next register transfer. */
const nodes = [
  {
    id: "word",
    kind: "block" as const,
    x: 280,
    y: 78,
    w: 240,
    h: 40,
    label: "I  |  opcode  |  address",
  },
  {
    id: "regs",
    kind: "block" as const,
    x: 280,
    y: 168,
    w: 240,
    h: 40,
    label: "PC   AR   IR   AC   DR",
  },
  {
    id: "t0",
    kind: "block" as const,
    x: 280,
    y: 258,
    w: 240,
    h: 40,
    label: "T0:  AR ← PC",
  },
  {
    id: "t1",
    kind: "block" as const,
    x: 280,
    y: 348,
    w: 240,
    h: 40,
    label: "T1:  IR ← M[AR],  PC+1",
  },
  {
    id: "t2",
    kind: "block" as const,
    x: 280,
    y: 438,
    w: 240,
    h: 40,
    label: "T2:  AR ← address",
  },
  {
    id: "t3",
    kind: "block" as const,
    x: 280,
    y: 528,
    w: 240,
    h: 40,
    label: "T3:  AC ← AC + DR",
  },
  {
    id: "io",
    kind: "block" as const,
    x: 530,
    y: 528,
    w: 140,
    h: 40,
    label: "Interrupt",
  },
];

const links = [
  { id: "a1", from: "word", to: "regs" },
  { id: "a2", from: "regs", to: "t0" },
  { id: "a3", from: "t0", to: "t1" },
  { id: "a4", from: "t1", to: "t2" },
  { id: "a5", from: "t2", to: "t3" },
  { id: "a6", from: "t3", to: "io" },
];

const cycle = ["word", "regs", "t0", "t1", "t2", "t3"];

export const computerDescriptionStepSchematics = flow(nodes, links, [
  {
    title: "An instruction word",
    show: ["word"],
    highlight: "word",
    notes: ["ADD is opcode 001. The address names the operand."],
  },
  {
    title: "The computer registers",
    show: ["word", "regs"],
    highlight: "regs",
    notes: ["PC holds 100. AC starts at 0. Memory 108 holds 5."],
  },
  {
    title: "T0 fetches the address",
    show: ["word", "regs", "t0"],
    highlight: "t0",
    notes: ["AR receives 100, the address of the instruction."],
  },
  {
    title: "T1 reads the instruction",
    show: ["word", "regs", "t0", "t1"],
    highlight: "t1",
    notes: ["IR receives ADD 108. PC becomes 101."],
  },
  {
    title: "T2 takes the operand address",
    show: [...cycle.slice(0, 5)],
    highlight: "t2",
    notes: ["A memory-reference instruction copies its address field into AR."],
  },
  {
    title: "The accumulator adds",
    show: cycle,
    highlight: "t3",
    notes: ["DR reads M[108] = 5. AC was 0, so AC becomes 5."],
  },
  {
    title: "The same computer, with interrupt",
    show: [...cycle, "io"],
    highlight: "io",
    notes: [
      "I/O joins this computer as one more box. It does not need another board.",
    ],
  },
]);

export const computerDescriptionTheoryDiagram =
  computerDescriptionStepSchematics[6];
