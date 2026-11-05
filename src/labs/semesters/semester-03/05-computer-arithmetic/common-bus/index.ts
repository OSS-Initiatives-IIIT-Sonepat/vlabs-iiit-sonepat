import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const commonBusExperiment: ExperimentDefinition = {
  id: "common-bus",
  title: "Common Bus System for 4 Registers",
  description: "Build a 4-line common bus with four 4×1 multiplexers and select A, B, C, or D onto it with S1 and S0.",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const CommonBusCircuit = buildCircuit(commonBusExperiment);
export const CommonBusContent = buildLabContent(commonBusExperiment);
