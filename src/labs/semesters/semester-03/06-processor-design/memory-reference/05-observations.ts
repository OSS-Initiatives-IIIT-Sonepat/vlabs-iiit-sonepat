import { type ObservationSection } from "@/labs/lab-content.types";

export const observations: ObservationSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "AND, ADD, and LDA read M[AR] into DR at T4. AND writes AC ← AC ∧ DR. ADD writes AC ← AC + DR and keeps the carry in E. LDA writes AC ← DR. STA and BUN finish in one clock: STA writes AC into memory, and BUN copies AR into PC.",
    "BSA takes two clocks. T4 saves PC at the effective address and increments AR. T5 copies that new AR into PC, so the subroutine runs. In the example, M[135] becomes 21 and PC becomes 136. ISZ takes three clocks, because the memory word has to be read, incremented in DR, and stored back. A zero result also increments PC, which skips one instruction.",
  ],
  table: {
    headers: ["Instruction", "Timing", "Micro-operation"],
    rows: [
      ["AND", "D0T4", "DR ← M[AR]"],
      ["AND", "D0T5", "AC ← AC ∧ DR, SC ← 0"],
      ["ADD", "D1T4", "DR ← M[AR]"],
      ["ADD", "D1T5", "AC ← AC + DR, E ← Cout, SC ← 0"],
      ["LDA", "D2T4", "DR ← M[AR]"],
      ["LDA", "D2T5", "AC ← DR, SC ← 0"],
      ["STA", "D3T4", "M[AR] ← AC, SC ← 0"],
      ["BUN", "D4T4", "PC ← AR, SC ← 0"],
      ["BSA", "D5T4", "M[AR] ← PC, AR ← AR + 1"],
      ["BSA", "D5T5", "PC ← AR, SC ← 0"],
      ["ISZ", "D6T4", "DR ← M[AR]"],
      ["ISZ", "D6T5", "DR ← DR + 1"],
      ["ISZ", "D6T6", "M[AR] ← DR, if (DR = 0) then (PC ← PC + 1), SC ← 0"],
    ],
  },
};
