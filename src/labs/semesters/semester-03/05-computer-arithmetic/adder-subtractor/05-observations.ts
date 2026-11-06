import { type ObservationSection } from "@/labs/lab-content.types";

export const observations: ObservationSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "A is tied to 1010 and B to 0011. M is the only switch. It feeds the four XOR gates and the carry input C0.",
    "With M = 0 the XOR gates pass B, C0 is 0, and the lamps read 0 1101. That is 13.",
    "With M = 1 the XOR gates output 1100, C0 is 1, and the lamps read 1 0111. That is 7, the difference 10 − 3.",
  ],
  table: {
    headers: ["M", "Operation", "C0", "B into the adder", "C4 S"],
    rows: [
      ["0", "Add", "0", "0011", "0 1101"],
      ["1", "Subtract", "1", "1100", "1 0111"],
    ],
  },
};
