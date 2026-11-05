import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const completeComputerDescriptionExperiment: ExperimentDefinition = {
  id: "complete-computer-description",
  title: "Complete Computer Description",
  description:
    "Follow one cycle of the basic computer: start, the R test, fetch or interrupt, then D7 and I, and the return to R.",
  labType: "text",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const CompleteComputerDescriptionCircuit = buildCircuit(
  completeComputerDescriptionExperiment,
);
export const CompleteComputerDescriptionContent = buildLabContent(
  completeComputerDescriptionExperiment,
);
