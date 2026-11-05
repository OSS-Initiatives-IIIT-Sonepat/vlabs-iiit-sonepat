import { type ObservationSection } from "@/labs/lab-content.types";

export const observations: ObservationSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "0110, 0 0110, 1010, 0110.10, and 0.1101 × 2³ are five writings of two values: 6 and 6.5 and −6.",
    "R2 ← R1 copies 0110. The bus carries it only while E = 1.",
    "Add gives 1001, xor gives 0101, and a left shift gives 1100. One unit produced all three.",
  ],
  table: {
    headers: ["Form", "Writing", "Meaning"],
    rows: [
      ["Unsigned", "0110", "6"],
      ["2's complement", "1010", "−6"],
      ["Fixed / float", "0110.10", "6.5"],
      ["Add / xor / shl", "1001 / 0101 / 1100", "three micro-operations"],
    ],
  },
};
