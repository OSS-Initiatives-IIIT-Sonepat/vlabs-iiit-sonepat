import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const ioInterruptExperiment: ExperimentDefinition = {
  id: "io-and-interrupt",
  title: "Input-Output and Interrupt of a Computer",
  description:
    "Move a character through INPR and OUTR, then save PC at location 0 and enter the interrupt service program at location 1.",
  labType: "text",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const IoInterruptCircuit = buildCircuit(ioInterruptExperiment);
export const IoInterruptContent = buildLabContent(ioInterruptExperiment);
