import { type LabSection } from "@/labs/lab-content.types";

export const observations: LabSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "Set the select lines S1 S0 and the data input D, then record the logic level at each output pin of the 74HC139 (active-LOW outputs). An LED is ON when its output pin is LOW.",
  ],
  table: {
    headers: ["S1", "S0", "D", "Y0", "Y1", "Y2", "Y3", "LED(s) ON", "Observed"],
    rows: [
      ["0", "0", "0", "0", "1", "1", "1", "Y0", ""],
      ["0", "0", "1", "1", "1", "1", "1", "None", ""],
      ["0", "1", "0", "1", "0", "1", "1", "Y1", ""],
      ["0", "1", "1", "1", "1", "1", "1", "None", ""],
      ["1", "0", "0", "1", "1", "0", "1", "Y2", ""],
      ["1", "0", "1", "1", "1", "1", "1", "None", ""],
      ["1", "1", "0", "1", "1", "1", "0", "Y3", ""],
      ["1", "1", "1", "1", "1", "1", "1", "None", ""],
    ],
  },
};
