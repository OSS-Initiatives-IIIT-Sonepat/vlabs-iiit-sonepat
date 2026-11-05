import { flow } from "../diagram";

/** The three classes of basic-computer instruction. */
const nodes = [
  { id: "word", kind: "block" as const, x: 220, y: 78, w: 230, h: 40, label: "I  |  opcode  |  address" },
  { id: "mri", kind: "decision" as const, x: 220, y: 198, label: "MRI?" },
  { id: "ops", kind: "block" as const, x: 500, y: 198, w: 240, h: 40, label: "Memory reference" },
  { id: "ibit", kind: "decision" as const, x: 220, y: 330, label: "I = 1?" },
  { id: "reg", kind: "block" as const, x: 220, y: 450, w: 220, h: 40, label: "Register reference" },
  { id: "io", kind: "block" as const, x: 490, y: 330, w: 250, h: 40, label: "I/O instruction" },
];

const links = [
  { id: "a1", from: "word", to: "mri" },
  { id: "a2", from: "mri", to: "ops" },
  { id: "a3", from: "mri", to: "ibit" },
  { id: "a4", from: "ibit", to: "io" },
  { id: "a5", from: "ibit", to: "reg" },
];

const head = ["word", "mri", "ops"];

export const instructionSetStepSchematics = flow(nodes, links, [
  {
    title: "The instruction word",
    show: ["word"],
    highlight: "word",
    notes: ["Bit I, a 3-bit opcode, and a 12-bit address."],
  },
  {
    title: "Memory-reference opcodes",
    show: head,
    highlight: "ops",
    labels: { ops: "ADD 001  LDA 010  STA 011" },
    notes: ["Opcodes 000 to 110 name a memory address."],
  },
  {
    title: "Branch and skip",
    show: head,
    highlight: "ops",
    labels: { ops: "BUN 100  BSA 101  ISZ 110" },
    notes: ["These are still memory-reference instructions."],
  },
  {
    title: "Register reference, I = 0",
    show: [...head, "ibit", "reg"],
    highlight: "reg",
    labels: { reg: "CLA 7800   CMA 7200" },
    notes: ["Opcode 111 and I = 0. The address field is a set of flags, not a memory address."],
  },
  {
    title: "Input and output, I = 1",
    show: ["word", "mri", "ops", "ibit", "reg", "io"],
    highlight: "io",
    labels: { io: "INP F800  OUT F400  SKI F200" },
    notes: ["Opcode 111 and I = 1. These talk to the I/O registers."],
  },
]);

export const instructionSetTheoryDiagram = instructionSetStepSchematics[4];
