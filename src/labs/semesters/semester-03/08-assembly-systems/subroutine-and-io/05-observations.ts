import { type ObservationSection } from "@/labs/lab-content.types";

export const observations: ObservationSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "BSA writes 101 into M[108] and the return loads that 101 back into PC.",
    "The first SKI sees FGI = 0 and branches. The next sees FGI = 1, so INP runs and AC becomes 0101.",
  ],
};
