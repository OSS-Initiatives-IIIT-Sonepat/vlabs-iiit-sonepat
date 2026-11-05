import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const registerTransferExperiment: ExperimentDefinition = {
  id: "register-transfer",
  title: "Register Transfer Language",
  description:
    "Copy 1101 from R1 into R2 when P is 1, on the clock edge, and read that copy as P : R2 ← R1.",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const RegisterTransferCircuit = buildCircuit(registerTransferExperiment);
export const RegisterTransferContent = buildLabContent(
  registerTransferExperiment,
);
