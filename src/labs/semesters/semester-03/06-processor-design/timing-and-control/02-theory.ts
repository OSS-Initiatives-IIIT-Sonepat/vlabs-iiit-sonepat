import { type TheorySection } from "@/labs/lab-content.types";
import { timingAndControlTheoryDiagram } from "@/labs/schematics/semester-03/06-processor-design/timing-and-control";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "The sequence counter SC is decoded so that exactly one timing signal T0, T1, T2, … is 1.",
    "T0 does AR ← PC. T1 does IR ← M[AR] and PC ← PC + 1. T2 decodes the opcode into D0–D7, copies the address into AR, and copies bit 15 into I.",
    "If I is 1, T3 does the indirect read AR ← M[AR]. A direct instruction skips that.",
    "Direct ADD uses D1. T4 does DR ← M[AR]. T5 does AC ← AC + DR and SC ← 0, so the next instruction starts at T0.",
  ],
  circuitDiagram: timingAndControlTheoryDiagram,
};
