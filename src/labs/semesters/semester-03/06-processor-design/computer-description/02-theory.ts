import { type TheorySection } from "@/labs/lab-content.types";
import { computerDescriptionTheoryDiagram } from "@/labs/schematics/semester-03/06-processor-design/computer-description";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "An instruction word has an indirect bit I, a 3-bit opcode, and an address. ADD is opcode 001. A memory-reference instruction uses that address as the operand.",
    "PC points at the next instruction. AR holds the address being read. IR holds the instruction just fetched. DR holds the data word. AC, the accumulator, holds the running result.",
    "T0 does AR ← PC. T1 does IR ← M[AR] and PC ← PC + 1. T2 copies the address field into AR. T3 for ADD does DR ← M[AR] and AC ← AC + DR.",
    "Input, output, and interrupt are further boxes on this computer. They share the same registers and the same cycle.",
  ],
  circuitDiagram: computerDescriptionTheoryDiagram,
};
