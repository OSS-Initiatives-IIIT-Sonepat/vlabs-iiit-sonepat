import { type LabSection } from "@/labs/lab-content.types";

export const observations: LabSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "Apply clock pulses starting from 000 and record the counter state in each mode. The expected readings are given below.",
  ],
  table: {
    headers: [
      "Clock pulse",
      "Up: Q2 Q1 Q0",
      "Up: Decimal",
      "Down: Q2 Q1 Q0",
      "Down: Decimal",
    ],
    rows: [
      ["0", "000", "0", "000", "0"],
      ["1", "001", "1", "100", "4"],
      ["2", "010", "2", "011", "3"],
      ["3", "011", "3", "010", "2"],
      ["4", "100", "4", "001", "1"],
      ["5", "000", "0", "000", "0"],
    ],
  },
} as LabSection;
