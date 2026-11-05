import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const adderSubtractorExperiment: ExperimentDefinition = {
  id: "adder-subtractor",
  title: "4-bit Binary Adder-Subtractor",
  description:
    "M = 0 adds 1010 and 0011. M = 1 subtracts them, because B ⊕ 1 = B' and C0 = 1.",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const AdderSubtractorCircuit = buildCircuit(adderSubtractorExperiment);
export const AdderSubtractorContent = buildLabContent(
  adderSubtractorExperiment,
);
