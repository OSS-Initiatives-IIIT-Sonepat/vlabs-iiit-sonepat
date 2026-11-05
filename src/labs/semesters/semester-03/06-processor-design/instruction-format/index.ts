import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const instructionFormatExperiment: ExperimentDefinition = {
  id: "instruction-format",
  title: "Instruction Format",
  description: "Place X = (A+B)*(C+D) in three-, two-, one-, and zero-address form.",
  labType: "text",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const InstructionFormatCircuit = buildCircuit(instructionFormatExperiment);
export const InstructionFormatContent = buildLabContent(instructionFormatExperiment);
