import { type ObservationSection } from "@/labs/lab-content.types";

export const observations: ObservationSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: ["Measure the time between LED toggles with a stopwatch or the oscilloscope."],
  table: {
    headers: ["Quantity", "Calculated", "Measured"],
    rows: [
      ["Counts per second (2 MHz / 64)", "31 250", "-"],
      ["Overflow period", "0.5 s", "about 0.5 s"],
      ["LED blink period", "1.0 s", "about 1.0 s"],
    ],
  },
};
