import { type ObservationSection } from "@/labs/lab-content.types";

export const observations: ObservationSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "The PIC18F4550 from above. Check each labelled pin against the chip on your board: what is it wired to, and why?",
  ],
  figure: { board: "pic18f4550" },
};
