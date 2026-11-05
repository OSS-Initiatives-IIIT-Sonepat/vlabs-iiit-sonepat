import { type ObservationSection } from "@/labs/lab-content.types";

export const observations: ObservationSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "R2 ← R1 copies 1 1 0 1 from R1 into R2.",
    "With the control function, that copy waits until P is 1 and the clock edge arrives. Load lights on that edge, and R2's lamps then read 1 1 0 1.",
  ],
};
