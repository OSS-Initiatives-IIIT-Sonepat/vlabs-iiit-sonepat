import { type ObservationSection } from "@/labs/lab-content.types";

export const observations: ObservationSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: ["Record the value of D2 for each button state."],
  table: {
    headers: ["Button", "Pin D2", "digitalRead value"],
    rows: [
      ["Released", "Pulled to 5 V", "1 (HIGH)"],
      ["Pressed", "Connected to GND", "0 (LOW)"],
    ],
  },
};
