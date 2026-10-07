import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { procedureSteps } from "./04-procedure";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";

export const mod5AsyncUpDownCounterExperiment: ExperimentDefinition = {
  id: "mod5-async-up-down-counter",
  title: "MOD-5 Asynchronous Up/Down Counter",
  description:
    "Builds a MOD-5 ripple counter from D flip-flops with an XOR-selected up/down direction and gate-based reset logic.",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const Mod5AsyncUpDownCounterCircuit = buildCircuit(
  mod5AsyncUpDownCounterExperiment,
);
export const Mod5AsyncUpDownCounterContent = buildLabContent(
  mod5AsyncUpDownCounterExperiment,
);
