import { type ObservationSection } from "@/labs/lab-content.types";

export const observations: ObservationSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "A = 1101 and B = 0111 with C0 held at 0. The carry lamp C4 lights.",
    "The sum lamps, from bit 3 down to bit 0, read 0 1 0 0. With the carry, the result is 10100.",
    "That is 13 + 7. Each full adder passes its carry to the next higher bit.",
  ],
};
