import { block, frames, memword } from "../diagram";

export const registerOrganisationStepSchematics = frames([
  {
    title: "Two registers and a mux",
    elements: [
      block("r0", 140, 120, 90, 44, "R0", true),
      block("mux", 320, 120, 120, 44, "mux"),
      block("r1", 500, 120, 90, 44, "R1"),
    ],
    notes: ["The mux is the read port. One select bit chooses R0 or R1."],
  },
  {
    title: "R0 is on the bus",
    elements: [
      block("r0", 140, 120, 90, 44, "R0 = 1", true),
      block("mux", 320, 120, 120, 44, "select 0", true),
      block("r1", 500, 120, 90, 44, "R1 = 0"),
    ],
    notes: ["Select 0. The lamp follows R0, so it is on."],
  },
  {
    title: "R1 is on the bus",
    elements: [
      block("r0", 140, 120, 90, 44, "R0 = 1"),
      block("mux", 320, 120, 120, 44, "select 1", true),
      block("r1", 500, 120, 90, 44, "R1 = 0", true),
    ],
    notes: ["Select 1. The lamp follows R1, so it is off."],
  },
  {
    title: "A memory stack",
    elements: [
      memword("s0", 180, 90, "SP 0", "0101", "pushed", true),
      memword("s1", 180, 140, "SP 1", "0011", "next"),
    ],
    notes: ["The counter is the stack pointer. Address 0 holds the word that was pushed."],
  },
  {
    title: "Immediate, register, and indexed",
    height: 320,
    elements: [
      block("imm", 320, 70, 280, 40, "immediate: the operand is in the instruction"),
      block("reg", 320, 130, 280, 40, "register: the field names a register", true),
      block("idx", 320, 190, 280, 40, "indexed: address + index register"),
    ],
    notes: ["Direct and indirect addressing are in the basic-computer lab."],
  },
]);

export const registerOrganisationTheoryDiagram = registerOrganisationStepSchematics[0];
