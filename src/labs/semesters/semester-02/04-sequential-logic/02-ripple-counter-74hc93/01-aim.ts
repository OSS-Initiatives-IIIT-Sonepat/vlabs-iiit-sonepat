import { type ExperimentDefinition } from "@/labs/experiments/types";

type Section = ExperimentDefinition["sections"][number];

export const aim: Section = {
  id: "aim",
  type: "text",
  title: "Aim",
  paragraphs: [
    "To study the 74HC93 4-bit asynchronous (ripple) counter, to verify its divide-by-2 and MOD-16 operation, and to convert it into a MOD-10 (decade) counter using its reset inputs.",
  ],
};
