import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const interruptCycleExperiment: ExperimentDefinition = {
  id: "interrupt-cycle",
  title: "Input-Output and Interrupt",
  description:
    "Raise FGI, save PC at memory 0, and enter the service program at address 1.",
  labType: "text",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const InterruptCycleCircuit = buildCircuit(interruptCycleExperiment);
export const InterruptCycleContent = buildLabContent(interruptCycleExperiment);
