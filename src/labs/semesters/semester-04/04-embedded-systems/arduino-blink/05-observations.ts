import { type ObservationSection } from "@/labs/lab-content.types";

export const observations: ObservationSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "Record the LED state for each digital output the sketch writes.",
  ],
  table: {
    headers: ["D13 written", "Voltage on pin", "LED"],
    rows: [
      ["HIGH", "5 V", "On"],
      ["LOW", "0 V", "Off"],
    ],
  },
};
