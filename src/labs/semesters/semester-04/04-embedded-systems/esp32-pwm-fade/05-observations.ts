import { type ObservationSection } from "@/labs/lab-content.types";

export const observations: ObservationSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: ["Record the brightness of the LED for each duty cycle."],
  table: {
    headers: ["Duty (0 to 255)", "Duty %", "Average voltage", "LED brightness"],
    rows: [
      [64, "25 %", "0.8 V", "Dim"],
      [128, "50 %", "1.65 V", "Half"],
      [255, "100 %", "3.3 V", "Full"],
    ],
  },
};
