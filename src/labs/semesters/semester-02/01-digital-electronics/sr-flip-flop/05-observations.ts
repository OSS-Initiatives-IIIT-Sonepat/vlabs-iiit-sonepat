import { type LabSection } from "@/labs/lab-content.types";

export const observations: LabSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "Apply each S and R combination, starting from the present state Qn, and record the next state. LED ON = logic 1. Do not hold S = R = 1 for longer than needed to observe the invalid state.",
  ],
  table: {
    headers: ["S", "R", "Qn", "Qn+1", "Q̄n+1", "Operation", "Observed"],
    rows: [
      ["0", "0", "0", "0", "1", "No change (hold)", ""],
      ["0", "0", "1", "1", "0", "No change (hold)", ""],
      ["0", "1", "0", "0", "1", "Reset", ""],
      ["0", "1", "1", "0", "1", "Reset", ""],
      ["1", "0", "0", "1", "0", "Set", ""],
      ["1", "0", "1", "1", "0", "Set", ""],
      ["1", "1", "0", "0", "0", "Invalid", ""],
      ["1", "1", "1", "0", "0", "Invalid", ""],
    ],
  },
};
