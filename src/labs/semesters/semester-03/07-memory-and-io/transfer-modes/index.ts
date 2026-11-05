import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const transferModesExperiment: ExperimentDefinition = {
  id: "transfer-modes",
  title: "Modes of Transfer",
  description: "Choose programmed I/O, interrupt-initiated I/O, or DMA for one byte.",
  labType: "text",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const TransferModesCircuit = buildCircuit(transferModesExperiment);
export const TransferModesContent = buildLabContent(transferModesExperiment);
