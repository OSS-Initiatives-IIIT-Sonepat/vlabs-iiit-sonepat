import { type ExperimentDefinition } from "@/labs/experiments/types";

type Section = ExperimentDefinition["sections"][number];

export const aim: Section = {
  id: "aim",
  type: "text",
  title: "Aim",
  paragraphs: [
    "To construct the inverting and the non-inverting amplifier circuits using the LM741 operational amplifier, to observe the phase relationship between the input and output signals of each circuit, and to verify experimentally that the closed-loop voltage gain follows the theoretical expressions Av = −Rf / Rin for the inverting amplifier and Av = 1 + Rf / R1 for the non-inverting amplifier.",
  ],
};
