import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { procedureSteps } from "./04-procedure";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";

export const syncCounter74hc161Experiment: ExperimentDefinition = {
  id: "sync-counter-74hc161",
  title: "Synchronous Counter using 74HC161 (MOD-16 and MOD-10)",
  description:
    "The 74HC161 4-bit synchronous counter clocked at 1 Hz: verify the MOD-16 sequence, the ripple-carry output and the asynchronous clear, then make a decade counter with a NAND gate driving the synchronous load input.",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const SyncCounter74hc161Circuit = buildCircuit(syncCounter74hc161Experiment);
export const SyncCounter74hc161Content = buildLabContent(syncCounter74hc161Experiment);
