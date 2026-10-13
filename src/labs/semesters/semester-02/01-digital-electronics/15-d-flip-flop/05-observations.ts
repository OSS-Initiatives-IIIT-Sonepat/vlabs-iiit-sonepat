import { type LabSection } from "@/labs/lab-content.types";

export const observations: LabSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "Apply each D and CLK condition, starting from the present state Qn, and record the next state. ↑ is the rising clock edge (0 to 1), ↓ is the falling edge and X means don't care. LED ON = logic 1.",
  ],
  table: {
    headers: ["D", "CLK", "Qn", "Qn+1", "Q̄n+1", "Operation", "Observed"],
    rows: [
      ["0", "↑", "0", "0", "1", "Reset", ""],
      ["0", "↑", "1", "0", "1", "Reset", ""],
      ["1", "↑", "0", "1", "0", "Set", ""],
      ["1", "↑", "1", "1", "0", "Set", ""],
      ["X", "0", "0", "0", "1", "No change (hold)", ""],
      ["X", "0", "1", "1", "0", "No change (hold)", ""],
      ["X", "↓", "0", "0", "1", "No change (hold)", ""],
      ["X", "↓", "1", "1", "0", "No change (hold)", ""],
    ],
  },
};
