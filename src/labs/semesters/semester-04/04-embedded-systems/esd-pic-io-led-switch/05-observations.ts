import { type ObservationSection } from "@/labs/lab-content.types";

export const observations: ObservationSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: ["Record RB0 and the LED for each button state."],
  table: {
    headers: ["Button", "RB0", "RD0 (LED)"],
    rows: [
      ["Pressed", "HIGH (5 V)", "On"],
      ["Released", "LOW (0 V)", "Off"],
    ],
  },
};
