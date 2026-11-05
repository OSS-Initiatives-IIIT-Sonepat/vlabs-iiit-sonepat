import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const dmaTransferExperiment: ExperimentDefinition = {
  id: "dma-transfer",
  title: "DMA",
  description: "Transfer three words starting at address 200, then return the bus.",
  labType: "text",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const DmaTransferCircuit = buildCircuit(dmaTransferExperiment);
export const DmaTransferContent = buildLabContent(dmaTransferExperiment);
