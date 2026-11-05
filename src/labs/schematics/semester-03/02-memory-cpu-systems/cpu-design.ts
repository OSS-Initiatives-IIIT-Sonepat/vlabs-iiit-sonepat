import { frames, hop, icBox, ledChain, stub } from "../diagram";

const cpu = (hl = false) => [
  ...icBox("pc", 90, 70, 120, 110, "PC", hl),
  ...icBox("dec", 270, 70, 130, 110, "74HC138", hl),
  hop("h", 210, 270, 125),
];

export const cpuDesignStepSchematics = frames([
  {
    title: "Fetch is the PC selecting an instruction",
    elements: [...cpu()],
    notes: ["Q0 Q1 Q2 are the address", "Y0 and Y1 are instruction 0 and 1"],
  },
  {
    title: "74HC161 is the program counter",
    elements: [
      ...cpu(true),
      ...stub("en", "EN=1", 110, 90),
    ],
    notes: ["CLR' and LD' stay high", "ENP and ENT stay high"],
  },
  {
    title: "PC = 0, clock low",
    elements: [
      ...icBox("pc", 100, 70, 140, 110, "PC = 0", true),
      ...stub("clk", "CLK = 0", 120, 100),
      ...ledChain("i0", 240, 125, "I0", true),
    ],
    notes: ["Instruction 0 LED is on", "That is the fetch of address 0"],
  },
  {
    title: "Still holding address 0",
    elements: [
      ...icBox("pc", 100, 70, 140, 110, "PC = 0"),
      ...ledChain("i0", 240, 125, "I0"),
    ],
    notes: ["The counter changes only on the rising edge"],
  },
  {
    title: "Rising edge: fetch instruction 1",
    elements: [
      ...icBox("pc", 100, 70, 150, 110, "PC = 1", true),
      ...stub("clk", "CLK rise", 120, 100, true),
      ...ledChain("i1", 250, 125, "I1", true),
    ],
    notes: ["Instruction 0 goes out", "Instruction 1 lights. The next fetch."],
  },
]);

export const cpuDesignTheoryDiagram = cpuDesignStepSchematics[0];
