import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { procedureSteps } from "./04-procedure";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";

export const transformerOcScExperiment: ExperimentDefinition = {
  id: "transformer-oc-sc",
  title: "Open-Circuit and Short-Circuit Tests on a Single-Phase Transformer",
  description:
    "A 230/115 V, 230 VA transformer. The open-circuit test finds R0 and X0. " +
    "The short-circuit test finds R01 and X01.",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const TransformerOcScCircuit = buildCircuit(transformerOcScExperiment);
export const TransformerOcScContent = buildLabContent(
  transformerOcScExperiment,
);
