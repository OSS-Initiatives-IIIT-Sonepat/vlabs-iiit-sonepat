import { frames, hop, icBox, ledChain, stub } from "../diagram";

const ands = (hl = false) => [
  ...icBox("a", 80, 80, 100, 90, "AND", hl),
  ...icBox("b", 280, 80, 100, 90, "AND", hl),
];
const reduce = (hl = false) => [
  ...icBox("x", 70, 80, 100, 80, "XOR", hl),
  ...icBox("c", 230, 80, 100, 80, "AND", hl),
];

export const wallaceTreeStepSchematics = frames([
  {
    title: "One Wallace stage is a half adder",
    elements: [
      ...icBox("ha", 160, 70, 160, 110, "half adder"),
      ...stub("p", "A1·B0", 110, 160),
      ...stub("q", "A0·B1", 150, 160),
    ],
    notes: [
      "Two partial-product bits in one column",
      "Sum stays, carry moves to the next column",
    ],
  },
  {
    title: "AND gates build the two partial products",
    elements: [
      ...ands(true),
      ...stub("a1", "A1", 110, 80, true),
      ...stub("b0", "B0", 145, 80, true),
      ...stub("a0", "A0", 110, 280, true),
      ...stub("b1", "B1", 145, 280, true),
    ],
    notes: ["Left: A1 AND B0", "Right: A0 AND B1"],
  },
  {
    title: "XOR is the sum, AND is the carry",
    elements: [...reduce(true), hop("h1", 170, 230, 120, true)],
    notes: ["Sum = (A1·B0) ⊕ (A0·B1)", "Carry = (A1·B0) · (A0·B1)"],
  },
  {
    title: "LEDs on the compressed column",
    elements: [
      ...icBox("x", 40, 50, 90, 60, "XOR"),
      ...icBox("c", 40, 150, 90, 60, "AND"),
      ...ledChain("sum", 130, 80, "Sum", true),
      ...ledChain("cy", 130, 180, "Carry", true),
    ],
    notes: ["Green sum, yellow carry"],
  },
  {
    title: "Both bits 1: sum 0, carry 1",
    elements: [
      ...icBox("col", 70, 70, 160, 110, "column", true),
      ...stub("bits", "all 1s", 120, 70, true),
      ...ledChain("sum", 230, 100, "Sum 0"),
      ...ledChain("cy", 230, 155, "Carry 1", true),
    ],
    notes: [
      "Two 1s compress to a carry",
      "A Wallace tree repeats this for every column",
    ],
  },
]);

export const wallaceTreeTheoryDiagram = wallaceTreeStepSchematics[2];
