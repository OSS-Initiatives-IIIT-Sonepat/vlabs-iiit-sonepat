import { frames, hop, icBox, ledChain, stub } from "../diagram";

export const quineMccluskeyStepSchematics = frames([
  {
    title: "Same cover, found from the chart",
    elements: [
      ...icBox("e1", 30, 90, 140, 70, "B'C'"),
      ...icBox("e2", 190, 90, 140, 70, "CD'"),
      ...icBox("e3", 350, 90, 150, 70, "A'BD"),
    ],
    notes: [
      "Essentials: -00- and --10",
      "01-1 covers the two cells left over",
      "0-01, 011-, and -0-0 are redundant",
    ],
  },
  {
    title: "Literals from the 74HC04",
    elements: [
      ...icBox("not", 140, 60, 190, 140, "74HC04", true),
      ...stub("a", "A B C D", 130, 140, true),
    ],
    notes: ["Same four complements as the K-map lab"],
  },
  {
    title: "Each prime leaves as its NAND",
    elements: [
      ...icBox("n", 100, 55, 250, 160, "74HC00", true),
      ...stub("t1", "T1' = (B'C')'", 95, 100, true),
      ...stub("t2", "T2' = (CD')'", 135, 100, true),
      ...stub("t3", "(A'B)'", 175, 100, true),
    ],
    notes: ["A NAND of the literals is the complement of the product"],
  },
  {
    title: "A final NAND is the OR",
    elements: [
      ...icBox("n1", 40, 80, 120, 90, "primes"),
      ...icBox("n2", 220, 70, 150, 110, "74HC00", true),
      hop("h", 160, 220, 125, true),
      ...ledChain("f", 370, 125, "F", true),
    ],
    notes: ["F = (T1' · T2' · T3')'", "Two-input NANDs build that 3-input NAND"],
  },
  {
    title: "m0 lights, same as the map",
    elements: [
      ...icBox("f", 80, 70, 180, 110, "F", true),
      ...stub("m", "0000", 125, 80, true),
      ...ledChain("f", 260, 125, "F=1", true),
    ],
    notes: ["B'C' covers cell 0"],
  },
  {
    title: "m12 is still a 0",
    elements: [
      ...icBox("f", 80, 70, 180, 110, "F", true),
      ...stub("m", "1100", 125, 80, true),
      ...ledChain("f", 260, 125, "F=0"),
    ],
    notes: ["No prime covers 1100", "The LED matches the K-map board"],
  },
  {
    title: "m5 is covered by 01-1",
    elements: [
      ...icBox("f", 80, 70, 180, 110, "A'BD", true),
      ...stub("m", "0101", 125, 80, true),
      ...ledChain("f", 260, 125, "F=1", true),
    ],
    notes: ["Chart and map agree", "This board is NAND-NAND, the map board is AND-OR"],
  },
]);

export const quineMccluskeyTheoryDiagram = quineMccluskeyStepSchematics[3];
