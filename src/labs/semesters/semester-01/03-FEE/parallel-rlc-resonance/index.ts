import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { procedureSteps } from "./04-procedure";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";

export const parallelRlcResonanceExperiment: ExperimentDefinition = {
  id: "parallel-rlc-resonance",
  title: "Parallel RLC Resonance",
  description:
    "R, L and C in parallel across a 2 V source. The line current is a minimum at f0. " +
    "Q is found for two resistors and two capacitors.",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const ParallelRlcResonanceCircuit = buildCircuit(
  parallelRlcResonanceExperiment,
);
export const ParallelRlcResonanceContent = buildLabContent(
  parallelRlcResonanceExperiment,
);
