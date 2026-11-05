import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const representationAndAlsuExperiment: ExperimentDefinition = {
  id: "representation-and-alsu",
  title: "Data Types and the ALSU",
  description:
    "Write 6 as a magnitude, a complement, and a floating-point word, then add, xor, and shift it in one unit.",
  labType: "text",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const RepresentationAndAlsuCircuit = buildCircuit(
  representationAndAlsuExperiment,
);
export const RepresentationAndAlsuContent = buildLabContent(
  representationAndAlsuExperiment,
);
