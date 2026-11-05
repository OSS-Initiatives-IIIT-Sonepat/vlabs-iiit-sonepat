import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const assemblerSecondPassExperiment: ExperimentDefinition = {
  id: "assembler-second-pass",
  title: "Second Pass of an Assembler",
  description:
    "Scan ORG, LDA, ADD, a subroutine call, a loop branch, INP, and END, and record the word stored at each LC.",
  labType: "text",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const AssemblerSecondPassCircuit = buildCircuit(assemblerSecondPassExperiment);
export const AssemblerSecondPassContent = buildLabContent(assemblerSecondPassExperiment);
