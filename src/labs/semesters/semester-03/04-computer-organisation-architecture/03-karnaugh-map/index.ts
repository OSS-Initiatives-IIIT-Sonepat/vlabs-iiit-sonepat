import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";

export const karnaughMapExperiment: ExperimentDefinition = {
  id: "karnaugh-map",
  title: "Karnaugh Map",
  description:
    "Plot a 4-variable function, group the 1s, and read F = B'C' + CD' + A'BD.",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const KarnaughMapCircuit = buildCircuit(karnaughMapExperiment);
export const KarnaughMapContent = buildLabContent(karnaughMapExperiment);
