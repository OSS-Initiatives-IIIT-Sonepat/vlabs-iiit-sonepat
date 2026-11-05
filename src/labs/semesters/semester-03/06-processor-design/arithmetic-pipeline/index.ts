import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const arithmeticPipelineExperiment: ExperimentDefinition = {
  id: "arithmetic-pipeline",
  title: "Arithmetic Pipeline",
  description: "Add 0.9504×10³ and 0.8200×10²: compare, align, add, normalize.",
  labType: "text",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const ArithmeticPipelineCircuit = buildCircuit(arithmeticPipelineExperiment);
export const ArithmeticPipelineContent = buildLabContent(arithmeticPipelineExperiment);
