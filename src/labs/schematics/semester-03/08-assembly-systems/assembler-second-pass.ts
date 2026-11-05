import { flow } from "../diagram";

/**
 * Second pass of an assembler, in the same box-and-diamond grammar as the
 * other system labs. The pass is declared once. Later steps only move the
 * highlight while the observation table records each assembled line.
 */
const nodes = [
  {
    id: "lc",
    kind: "block" as const,
    x: 230,
    y: 78,
    w: 200,
    h: 40,
    label: "LC ← 0",
  },
  {
    id: "scan",
    kind: "block" as const,
    x: 230,
    y: 168,
    w: 200,
    h: 40,
    label: "Scan next line",
  },
  { id: "pseudo", kind: "decision" as const, x: 230, y: 278, label: "Pseudo?" },
  {
    id: "org",
    kind: "block" as const,
    x: 490,
    y: 278,
    w: 180,
    h: 40,
    label: "ORG sets LC, END stops",
  },
  { id: "mri", kind: "decision" as const, x: 230, y: 398, label: "MRI?" },
  {
    id: "sym",
    kind: "block" as const,
    x: 490,
    y: 398,
    w: 190,
    h: 40,
    label: "Opcode and symbol table",
  },
  { id: "valid", kind: "decision" as const, x: 230, y: 518, label: "Non-MRI?" },
  {
    id: "conv",
    kind: "block" as const,
    x: 490,
    y: 518,
    w: 180,
    h: 40,
    label: "DEC or HEX, or error",
  },
  {
    id: "store",
    kind: "block" as const,
    x: 230,
    y: 628,
    w: 220,
    h: 40,
    label: "Store at LC, then LC+1",
  },
];

const links = [
  { id: "a1", from: "lc", to: "scan" },
  { id: "a2", from: "scan", to: "pseudo" },
  { id: "a3", from: "pseudo", to: "org" },
  { id: "a4", from: "pseudo", to: "mri" },
  { id: "a5", from: "mri", to: "sym" },
  { id: "a6", from: "mri", to: "valid" },
  { id: "a7", from: "valid", to: "conv" },
  { id: "a8", from: "valid", to: "store" },
];

const pass = [
  "lc",
  "scan",
  "pseudo",
  "org",
  "mri",
  "sym",
  "valid",
  "conv",
  "store",
];
const beforeMri = ["lc", "scan", "pseudo", "org", "mri", "sym"];

export const assemblerSecondPassStepSchematics = flow(nodes, links, [
  {
    title: "Location counter",
    show: ["lc"],
    highlight: "lc",
    notes: ["The second pass starts with LC at 0."],
  },
  {
    title: "Read a line",
    show: ["lc", "scan"],
    highlight: "scan",
    notes: ["One source line at a time."],
  },
  {
    title: "ORG sets the location counter",
    show: ["lc", "scan", "pseudo", "org"],
    highlight: "org",
    notes: [
      "ORG changes LC and writes nothing. END will stop the pass the same way.",
    ],
  },
  {
    title: "LDA, a memory read",
    show: beforeMri,
    highlight: "sym",
    labels: { sym: "LDA X → 206A" },
    notes: ["Opcode in bits 2–4. The symbol table supplies address 106."],
  },
  {
    title: "ADD, an arithmetic instruction",
    show: beforeMri,
    highlight: "sym",
    labels: { sym: "ADD Y → 106B" },
    notes: ["Opcode 001. The accumulator will add M[107]."],
  },
  {
    title: "BSA, a subroutine call",
    show: beforeMri,
    highlight: "sym",
    labels: { sym: "BSA SUB → 506C" },
    notes: ["Opcode 101. Control goes to the subroutine at 108."],
  },
  {
    title: "BUN, the loop",
    show: beforeMri,
    highlight: "sym",
    labels: { sym: "BUN 100 → 4064" },
    notes: ["Opcode 100. The branch returns to the instruction at 100."],
  },
  {
    title: "INP, an I/O instruction",
    show: pass,
    highlight: "conv",
    labels: { conv: "INP → F800" },
    notes: ["Not a memory reference. The non-MRI path stores the I/O word."],
  },
  {
    title: "END stores nothing",
    show: pass,
    highlight: "org",
    labels: { org: "END stops" },
    notes: [
      "END is a pseudo-instruction. LC is not incremented and no word is stored.",
    ],
  },
]);

export const assemblerSecondPassTheoryDiagram =
  assemblerSecondPassStepSchematics[8];
