import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const subroutineAndIoExperiment: ExperimentDefinition = {
  id: "subroutine-and-io",
  title: "Subroutines and I/O",
  description:
    "Call a subroutine with BSA, return, then wait on SKI and read INP.",
  labType: "text",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const SubroutineAndIoCircuit = buildCircuit(subroutineAndIoExperiment);
export const SubroutineAndIoContent = buildLabContent(
  subroutineAndIoExperiment,
);
