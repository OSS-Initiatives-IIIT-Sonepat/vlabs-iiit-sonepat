import { type LabSection } from "@/labs/lab-content.types";

export const observations: LabSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "Apply each input combination and verify the output logic levels (LED ON = 1, LED OFF = 0).",
  ],
  table: {
    headers: ["D3", "D2", "D1", "D0", "Y1 (output)", "Y0 (output)"],
    rows: [
      ["0", "0", "0", "1", "0", "0"],
      ["0", "0", "1", "0", "0", "1"],
      ["0", "1", "0", "0", "1", "0"],
      ["1", "0", "0", "0", "1", "1"],
    ],
  },
};
