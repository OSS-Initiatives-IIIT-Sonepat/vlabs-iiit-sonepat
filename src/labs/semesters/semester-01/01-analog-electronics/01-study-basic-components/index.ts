import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { procedureSteps } from "./04-procedure";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";

export const exp01StudyBasicComponentsExperiment: ExperimentDefinition = {
  id: "study-basic-components",
  title: "Study of Basic Electronic Equipment and Components",
  description:
    "Get familiar with the CRO, multimeter, function generator, regulated power supply, bread board, and active and passive components.",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const Exp01StudyBasicComponentsCircuit = buildCircuit(
  exp01StudyBasicComponentsExperiment,
);
export const Exp01StudyBasicComponentsContent = buildLabContent(
  exp01StudyBasicComponentsExperiment,
);
