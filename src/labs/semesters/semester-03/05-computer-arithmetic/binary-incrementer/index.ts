import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const binaryIncrementerExperiment: ExperimentDefinition = {
  id: "binary-incrementer",
  title: "4-bit Binary Incrementer",
  description:
    "Add one to 1101 with four half adders. The sum is 1110, and C4 is 0.",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const BinaryIncrementerCircuit = buildCircuit(
  binaryIncrementerExperiment,
);
export const BinaryIncrementerContent = buildLabContent(
  binaryIncrementerExperiment,
);
