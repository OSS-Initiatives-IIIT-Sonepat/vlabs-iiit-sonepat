import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const busTransferExperiment: ExperimentDefinition = {
  id: "bus-transfer",
  title: "Bus and Shifts",
  description: "Select one register onto a shared bus, then read the three shifts and a normalised mantissa.",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const BusTransferCircuit = buildCircuit(busTransferExperiment);
export const BusTransferContent = buildLabContent(busTransferExperiment);
