import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { procedureSteps } from "./04-procedure";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";

// No truthTable: the D flip-flop is sequential (edge-triggered), so its output depends
// on the stored state and on the clock edge. The characteristic table is in 05-observations.ts.
export const dFlipFlopExperiment: ExperimentDefinition = {
  id: "d-flip-flop",
  title: "D Flip-Flop",
  description:
    "Verify the positive-edge-triggered D flip-flop (74HC74): Q copies D only on the rising clock edge.",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const DFlipFlopCircuit = buildCircuit(dFlipFlopExperiment);
export const DFlipFlopContent = buildLabContent(dFlipFlopExperiment);
