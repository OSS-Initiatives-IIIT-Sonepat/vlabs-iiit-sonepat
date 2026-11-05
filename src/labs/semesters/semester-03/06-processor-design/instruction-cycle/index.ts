import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const instructionCycleExperiment: ExperimentDefinition = {
  id: "instruction-cycle",
  title: "Instruction Cycle",
  description:
    "Fetch an instruction into IR, decode it, then follow D7 and I through register, input-output, direct, and indirect execute.",
  labType: "text",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const InstructionCycleCircuit = buildCircuit(instructionCycleExperiment);
export const InstructionCycleContent = buildLabContent(instructionCycleExperiment);
