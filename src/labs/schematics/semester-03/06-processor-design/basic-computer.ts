import { frames, memword } from "../diagram";

const direct = [
  memword("m22", 200, 90, "22", "ADD 457", "mode 0"),
  memword("m457", 200, 140, "457", "operand", "—"),
];
const indirect = [
  memword("m35", 200, 200, "35", "ADD 300", "mode 1"),
  memword("m300", 200, 250, "300", "1350", "pointer"),
  memword("m1350", 200, 300, "1350", "operand", "—"),
];

export const basicComputerStepSchematics = frames([
  {
    title: "Clock low: the board reads address 0",
    elements: [memword("w0", 180, 120, "0", "0001", "board", true)],
    notes: ["Address 0 stands for the instruction word. The lamps show 0001."],
  },
  {
    title: "One rising clock: the next word",
    elements: [
      memword("w0", 180, 100, "0", "0001", "board"),
      memword("w1", 180, 150, "1", "0101", "board", true),
    ],
    notes: ["The program counter advanced by one. The lamps show 0101."],
  },
  {
    title: "Direct addressing",
    height: 360,
    elements: direct.map((el, i) => (i === 1 ? { ...el, highlight: true } : el)),
    notes: ["Mode 0: the address field 457 is the operand address."],
  },
  {
    title: "Indirect addressing",
    height: 420,
    elements: [
      ...direct,
      memword("m35", 200, 210, "35", "ADD 300", "mode 1", true),
      memword("m300", 200, 260, "300", "1350", "pointer", true),
      memword("m1350", 200, 310, "1350", "operand", "—", true),
    ],
    notes: ["Mode 1: address 300 holds 1350, and 1350 holds the operand."],
  },
  {
    title: "T0 fetches the instruction",
    elements: [memword("t0", 160, 120, "T0", "IR ← M[PC]", "fetch", true)],
    notes: ["The instruction cycle starts by copying one memory word into the IR."],
  },
  {
    title: "The next time slot decodes it",
    elements: [
      memword("t0", 160, 90, "T0", "IR ← M[PC]", "fetch"),
      memword("t1", 160, 150, "T1", "decode opcode", "decode", true),
    ],
    notes: ["Decode reads the opcode. The address mode says where the operand is."],
  },
]);

export const basicComputerTheoryDiagram = basicComputerStepSchematics[3];
