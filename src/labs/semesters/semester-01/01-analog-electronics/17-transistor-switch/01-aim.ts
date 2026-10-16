import { type ExperimentDefinition } from "@/labs/experiments/types";

type Section = ExperimentDefinition["sections"][number];

export const aim: Section = {
  id: "aim",
  type: "text",
  title: "Aim",
  paragraphs: [
    "To use a BC547 NPN transistor as an electronic switch that turns an LED on and off, to measure VBE and VCE in the cut-off and saturation states, and to show that a base resistor too large for the load current leaves the transistor in the active region instead of saturation.",
  ],
};
