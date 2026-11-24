import { type ObservationSection } from "@/labs/lab-content.types";

export const observations: ObservationSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: ["Record the LED pattern for selected counts."],
  table: {
    headers: ["Count", "Binary (P1.3 P1.2 P1.1 P1.0)", "LEDs on"],
    rows: [
      [0, "0000", "none"],
      [5, "0101", "LED0, LED2"],
      [9, "1001", "LED0, LED3"],
      [15, "1111", "all four"],
    ],
  },
};
