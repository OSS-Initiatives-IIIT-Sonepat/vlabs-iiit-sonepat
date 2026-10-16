import { type ExperimentDefinition } from "@/labs/experiments/types";

type Section = ExperimentDefinition["sections"][number];

export const aim: Section = {
  id: "aim",
  type: "text",
  title: "Aim",
  paragraphs: [
    "To verify the truth table of the 74HC138 3-to-8 line decoder, to observe its active-LOW outputs with LED indicators, and to study the effect of its three enable inputs.",
  ],
};
