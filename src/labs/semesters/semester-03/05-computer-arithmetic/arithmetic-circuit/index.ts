import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const arithmeticCircuitExperiment: ExperimentDefinition = {
  id: "arithmetic-circuit",
  title: "4-bit Arithmetic Circuit",
  description:
    "One adder does eight operations. Y is B, B', 0, or 1, and D = A + Y + Cin. Decrement of 1101 is 1100.",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const ArithmeticCircuitCircuit = buildCircuit(
  arithmeticCircuitExperiment,
);
export const ArithmeticCircuitContent = buildLabContent(
  arithmeticCircuitExperiment,
);
