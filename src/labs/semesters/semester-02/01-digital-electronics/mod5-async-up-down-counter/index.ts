import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { procedureSteps } from "./04-procedure";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";

// Text lab: flip-flops (jk-ff / dff) have no 3D mesh in LabScene yet,
// so this experiment uses the sidebar-only (labType: 'text') layout.
export const mod5AsyncUpDownCounterExperiment: ExperimentDefinition = {
  id: "mod5-async-up-down-counter",
  title: "MOD-5 Asynchronous UP and DOWN Counters",
  description:
    "Design and verify a MOD-5 asynchronous UP counter and a MOD-5 asynchronous DOWN counter using JK flip-flops and NAND gates.",
  labType: "text",
  components: [],
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const Mod5AsyncUpDownCounterCircuit = buildCircuit(
  mod5AsyncUpDownCounterExperiment,
);
export const Mod5AsyncUpDownCounterContent = buildLabContent(
  mod5AsyncUpDownCounterExperiment,
);
