import { type ObservationSection } from "@/labs/lab-content.types";

export const observations: ObservationSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "With the decoder enable held inactive, the bus lamp stays dark. No buffer is driving the line.",
    "Enable on and S1 S0 = 00 lights the lamp, because A0 is 1. 01 selects B0 and the lamp goes dark.",
    "10 selects C0 and the lamp lights again. 11 selects D0 and it goes dark. One select value, one driver.",
  ],
};
