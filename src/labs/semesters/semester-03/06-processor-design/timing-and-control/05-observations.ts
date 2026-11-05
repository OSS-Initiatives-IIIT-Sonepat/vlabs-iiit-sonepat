import { type ObservationSection } from "@/labs/lab-content.types";

export const observations: ObservationSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "T0, T1, and T2 are the same for every instruction. T4 and T5 are the ADD execute times.",
    "SC returns to 0 at T5, which is what starts the next fetch.",
  ],
};
