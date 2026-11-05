import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const binaryAdder4Experiment: ExperimentDefinition = {
  id: "binary-adder-4",
  title: "4-bit Binary Adder",
  description:
    "Add 1101 and 0111 with four full adders. C0 is 0, and the sum is 10100.",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const BinaryAdder4Circuit = buildCircuit(binaryAdder4Experiment);
export const BinaryAdder4Content = buildLabContent(binaryAdder4Experiment);
