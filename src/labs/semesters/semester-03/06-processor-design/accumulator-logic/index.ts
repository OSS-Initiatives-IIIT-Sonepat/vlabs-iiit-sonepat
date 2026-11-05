import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const accumulatorLogicExperiment: ExperimentDefinition = {
  id: "accumulator-logic",
  title: "Design of Accumulator Logic",
  description:
    "Extract every transfer that changes AC, then build the AND and OR gates that drive LD, INR, and CLR.",
  labType: "text",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const AccumulatorLogicCircuit = buildCircuit(accumulatorLogicExperiment);
export const AccumulatorLogicContent = buildLabContent(accumulatorLogicExperiment);
