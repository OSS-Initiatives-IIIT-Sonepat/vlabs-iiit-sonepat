import { type ObservationSection } from "@/labs/lab-content.types";

export const observations: ObservationSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "With select 0 the lamp follows R0 and is on. With select 1 it follows R1 and is off.",
    "Logical shift fills with 0, circular shift wraps the lost bit, and arithmetic shift copies the sign.",
  ],
};
