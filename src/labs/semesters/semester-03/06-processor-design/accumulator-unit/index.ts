import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const accumulatorUnitExperiment: ExperimentDefinition = {
  id: "accumulator-unit",
  title: "Accumulator Unit",
  description:
    "Add, AND, complement, and shift the same AC, each time starting from 0101.",
  labType: "text",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const AccumulatorUnitCircuit = buildCircuit(accumulatorUnitExperiment);
export const AccumulatorUnitContent = buildLabContent(
  accumulatorUnitExperiment,
);
