import { type ObservationSection } from "@/labs/lab-content.types";

export const observations: ObservationSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "Nine transfers change AC. The memory-reference ones are AND, ADD, and the transfer from DR, all at T5. INPR copies an input character. CMA, SHR, SHL, CLA, and INC are register-reference operations.",
    "LD is the OR of the controls that load a new 16-bit word from the adder and logic circuit. INR is driven by the increment bit B5. CLR is driven by B11. The clock is what writes AC once one of those three controls is active.",
  ],
  table: {
    headers: ["Control", "Condition", "What AC does"],
    rows: [
      ["AND", "D0 T5", "AC ← AC ∧ DR, SC ← 0"],
      ["ADD", "D1 T5", "AC ← AC + DR, SC ← 0"],
      ["DR", "D2 T5", "AC ← DR, SC ← 0"],
      ["INPR", "p B11", "AC(0-7) ← INPR, FGI ← 0"],
      ["CMA", "r B9", "AC ← AC'"],
      ["SHR", "r B7", "AC ← shr AC, AC(15) ← E"],
      ["SHL", "r B6", "AC ← shl AC, AC(0) ← E"],
      ["INC", "r B5", "AC ← AC + 1"],
      ["CLR", "r B11", "AC ← 0"],
      ["LD", "AND + ADD + DR + INPR + CMA + SHR + SHL", "Load the adder output"],
    ],
  },
};
