import { type ConclusionSection } from "@/labs/lab-content.types";

export const conclusion: ConclusionSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "A memory-reference ADD is four register transfers: fetch the address, read the instruction, take the operand address, then add the operand into the accumulator.",
    "The interrupt and I/O path is another box on that same computer.",
  ],
};
