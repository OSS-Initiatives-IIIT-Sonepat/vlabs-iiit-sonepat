import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";
import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const instructionPipelineExperiment: ExperimentDefinition = {
  id: "instruction-pipeline",
  title: "Instruction Pipeline",
  description:
    "Watch three instructions occupy IF, ID, EX, and WB, then read a branch, a float add, and Flynn's classes.",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};
export const InstructionPipelineCircuit = buildCircuit(
  instructionPipelineExperiment,
);
export const InstructionPipelineContent = buildLabContent(
  instructionPipelineExperiment,
);
