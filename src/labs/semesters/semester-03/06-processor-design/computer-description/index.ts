import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const computerDescriptionExperiment: ExperimentDefinition = {
  id: "computer-description",
  title: "Instruction Cycle and the Accumulator",
  description:
    "Fetch ADD from address 100 and watch AR, IR, PC, DR, and AC through T0 to T3.",
  labType: "text",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const ComputerDescriptionCircuit = buildCircuit(computerDescriptionExperiment);
export const ComputerDescriptionContent = buildLabContent(computerDescriptionExperiment);
