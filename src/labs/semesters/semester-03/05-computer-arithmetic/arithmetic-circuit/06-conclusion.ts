import { type ConclusionSection } from "@/labs/lab-content.types";

export const conclusion: ConclusionSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "One parallel adder performs eight arithmetic microoperations. A 4×1 multiplexer on each bit sets Y to B, B', 0, or 1, and Cin supplies the extra one when the operation needs it. With A = 1101 and B = 0011, the eight results are 10000, 10001, 11001, 11010, 01101, 01110, 11100, and 11101.",
  ],
};
