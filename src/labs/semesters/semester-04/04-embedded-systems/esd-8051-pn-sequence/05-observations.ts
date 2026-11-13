import { type ObservationSection } from "@/labs/lab-content.types";

export const observations: ObservationSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: ["Record the first few register values and check each feedback bit by hand."],
  table: {
    headers: ["Step", "Register (hex)", "Feedback bit", "Low nibble on LEDs"],
    rows: [
      [0, "0x01", "0", "0001"],
      [1, "0x02", "0", "0010"],
      [2, "0x04", "0", "0100"],
      [3, "0x08", "0", "1000"],
    ],
  },
};
