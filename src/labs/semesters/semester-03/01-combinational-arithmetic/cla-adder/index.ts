import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const claAdderExperiment: ExperimentDefinition = {
  id: "cla-adder",
  title: "Carry-Look-Ahead Adder (CLA)",
  description:
    "Compute every carry in parallel from generate and propagate signals, instead of waiting for a ripple chain.",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const ClaAdderCircuit = buildCircuit(claAdderExperiment);
export const ClaAdderContent = buildLabContent(claAdderExperiment);
