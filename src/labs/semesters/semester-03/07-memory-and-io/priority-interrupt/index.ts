import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const priorityInterruptExperiment: ExperimentDefinition = {
  id: "priority-interrupt",
  title: "Priority Interrupt",
  description: "Grant the interrupt to D2 when D1 and D2 request together.",
  labType: "text",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const PriorityInterruptCircuit = buildCircuit(
  priorityInterruptExperiment,
);
export const PriorityInterruptContent = buildLabContent(
  priorityInterruptExperiment,
);
