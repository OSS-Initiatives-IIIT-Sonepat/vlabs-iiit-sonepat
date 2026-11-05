import { frames, hop, icBox, ledChain, stub } from "../diagram";

const pair = (hl = false) => [
  ...icBox("xor", 60, 80, 110, 100, "XOR", hl),
  ...icBox("add", 230, 70, 150, 120, "74HC283", hl),
  hop("h", 170, 230, 130),
];

export const boothMultiplierStepSchematics = frames([
  {
    title: "Booth digit −1 means subtract",
    elements: [
      ...icBox("b", 140, 70, 200, 120, "one Booth bit"),
      ...stub("m", "M", 110, 140),
      ...stub("sub", "SUB", 150, 140),
    ],
    notes: [
      "SUB = 0 adds the multiplicand bit",
      "SUB = 1 inverts it and adds 1",
    ],
  },
  {
    title: "XOR inverts M when SUB is 1",
    elements: [
      ...pair(true),
      ...stub("m", "M", 115, 60, true),
      ...stub("s", "SUB", 155, 60, true),
    ],
    notes: ["XOR output is the adder's A1", "Cin is SUB, which is the +1"],
  },
  {
    title: "Accumulator bit is B1",
    elements: [...pair(), ...stub("acc", "ACC", 120, 230, true)],
    notes: [
      "Higher adder inputs stay 0",
      "S2 is the carry out of this one bit",
    ],
  },
  {
    title: "LEDs: result bit and its carry",
    elements: [
      ...icBox("add", 80, 70, 160, 120, "74HC283"),
      ...ledChain("s1", 240, 110, "S1", true),
      ...ledChain("s2", 240, 165, "S2", true),
    ],
    notes: [
      "Green S1 is the new accumulator bit",
      "Yellow S2 is the carry into the next bit",
    ],
  },
  {
    title: "Add: M=1, ACC=1, SUB=0",
    elements: [
      ...pair(true),
      ...stub("m", "M=1", 110, 60),
      ...stub("s", "SUB=0", 150, 60),
      ...ledChain("s2", 380, 120, "S2", true),
    ],
    notes: ["1 + 1 = 0, carry 1", "S1 is off and S2 is on"],
  },
  {
    title: "Subtract: M=1, ACC=0, SUB=1",
    elements: [
      ...pair(true),
      ...stub("m", "M=1", 110, 60),
      ...stub("s", "SUB=1", 150, 60, true),
      ...ledChain("s1", 380, 120, "S1", true),
    ],
    notes: ["Invert M to 0, then add Cin 1", "S1 is on and S2 is off"],
  },
]);

export const boothMultiplierTheoryDiagram = boothMultiplierStepSchematics[1];
