import { type ObservationSection } from "@/labs/lab-content.types";

export const observations: ObservationSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "Associative search checks every line. Direct mapping checks one line. Set-associative checks the lines in one set.",
    "A page with a frame is in memory. A page without a frame is a fault.",
  ],
};
