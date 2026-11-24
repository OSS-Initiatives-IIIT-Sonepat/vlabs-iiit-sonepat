import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { procedureSteps } from "./04-procedure";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";

export const maximumPowerTransferExperiment: ExperimentDefinition = {
  id: "maximum-power-transfer",
  title: "Maximum Power Transfer Theorem",
  description:
    "A 9 V source with Rs = 100 Ω feeds 47 Ω, 100 Ω and 220 Ω loads. " +
    "Load power is greatest when RL equals Rs.",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const MaximumPowerTransferCircuit = buildCircuit(
  maximumPowerTransferExperiment,
);
export const MaximumPowerTransferContent = buildLabContent(
  maximumPowerTransferExperiment,
);
