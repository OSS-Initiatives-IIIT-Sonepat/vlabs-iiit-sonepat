import { type ObservationSection } from "@/labs/lab-content.types";

export const observations: ObservationSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "ADD, LDA, and STA use an address. CLA and CMA do not.",
    "INP, OUT, and SKI share opcode 111 with the register instructions, and I = 1 is what separates them.",
  ],
};
