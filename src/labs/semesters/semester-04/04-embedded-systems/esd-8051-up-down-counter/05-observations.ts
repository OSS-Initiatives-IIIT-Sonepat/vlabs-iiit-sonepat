import { type ObservationSection } from "@/labs/lab-content.types";

export const observations: ObservationSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: ["Record the direction and the LED pattern after each change of the button."],
  table: {
    headers: ["Button", "P3.2", "Direction", "Count sequence"],
    rows: [
      ["Released", "1", "Up", "0, 1, 2, 3, ..., 15, 0"],
      ["Pressed", "0", "Down", "15, 14, 13, ..., 0, 15"],
    ],
  },
};
