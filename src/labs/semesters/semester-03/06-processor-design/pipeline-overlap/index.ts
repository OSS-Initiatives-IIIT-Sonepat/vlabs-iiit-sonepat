import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const pipelineOverlapExperiment: ExperimentDefinition = {
  id: "pipeline-overlap",
  title: "Pipelining",
  description:
    "Overlap instructions in a four-segment pipeline. Speedup approaches 4.",
  labType: "text",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const PipelineOverlapCircuit = buildCircuit(pipelineOverlapExperiment);
export const PipelineOverlapContent = buildLabContent(
  pipelineOverlapExperiment,
);
