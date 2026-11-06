import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const signedAdditionExperiment: ExperimentDefinition = {
  id: "signed-addition",
  title: "Signed Addition and Subtraction",
  description:
    "Follow the sign bits, the end carry, and the overflow flag for one signed addition.",
  labType: "text",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const SignedAdditionCircuit = buildCircuit(signedAdditionExperiment);
export const SignedAdditionContent = buildLabContent(signedAdditionExperiment);
