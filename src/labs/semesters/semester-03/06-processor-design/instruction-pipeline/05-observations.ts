import { type ObservationSection } from "@/labs/lab-content.types";

export const observations: ObservationSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "Each clock moves the three instructions one stage to the right.",
    "A branch clears every stage. The float add normalises 1.7704 to 0.1770 × 10³.",
  ],
};
