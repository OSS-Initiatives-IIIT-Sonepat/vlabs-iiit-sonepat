import { frames, hop, icBox, ledChain, stub } from "../diagram";

const ops = (hl = false) => [
  ...icBox("and", 40, 70, 80, 70, "AND", hl),
  ...icBox("or", 140, 70, 80, 70, "OR", hl),
  ...icBox("xor", 240, 70, 80, 70, "XOR", hl),
  ...icBox("mux", 360, 60, 110, 100, "74HC153", hl),
];

export const aluSliceStepSchematics = frames([
  {
    title: "A 1-bit ALU is three ops and a mux",
    elements: [...ops()],
    notes: ["I0 = A AND B", "I1 = A OR B", "I2 = A XOR B"],
  },
  {
    title: "Select is the opcode",
    elements: [
      ...icBox("mux", 160, 60, 160, 130, "74HC153", true),
      ...stub("s", "S1 S0", 110, 160, true),
      ...stub("i", "I0 I1 I2", 160, 160),
    ],
    notes: ["00 AND, 01 OR, 10 XOR", "I3 and the enable are tied low"],
  },
  {
    title: "A and B feed every gate",
    elements: [
      ...ops(true),
      hop("a", 120, 140, 100, true),
      hop("b", 220, 240, 120, true),
      hop("c", 320, 360, 110, true),
    ],
    notes: ["Same A and B, three results, one leaves Y"],
  },
  {
    title: "LED on Y",
    elements: [
      ...icBox("mux", 80, 70, 150, 110, "74HC153"),
      ...ledChain("y", 230, 125, "Y", true),
    ],
    notes: ["330 ohm, then the LED to ground"],
  },
  {
    title: "A=1, B=1, select 00: AND",
    elements: [
      ...icBox("and", 70, 80, 120, 90, "AND", true),
      ...icBox("mux", 250, 70, 120, 110, "S=00", true),
      hop("h", 190, 250, 125),
      ...ledChain("y", 370, 120, "1", true),
    ],
    notes: ["1 AND 1 = 1", "The LED is on"],
  },
  {
    title: "Select 10: XOR of 1 and 1 is 0",
    elements: [
      ...icBox("xor", 70, 80, 120, 90, "XOR", true),
      ...icBox("mux", 250, 70, 120, 110, "S=10", true),
      hop("h", 190, 250, 125, true),
      ...ledChain("y", 370, 120, "0"),
    ],
    notes: ["S1=1 and S0=0 picks I2", "The LED goes out"],
  },
]);

export const aluSliceTheoryDiagram = aluSliceStepSchematics[0];
