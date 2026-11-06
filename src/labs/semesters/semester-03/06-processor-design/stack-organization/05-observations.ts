import { type ObservationSection } from "@/labs/lab-content.types";

export const observations: ObservationSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "On the register stack, SP moves up on a push and down on a pop. EMTY clears on a push. FULL clears on a pop.",
    "On the memory stack, SP moves down on a push. The two organizations use opposite pointer directions.",
  ],
};
