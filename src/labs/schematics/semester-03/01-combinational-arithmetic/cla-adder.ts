import { frames, icBox, ledChain, stub } from "../diagram";

const box = (hl = false) => icBox("cla", 150, 58, 150, 150, "74HC283", hl);
const L = 150;
const R = 300;

export const claAdderStepSchematics = frames([
  {
    title: "Carry-lookahead, not a ripple chain",
    elements: [
      ...box(),
      ...stub("g", "G = A·B", 100, L),
      ...stub("p", "P = A⊕B", 140, L),
      ...stub("c", "Cin = 0", 180, L),
    ],
    notes: [
      "Every carry is a function of G, P, and Cin",
      "No carry waits for the previous sum",
    ],
  },
  {
    title: "One 74HC283 computes all four carries",
    elements: [...box(true)],
    notes: [
      "Generate and propagate are inside the chip",
      "C4 does not walk through four stages",
    ],
  },
  {
    title: "Wire A[4:1], B[4:1], and Cin = 0",
    elements: [
      ...box(),
      ...stub("a", "A = 1010", 90, L, true),
      ...stub("b", "B = 0011", 130, L, true),
      ...stub("cin", "Cin = 0", 170, L, true),
    ],
    notes: ["A1 is the least significant bit"],
  },
  {
    title: "Sum and carry LEDs",
    elements: [
      ...box(),
      ...stub("a", "A", 100, L),
      ...stub("b", "B", 150, L),
      ...ledChain("sum", R, 110, "S", true),
      ...ledChain("c", R, 170, "C4", true),
    ],
    notes: ["S4 S3 S2 S1 and C4 each have a 330 ohm LED"],
  },
  {
    title: "1010 + 0011 = 1101",
    elements: [
      ...box(true),
      ...stub("a", "1010", 90, L, true),
      ...stub("b", "0011", 130, L),
      ...stub("cin", "Cin 0", 170, L),
      ...ledChain("s", R, 120, "1101", true),
    ],
    notes: ["10 + 3 = 13", "S4 and S3 and S1 are on, S2 and C4 are off"],
  },
  {
    title: "1111 + 0001 lights only C4",
    elements: [
      ...box(true),
      ...stub("a", "1111", 90, L, true),
      ...stub("b", "0001", 130, L, true),
      ...ledChain("c", R, 140, "C4", true),
    ],
    notes: ["15 + 1 = 16", "The lookahead carry is 1 and every sum bit is 0"],
  },
]);

export const claAdderTheoryDiagram = claAdderStepSchematics[4];
