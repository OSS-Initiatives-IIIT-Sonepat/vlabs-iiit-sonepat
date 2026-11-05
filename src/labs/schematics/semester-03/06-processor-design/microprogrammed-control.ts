import { block, frames, memword } from "../diagram";

const word = (on = false) =>
  memword("cw", 160, 120, "CAR", "0001", "control", on);

export const microprogramStepSchematics = frames([
  {
    title: "The control address register",
    elements: [block("car", 200, 120, 140, 48, "CAR", true), block("seq", 460, 120, 160, 48, "sequencer")],
    notes: ["CAR holds the address of the current microinstruction."],
  },
  {
    title: "One microinstruction, split into fields",
    elements: [word(true)],
    notes: ["Each field of the control word drives one set of gates."],
  },
  {
    title: "Clock low: control word 0001",
    elements: [word(true)],
    notes: ["CAR = 0. The ROM lamps show the word stored at address 0."],
  },
  {
    title: "One clock: control word 0010",
    elements: [memword("cw", 160, 120, "CAR", "0010", "control", true)],
    notes: ["The counter advanced CAR by one. The next control word is on the lamps."],
  },
  {
    title: "Hardwired control uses gates instead",
    elements: [
      block("sc", 180, 120, 180, 48, "sequence counter", true),
      block("gates", 460, 120, 180, 48, "decode gates", true),
    ],
    notes: ["Hardwired control is a counter and gates. There is no control memory."],
  },
]);

export const microprogramTheoryDiagram = microprogramStepSchematics[1];
