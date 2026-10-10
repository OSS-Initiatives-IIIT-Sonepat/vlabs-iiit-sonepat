import { type LabSection } from "@/labs/lab-content.types";

export const observations: LabSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "Apply every combination of A, B and Bin and note the Difference and Borrow outputs. An LED that is ON means logic 1.",
  ],
  table: {
    headers: [
      "A",
      "B",
      "Bin",
      "Difference",
      "Borrow",
      "Diff LED",
      "Borrow LED",
    ],
    rows: [
      ["0", "0", "0", "0", "0", "OFF", "OFF"],
      ["0", "0", "1", "1", "1", "ON", "ON"],
      ["0", "1", "0", "1", "1", "ON", "ON"],
      ["0", "1", "1", "0", "1", "OFF", "ON"],
      ["1", "0", "0", "1", "0", "ON", "OFF"],
      ["1", "0", "1", "0", "0", "OFF", "OFF"],
      ["1", "1", "0", "0", "0", "OFF", "OFF"],
      ["1", "1", "1", "1", "1", "ON", "ON"],
    ],
  },
};
