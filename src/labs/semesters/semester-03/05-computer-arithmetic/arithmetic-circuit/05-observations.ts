import { type ObservationSection } from "@/labs/lab-content.types";

export const observations: ObservationSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "A is tied to 1101 and B to 0011, so B' is 1100. Cout and D3 are the upper lamps on the left, D1 and D0 are the lower lamps on the left, and D2 is the upper lamp at the right.",
    "Adding B gives 1 0000. Adding B with Cin gives 1 0001. Adding B' gives 1 1001, which is 13 − 3 − 1. Adding B' with Cin gives 1 1010, which is 13 − 3.",
    "Y = 0 copies A as 0 1101, and Y = 0 with Cin increments it to 0 1110. Y = 1111 decrements A to 1 1100. The same Y with Cin wraps the word back to A, 1 1101.",
  ],
  table: {
    headers: ["S1", "S0", "Cin", "Y", "D = A + Y + Cin", "Microoperation"],
    rows: [
      ["0", "0", "0", "B", "D = A + B", "Add"],
      ["0", "0", "1", "B", "D = A + B + 1", "Add with carry"],
      ["0", "1", "0", "B'", "D = A + B'", "Subtract with borrow"],
      ["0", "1", "1", "B'", "D = A + B' + 1", "Subtract"],
      ["1", "0", "0", "0", "D = A", "Transfer"],
      ["1", "0", "1", "0", "D = A + 1", "Increment A"],
      ["1", "1", "0", "1", "D = A − 1", "Decrement A"],
      ["1", "1", "1", "1", "D = A", "Transfer A"],
    ],
  },
};
