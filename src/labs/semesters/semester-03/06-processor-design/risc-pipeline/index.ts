import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const riscPipelineExperiment: ExperimentDefinition = {
  id: "risc-pipeline",
  title: "RISC Pipeline",
  description:
    "Insert a NOP when an add follows two loads in a three-segment RISC pipe.",
  labType: "text",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const RiscPipelineCircuit = buildCircuit(riscPipelineExperiment);
export const RiscPipelineContent = buildLabContent(riscPipelineExperiment);
