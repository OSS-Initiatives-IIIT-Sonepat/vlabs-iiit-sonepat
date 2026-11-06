import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const registersCountersTheoryExperiment: ExperimentDefinition = {
  id: "registers-counters-theory",
  title: "Registers and Counters — Theory",
  description:
    "Build registers and counters from flip-flops, and step a shift register and a binary counter on a clock.",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const RegistersCountersTheoryCircuit = buildCircuit(
  registersCountersTheoryExperiment,
);
export const RegistersCountersTheoryContent = buildLabContent(
  registersCountersTheoryExperiment,
);
