import { frames, hop, icBox, ledChain, stub } from "../diagram";

const chips = (hl = false) => [
  ...icBox("not", 30, 80, 100, 90, "74HC04", hl),
  ...icBox("and", 170, 75, 110, 100, "74HC08", hl),
  ...icBox("or", 330, 80, 100, 90, "74HC32", hl),
  hop("a", 130, 170, 120),
  hop("b", 280, 330, 125),
];

export const karnaughMapStepSchematics = frames([
  {
    title: "F = B'C' + CD' + A'BD",
    elements: [
      ...icBox("g1", 30, 90, 140, 70, "B'C'"),
      ...icBox("g2", 190, 90, 140, 70, "CD'"),
      ...icBox("g3", 350, 90, 140, 70, "A'BD"),
    ],
    notes: [
      "Quad 0,1,8,9 is B'C'",
      "Quad 2,6,10,14 is CD'",
      "Pair 5,7 is A'BD",
    ],
  },
  {
    title: "Invert A, B, C, and D",
    elements: [
      ...icBox("not", 150, 60, 180, 140, "74HC04", true),
      ...stub("b", "B", 95, 150, true),
      ...stub("c", "C", 125, 150, true),
      ...stub("d", "D", 155, 150, true),
      ...stub("a", "A", 185, 150, true),
    ],
    notes: ["One hex inverter, four gates used"],
  },
  {
    title: "Three product terms on the 74HC08",
    elements: [
      ...icBox("and", 120, 55, 220, 160, "74HC08", true),
      ...stub("t1", "B'·C'", 95, 120, true),
      ...stub("t2", "C·D'", 130, 120, true),
      ...stub("t3", "A'·B·D", 165, 120, true),
    ],
    notes: ["A'BD uses two AND gates", "Gate 3 makes A'B, gate 4 AND that with D"],
  },
  {
    title: "OR the three products",
    elements: [...chips(true), ...ledChain("f", 430, 125, "F", true)],
    notes: ["Gate 1 ORs the two quads", "Gate 2 ORs in the pair"],
  },
  {
    title: "m0 = 0000 is inside B'C'",
    elements: [
      ...icBox("g", 80, 70, 180, 110, "B'C'", true),
      ...stub("m", "ABCD=0000", 125, 80, true),
      ...ledChain("f", 260, 125, "F=1", true),
    ],
    notes: ["The LED is on"],
  },
  {
    title: "m12 = 1100 is not in any group",
    elements: [
      ...icBox("g", 80, 70, 180, 110, "no group", true),
      ...stub("m", "ABCD=1100", 125, 80, true),
      ...ledChain("f", 260, 125, "F=0"),
    ],
    notes: ["Cell 12 is a 0 on the map", "The LED is off"],
  },
  {
    title: "m5 = 0101 is the pair A'BD",
    elements: [
      ...icBox("g", 80, 70, 180, 110, "A'BD", true),
      ...stub("m", "ABCD=0101", 125, 80, true),
      ...ledChain("f", 260, 125, "F=1", true),
    ],
    notes: ["The pair covers cell 5 and cell 7", "The LED is on again"],
  },
]);

export const karnaughMapTheoryDiagram = karnaughMapStepSchematics[0];
