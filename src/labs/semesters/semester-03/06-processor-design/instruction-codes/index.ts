import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const instructionCodesExperiment: ExperimentDefinition = {
  id: "instruction-codes",
  title: "Instruction Codes",
  description: "Read ADD 1547, a 4096 x 16 stored program, and the direct and indirect paths into the accumulator.",
  labType: "text",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const InstructionCodesCircuit = buildCircuit(instructionCodesExperiment);
export const InstructionCodesContent = buildLabContent(instructionCodesExperiment);
