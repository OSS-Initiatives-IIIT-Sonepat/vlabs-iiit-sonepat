import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const generalRegistersExperiment: ExperimentDefinition = {
  id: "general-registers",
  title: "General Register Organization",
  description: "Build the control word SELA, SELB, SELD, OPR for R1 ← R2 + R3.",
  labType: "text",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const GeneralRegistersCircuit = buildCircuit(generalRegistersExperiment);
export const GeneralRegistersContent = buildLabContent(generalRegistersExperiment);
