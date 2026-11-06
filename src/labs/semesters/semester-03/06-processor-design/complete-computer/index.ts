import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const completeComputerExperiment: ExperimentDefinition = {
  id: "complete-computer",
  title: "Complete Computer",
  description:
    "Place memory, the common bus, the registers, INPR, OUTR, and control on one diagram.",
  labType: "text",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const CompleteComputerCircuit = buildCircuit(completeComputerExperiment);
export const CompleteComputerContent = buildLabContent(
  completeComputerExperiment,
);
