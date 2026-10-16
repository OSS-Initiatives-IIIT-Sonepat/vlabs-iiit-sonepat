import { type ExperimentDefinition } from "@/labs/experiments/types";

type Section = ExperimentDefinition["sections"][number];

export const aim: Section = {
  id: "aim",
  type: "text",
  title: "Aim",
  paragraphs: [
    "To verify the operation of the 74HC148 8-to-3 priority encoder, to show that it outputs the binary code of the highest-numbered active input when several inputs are active, and to study its enable input EI' and the status outputs GS' and EO'.",
  ],
};
