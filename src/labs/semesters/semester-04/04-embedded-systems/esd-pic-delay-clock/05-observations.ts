import { type ObservationSection } from "@/labs/lab-content.types";

export const observations: ObservationSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "Measure the blink period at each clock setting with a stopwatch or the oscilloscope.",
  ],
  table: {
    headers: ["OSCCON", "Clock", "Blink period (measured)", "Expected"],
    rows: [
      ["0x70", "8 MHz", "about 1.0 s", "1.0 s"],
      ["0x60", "4 MHz", "about 2.0 s", "2.0 s"],
    ],
  },
};
