import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const asyncTransferExperiment: ExperimentDefinition = {
  id: "async-transfer",
  title: "Asynchronous Data Transfer",
  description: "Deliver 0101 with a strobe, then with a two-wire handshake.",
  labType: "text",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const AsyncTransferCircuit = buildCircuit(asyncTransferExperiment);
export const AsyncTransferContent = buildLabContent(asyncTransferExperiment);
