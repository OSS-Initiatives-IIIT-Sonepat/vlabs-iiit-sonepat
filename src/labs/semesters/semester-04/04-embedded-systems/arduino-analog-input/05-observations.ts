import { type ObservationSection } from "@/labs/lab-content.types";

export const observations: ObservationSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "Compare the measured voltage with the value calculated from the divider. The two should agree within a few tenths of a volt.",
  ],
  table: {
    headers: ["Quantity", "Calculated", "Measured (analogRead)"],
    rows: [
      ["Middle-point voltage", "2.50 V", "about 2.5 V"],
      ["Raw ADC count", "512", "about 512"],
    ],
  },
};
