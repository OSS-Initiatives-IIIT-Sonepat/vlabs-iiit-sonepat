import { frames, hop, icBox, ledChain, stub } from "../diagram";

const mem = (hl = false) => [
  ...icBox("dec", 50, 70, 120, 110, "74HC138", hl),
  ...icBox("inv", 210, 85, 80, 70, "NOT", hl),
  ...icBox("ff", 330, 70, 110, 110, "74HC74", hl),
];

export const memoryDesignStepSchematics = frames([
  {
    title: "Address in, one word line out",
    elements: [...mem()],
    notes: ["The decoder picks the row", "The flip-flop is the stored bit"],
  },
  {
    title: "Enables: E1 high, E2 and E3 low",
    elements: [
      ...icBox("dec", 160, 60, 170, 140, "74HC138", true),
      ...stub("e1", "E1 = 1", 100, 160, true),
      ...stub("e2", "E2 = 0", 135, 160, true),
      ...stub("e3", "E3 = 0", 170, 160, true),
    ],
    notes: [
      "All three enables must be active",
      "Y outputs are active-low, so a NOT makes the LED active-high",
    ],
  },
  {
    title: "Address bits and the data bit",
    elements: [
      ...mem(true),
      hop("y", 170, 210, 120, true),
      ...stub("a", "addr", 110, 50),
      ...stub("d", "D", 150, 330),
    ],
    notes: ["Y0 goes through the inverter to the word LED"],
  },
  {
    title: "Address 000 selects word 0",
    elements: [
      ...icBox("dec", 80, 70, 160, 110, "74HC138", true),
      ...stub("a", "000", 120, 80, true),
      ...ledChain("w", 240, 125, "Word 0", true),
    ],
    notes: ["Y0 is low, the inverter is high, the LED is on"],
  },
  {
    title: "Address 001 selects a different row",
    elements: [
      ...icBox("dec", 80, 70, 160, 110, "74HC138", true),
      ...stub("a", "001", 120, 80, true),
      ...ledChain("w", 240, 125, "Word 0"),
    ],
    notes: ["Word 0 LED is off", "Y1 would be the selected line"],
  },
  {
    title: "D = 1, clock still low",
    elements: [
      ...icBox("ff", 80, 70, 150, 120, "74HC74"),
      ...stub("d", "D = 1", 110, 80, true),
      ...stub("c", "CLK = 0", 155, 80),
      ...ledChain("q", 230, 130, "Q"),
    ],
    notes: ["The cell does not take D until the rising edge"],
  },
  {
    title: "Rising clock writes the bit",
    elements: [
      ...icBox("ff", 80, 70, 150, 120, "74HC74", true),
      ...stub("d", "D = 1", 110, 80),
      ...stub("c", "CLK↑", 155, 80, true),
      ...ledChain("q", 230, 130, "Q = 1", true),
    ],
    notes: ["Q lights. That is a write to the selected cell."],
  },
]);

export const memoryDesignTheoryDiagram = memoryDesignStepSchematics[0];
