import { type ObservationSection } from "@/labs/lab-content.types";

export const observations: ObservationSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "Compare the measured output with the value calculated from the code.",
  ],
  table: {
    headers: ["Code (P1)", "Calculated Vout", "Measured"],
    rows: [
      ["0000", "0.00 V", "-"],
      ["0101", "1.56 V", "-"],
      ["1000", "2.50 V", "-"],
      ["1111", "4.69 V", "-"],
    ],
  },
};
