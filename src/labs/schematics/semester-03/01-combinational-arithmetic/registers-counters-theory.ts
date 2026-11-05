import { frames, icBox, ledChain, stub } from "../diagram";

const cnt = (name: string, hl = false) => icBox("cnt", 150, 60, 170, 140, name, hl);

export const registersCountersStepSchematics = frames([
  {
    title: "A counter is a register that increments",
    elements: [
      ...cnt("74HC161"),
      ...stub("ld", "LD' = 1", 100, 150),
      ...stub("en", "ENP = ENT = 1", 145, 150),
    ],
    notes: ["LD' low would load D, like a register", "Both enables high means count"],
  },
  {
    title: "Tie the controls, then the clock",
    elements: [
      ...cnt("74HC161", true),
      ...stub("clr", "CLR' = 1", 95, 150, true),
      ...stub("ld", "LD' = 1", 125, 150, true),
      ...stub("en", "EN = 1", 155, 150, true),
      ...stub("clk", "CLK", 185, 150, true),
    ],
    notes: ["D3..D0 are 0 because we are not loading", "CLR' stays high so the count is not cleared"],
  },
  {
    title: "Four LEDs, Q0 is the low bit",
    elements: [
      ...cnt("74HC161"),
      ...ledChain("q", 320, 130, "Q", true),
    ],
    notes: ["Clock is low. The count is still 0000."],
  },
  {
    title: "First rising edge: 0001",
    elements: [
      ...cnt("74HC161", true),
      ...stub("clk", "CLK↑", 120, 150, true),
      ...ledChain("q0", 320, 140, "Q0", true),
    ],
    notes: ["Only Q0 is on"],
  },
  {
    title: "Clock returns low",
    elements: [
      ...cnt("74HC161"),
      ...stub("clk", "CLK = 0", 120, 150, true),
      ...ledChain("q0", 320, 140, "Q0"),
    ],
    notes: ["The count holds while the clock is low", "The next rise will increment again"],
  },
  {
    title: "Second rising edge: 0010",
    elements: [
      ...cnt("74HC161", true),
      ...stub("clk", "CLK↑", 120, 150, true),
      ...ledChain("q1", 320, 140, "Q1", true),
    ],
    notes: ["Q1 is on and Q0 is off", "That is binary 2"],
  },
]);

export const registersCountersTheoryDiagram = registersCountersStepSchematics[0];
