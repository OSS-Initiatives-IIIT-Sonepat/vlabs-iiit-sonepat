import { type ObservationSection } from "@/labs/lab-content.types";

export const observations: ObservationSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "T0, T1, and T2 are the same for every instruction. T0 copies PC into AR. T1 loads that memory word into IR and increments PC. T2 decodes IR(12-14) into D0 through D7, copies IR(0-11) into AR, and copies IR(15) into I.",
    "D7 = 1 and I = 0 executes a register-reference instruction at T3. D7 = 1 and I = 1 executes an input-output instruction at T3. Both clear SC. D7 = 0 and I = 0 does nothing at T3, because AR is already the effective address. D7 = 0 and I = 1 reads that address at T3 with AR ← M[AR]. The memory-reference instruction itself executes at T4, and SC returns to 0.",
  ],
  table: {
    headers: ["Time", "Condition", "Micro-operation"],
    rows: [
      ["T0", "every instruction", "AR ← PC"],
      ["T1", "every instruction", "IR ← M[AR], PC ← PC + 1"],
      ["T2", "every instruction", "Decode IR(12-14), AR ← IR(0-11), I ← IR(15)"],
      ["T3", "D7 = 1, I = 0", "Execute register-reference, SC ← 0"],
      ["T3", "D7 = 1, I = 1", "Execute input-output, SC ← 0"],
      ["T3", "D7 = 0, I = 0", "Nothing"],
      ["T3", "D7 = 0, I = 1", "AR ← M[AR]"],
      ["T4", "D7 = 0", "Execute memory-reference, SC ← 0"],
    ],
  },
};
