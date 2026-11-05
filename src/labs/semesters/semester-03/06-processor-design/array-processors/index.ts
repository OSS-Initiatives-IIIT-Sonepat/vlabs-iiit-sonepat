import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const arrayProcessorsExperiment: ExperimentDefinition = {
  id: "array-processors",
  title: "Array Processors",
  description: "Compare an attached array processor with a SIMD array of PE and local memory.",
  labType: "text",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const ArrayProcessorsCircuit = buildCircuit(arrayProcessorsExperiment);
export const ArrayProcessorsContent = buildLabContent(arrayProcessorsExperiment);
