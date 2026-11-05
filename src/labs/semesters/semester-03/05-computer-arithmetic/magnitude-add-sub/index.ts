import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const magnitudeAddSubExperiment: ExperimentDefinition = {
  id: "magnitude-add-sub",
  title: "Addition and Subtraction",
  description:
    "Follow the signed-magnitude flowchart for +5 minus +7, then the overflow case of addition.",
  labType: "text",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const MagnitudeAddSubCircuit = buildCircuit(magnitudeAddSubExperiment);
export const MagnitudeAddSubContent = buildLabContent(
  magnitudeAddSubExperiment,
);
