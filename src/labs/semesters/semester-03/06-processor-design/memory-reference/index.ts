import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const memoryReferenceExperiment: ExperimentDefinition = {
  id: "memory-reference",
  title: "Memory Reference Instructions",
  description:
    "Execute AND, ADD, LDA, STA, BUN, BSA, and ISZ, and follow a BSA call that saves the return address.",
  labType: "text",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const MemoryReferenceCircuit = buildCircuit(memoryReferenceExperiment);
export const MemoryReferenceContent = buildLabContent(
  memoryReferenceExperiment,
);
