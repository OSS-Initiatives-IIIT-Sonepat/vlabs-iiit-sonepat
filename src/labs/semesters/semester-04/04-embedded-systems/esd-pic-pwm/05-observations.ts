import { type ObservationSection } from "@/labs/lab-content.types";

export const observations: ObservationSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: ["Record the brightness and the calculated average voltage at each duty cycle."],
  table: {
    headers: ["CCPR1L", "Duty", "Average voltage", "LED"],
    rows: [
      [64, "25 %", "1.25 V", "Dim"],
      [128, "50 %", "2.5 V", "Half"],
      [255, "about 100 %", "5 V", "Full"],
    ],
  },
};
