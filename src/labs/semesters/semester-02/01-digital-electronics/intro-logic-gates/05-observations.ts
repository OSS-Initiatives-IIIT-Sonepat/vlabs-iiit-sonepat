import { type LabSection } from "@/labs/lab-content.types";

export const observations: LabSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "Apply all four combinations of inputs A and B and record the logic level of each gate output (LED ON = 1, LED OFF = 0). Compare your readings with the expected values below.",
  ],
  table: {
    headers: [
      "A",
      "B",
      "NOT (Ā)",
      "AND",
      "OR",
      "NAND",
      "NOR",
      "EX-OR",
      "EX-NOR",
    ],
    rows: [
      ["0", "0", "1", "0", "0", "1", "1", "0", "1"],
      ["0", "1", "1", "0", "1", "1", "0", "1", "0"],
      ["1", "0", "0", "0", "1", "1", "0", "1", "0"],
      ["1", "1", "0", "1", "1", "0", "0", "0", "1"],
    ],
  },
};
