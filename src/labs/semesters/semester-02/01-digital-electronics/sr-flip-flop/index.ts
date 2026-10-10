import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { procedureSteps } from "./04-procedure";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";

// No truthTable: the S-R flip-flop is sequential, so its next state depends on the
// stored state. The characteristic table is in 05-observations.ts instead.
export const srFlipFlopExperiment: ExperimentDefinition = {
  id: "sr-flip-flop",
  title: "S-R Flip-Flop",
  description:
    "Construct an S-R flip-flop from two cross-coupled NOR gates and verify set, reset, hold and invalid states.",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const SrFlipFlopCircuit = buildCircuit(srFlipFlopExperiment);
export const SrFlipFlopContent = buildLabContent(srFlipFlopExperiment);
