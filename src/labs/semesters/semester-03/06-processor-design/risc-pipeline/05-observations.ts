import { type ObservationSection } from "@/labs/lab-content.types";

export const observations: ObservationSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "Load R1, Load R2, then a NOP, then Add R1+R2. The NOP is the delayed load.",
  ],
};
