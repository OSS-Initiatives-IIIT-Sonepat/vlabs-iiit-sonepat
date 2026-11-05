import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const bcdAdderExperiment: ExperimentDefinition = {
  id: "bcd-adder",
  title: "BCD Adder",
  description: "Add two BCD digits and correct the sum by 6 when it is greater than 9.",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const BcdAdderCircuit = buildCircuit(bcdAdderExperiment);
export const BcdAdderContent = buildLabContent(bcdAdderExperiment);
