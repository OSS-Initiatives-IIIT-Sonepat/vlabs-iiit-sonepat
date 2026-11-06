import { type ObservationSection } from "@/labs/lab-content.types";

export const observations: ObservationSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "Before the strobe the flag is off and the outputs are 0.",
    "After the rising strobe the outputs are 0101 and the flag is on.",
  ],
};
