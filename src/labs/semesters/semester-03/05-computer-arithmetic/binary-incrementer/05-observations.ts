import { type ObservationSection } from "@/labs/lab-content.types";

export const observations: ObservationSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "A = 1101. With C0 held at 0 and B at 0000, the lamps copy A: C4 is dark and the sum is 1101.",
    "Raising C0 adds one. Bit 0 turns off, bit 1 turns on, and bits 2 and 3 stay on. C4 stays dark. The word is 1110.",
    "The carry into bit 1 is the only carry that is 1. It dies there, so bits 2 and 3 are not flipped.",
  ],
  table: {
    headers: ["Bit", "x (A)", "y", "Carry out", "S"],
    rows: [
      ["3", "1", "0", "0", "1"],
      ["2", "1", "0", "0", "1"],
      ["1", "0", "1", "0", "1"],
      ["0", "1", "1", "1", "0"],
    ],
  },
};
