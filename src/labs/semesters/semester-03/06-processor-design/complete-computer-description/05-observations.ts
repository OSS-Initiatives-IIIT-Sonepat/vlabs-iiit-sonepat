import { type ObservationSection } from "@/labs/lab-content.types";

export const observations: ObservationSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "The computer always re-enters at R. R = 0 fetches with R'T0, R'T1, and R'T2. R = 1 runs RT0, RT1, and RT2, which leave the return address in location 0 and PC equal to 1.",
    "After the fetch or the interrupt, D7 and I select the execute boxes. Register and input-output instructions finish at T3. A memory-reference instruction reads an indirect address at T3 when I = 1, and executes at T4. Each of those boxes clears SC, and the border of the chart returns control to R.",
  ],
  table: {
    headers: ["When", "Condition", "Transfer"],
    rows: [
      ["Start", "power on", "SC ← 0, IEN ← 0, R ← 0"],
      ["R'T0", "R = 0", "AR ← PC"],
      ["R'T1", "R = 0", "IR ← M[AR], PC ← PC + 1"],
      ["R'T2", "R = 0", "Decode IR(12-14), AR ← IR(0-11), I ← IR(15)"],
      ["RT0", "R = 1", "AR ← 0, TR ← PC"],
      ["RT1", "R = 1", "M[0] ← TR, PC ← 0"],
      ["RT2", "R = 1", "PC ← PC + 1, IEN ← 0, R ← 0, SC ← 0"],
      ["Input-output", "D7 = 1, I = 1, T3", "Execute input-output, SC ← 0"],
      ["Register", "D7 = 1, I = 0, T3", "Execute register-reference, SC ← 0"],
      ["Indirect", "D7 = 0, I = 1, T3", "AR ← M[AR]"],
      ["Direct", "D7 = 0, I = 0, T3", "Nothing"],
      ["Memory", "T4", "Execute memory-reference, SC ← 0"],
    ],
  },
};
