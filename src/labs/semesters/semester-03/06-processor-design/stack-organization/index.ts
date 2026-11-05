import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const stackOrganizationExperiment: ExperimentDefinition = {
  id: "stack-organization",
  title: "Stack Organization",
  description: "Push on a 64-word register stack (SP + 1) and on a memory stack (SP − 1).",
  labType: "text",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const StackOrganizationCircuit = buildCircuit(stackOrganizationExperiment);
export const StackOrganizationContent = buildLabContent(stackOrganizationExperiment);
