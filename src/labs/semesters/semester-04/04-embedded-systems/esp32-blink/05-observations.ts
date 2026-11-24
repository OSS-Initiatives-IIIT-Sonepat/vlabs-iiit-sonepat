import { type ObservationSection } from "@/labs/lab-content.types";

export const observations: ObservationSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: ["Record the GPIO2 level and the LED state for each write."],
  table: {
    headers: ["GPIO2 written", "Voltage on pin", "LED"],
    rows: [
      ["HIGH", "3.3 V", "On"],
      ["LOW", "0 V", "Off"],
    ],
  },
};
