import { type ObservationSection } from "@/labs/lab-content.types";

export const observations: ObservationSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "Clock low shows 0001 at address 0. One rising edge shows 0101 at address 1.",
    "Direct mode uses the address in the instruction. Indirect mode uses that address as a pointer.",
  ],
};
