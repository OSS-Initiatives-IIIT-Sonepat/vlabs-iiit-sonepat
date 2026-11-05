import { frames, hop, icBox, ledChain, stub } from "../diagram";

const jk = (hl = false) => [
  ...icBox("not", 80, 70, 80, 70, "NOT", hl),
  ...icBox("jk", 250, 55, 110, 130, "74HC73", hl),
  hop("k", 160, 250, 105),
];

export const flipFlopSynthesisStepSchematics = frames([
  {
    title: "Make a D flip-flop from a JK",
    elements: [
      ...icBox("jk", 140, 60, 200, 140, "JK"),
      ...stub("j", "J = D", 110, 140),
      ...stub("k", "K = D'", 155, 140),
    ],
    notes: ["Excitation: Q to 1 needs J=1, Q to 0 needs K=1", "J = D and K = NOT D does both"],
  },
  {
    title: "SET and CLR stay inactive",
    elements: [
      ...icBox("jk", 150, 60, 180, 130, "74HC73", true),
      ...stub("set", "SET = 1", 105, 150, true),
      ...stub("clr", "CLR = 1", 145, 150, true),
    ],
    notes: ["Both are active-low", "A high leaves the clock in charge"],
  },
  {
    title: "J follows D, K follows NOT D",
    elements: [...jk(true), ...stub("d", "D", 100, 80, true), ...stub("clk", "CLK", 150, 250, true)],
    notes: ["The inverter is the excitation logic", "74HC73 clocks on the falling edge"],
  },
  {
    title: "D = 1, clock low",
    elements: [...jk(), ...stub("d", "D=1", 100, 80), ...stub("clk", "CLK=0", 165, 250), ...ledChain("q", 360, 120, "Q")],
    notes: ["No falling edge yet, so Q holds"],
  },
  {
    title: "Clock rises. Still no capture.",
    elements: [...jk(), ...stub("clk", "CLK=1", 165, 250, true), ...ledChain("q", 360, 130, "Q")],
    notes: ["This chip waits for the fall"],
  },
  {
    title: "Falling edge, D = 1, Q becomes 1",
    elements: [...jk(true), ...stub("d", "D=1", 100, 80), ...stub("clk", "CLK fall", 165, 250, true), ...ledChain("q", 360, 120, "Q=1", true)],
    notes: ["J=1 and K=0 sets Q"],
  },
  {
    title: "D = 0 while the clock is high",
    elements: [...jk(), ...stub("d", "D=0", 100, 80, true), ...stub("clk", "CLK=1", 165, 250), ...ledChain("q", 360, 120, "Q=1")],
    notes: ["Q stays 1 until the next fall"],
  },
  {
    title: "Falling edge, D = 0, Q becomes 0",
    elements: [...jk(true), ...stub("d", "D=0", 100, 80, true), ...stub("clk", "CLK fall", 165, 250, true), ...ledChain("q", 360, 120, "Q=0")],
    notes: ["J=0 and K=1 clears Q", "Q followed D. The JK is now a D flip-flop."],
  },
]);

export const flipFlopSynthesisTheoryDiagram = flipFlopSynthesisStepSchematics[0];
