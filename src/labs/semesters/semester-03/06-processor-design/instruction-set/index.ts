import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const instructionSetExperiment: ExperimentDefinition = {
  id: "instruction-set",
  title: "Instruction Codes and Classes",
  description:
    "Split a 16-bit instruction into memory-reference, register-reference, and I/O.",
  labType: "text",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const InstructionSetCircuit = buildCircuit(instructionSetExperiment);
export const InstructionSetContent = buildLabContent(instructionSetExperiment);
