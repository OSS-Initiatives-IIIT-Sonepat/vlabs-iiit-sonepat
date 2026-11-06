import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const programControlExperiment: ExperimentDefinition = {
  id: "program-control",
  title: "Program Control",
  description: "Take a branch because the zero flag is 1.",
  labType: "text",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const ProgramControlCircuit = buildCircuit(programControlExperiment);
export const ProgramControlContent = buildLabContent(programControlExperiment);
