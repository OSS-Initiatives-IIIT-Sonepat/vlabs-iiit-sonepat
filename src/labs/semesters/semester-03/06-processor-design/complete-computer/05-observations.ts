import { type ObservationSection } from "@/labs/lab-content.types";

export const observations: ObservationSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "On a read, control raises the memory enable and DR loads the bus. The other registers stay off the bus.",
  ],
};
