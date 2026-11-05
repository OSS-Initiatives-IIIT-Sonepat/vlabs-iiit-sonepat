import { type ConclusionSection } from "@/labs/lab-content.types";

export const conclusion: ConclusionSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
  "A register read is a multiplexer. The select is the register address.",
  "A memory stack is a counter used as a pointer. Immediate, register, and indexed addressing differ in where the operand lives."
],
};
