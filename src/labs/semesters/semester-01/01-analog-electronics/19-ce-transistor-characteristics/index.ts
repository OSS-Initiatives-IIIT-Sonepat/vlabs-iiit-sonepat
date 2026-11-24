import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { procedureSteps } from "./04-procedure";
import { observationsInput, observationsOutput } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";

export const ceTransistorCharacteristicsExperiment: ExperimentDefinition = {
  id: "ce-transistor-characteristics",
  title: "Input and Output Characteristics of a Transistor in CE Configuration",
  description:
    "Input (IB vs VBE) and output (IC vs VCE) characteristics of a BC547 in common emitter. " +
    "Finds ri, ro and β.",
  components,
  sections: [
    aim,
    theory,
    apparatus,
    observationsInput,
    observationsOutput,
    conclusion,
  ],
  procedureSteps,
};

export const CeTransistorCharacteristicsCircuit = buildCircuit(
  ceTransistorCharacteristicsExperiment,
);
export const CeTransistorCharacteristicsContent = buildLabContent(
  ceTransistorCharacteristicsExperiment,
);
