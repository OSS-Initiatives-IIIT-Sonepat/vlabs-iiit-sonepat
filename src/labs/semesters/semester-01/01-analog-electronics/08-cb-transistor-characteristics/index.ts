import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { procedureSteps } from "./04-procedure";
import { observationsInput, observationsOutput } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";

export const cbTransistorCharacteristicsExperiment: ExperimentDefinition = {
  id: "cb-transistor-characteristics",
  title: "Input and Output Characteristics of a Transistor in CB Configuration",
  description:
    "Plot the input (IE vs VEB) and output (IC vs VCB) characteristics of a BC547 NPN transistor in common-base configuration and find its input resistance, output resistance and current gain.",
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

export const CbTransistorCharacteristicsCircuit = buildCircuit(
  cbTransistorCharacteristicsExperiment,
);
export const CbTransistorCharacteristicsContent = buildLabContent(
  cbTransistorCharacteristicsExperiment,
);
