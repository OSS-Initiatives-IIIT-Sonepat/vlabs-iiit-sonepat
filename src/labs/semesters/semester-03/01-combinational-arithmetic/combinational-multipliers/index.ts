import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const combinationalMultipliersExperiment: ExperimentDefinition = {
  id: "combinational-multipliers",
  title: "Combinational Array Multiplier",
  description:
    "Multiply two unsigned numbers with an array of AND gates for the partial products and adder rows to sum them.",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const CombinationalMultipliersCircuit = buildCircuit(
  combinationalMultipliersExperiment,
);
export const CombinationalMultipliersContent = buildLabContent(
  combinationalMultipliersExperiment,
);
