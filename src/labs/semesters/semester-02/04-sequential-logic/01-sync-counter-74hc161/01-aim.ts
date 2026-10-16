import { type ExperimentDefinition } from "@/labs/experiments/types";

type Section = ExperimentDefinition["sections"][number];

export const aim: Section = {
  id: "aim",
  type: "text",
  title: "Aim",
  paragraphs: [
    "To study the 74HC161 4-bit synchronous binary counter, to verify its MOD-16 count sequence and its asynchronous clear and ripple-carry output, and to convert it into a MOD-10 (decade) counter using its synchronous parallel load.",
  ],
};
