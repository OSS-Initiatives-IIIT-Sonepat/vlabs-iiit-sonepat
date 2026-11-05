import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const vectorProcessingExperiment: ExperimentDefinition = {
  id: "vector-processing",
  title: "Vector Processing",
  description: "Count the 27 multiply-adds in a 3×3 matrix product.",
  labType: "text",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const VectorProcessingCircuit = buildCircuit(vectorProcessingExperiment);
export const VectorProcessingContent = buildLabContent(vectorProcessingExperiment);
