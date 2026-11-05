import { type ObservationSection } from "@/labs/lab-content.types";

export const observations: ObservationSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "With E = 1 only on R1, the bus carried 1010. The read then put M[5] = 1100 into DR.",
    "The write stored 0011 at address 5. After every buffer was disabled, that word stayed in memory.",
  ],
};
