import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const instructionPipeExperiment: ExperimentDefinition = {
  id: "instruction-pipe",
  title: "Instruction Pipeline",
  description: "Step FI, DA, FO, and EX, and empty the pipe on a branch or interrupt.",
  labType: "text",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const InstructionPipeCircuit = buildCircuit(instructionPipeExperiment);
export const InstructionPipeContent = buildLabContent(instructionPipeExperiment);
