import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { components } from "./components";
import { conclusion } from "./06-conclusion";
import { observations } from "./05-observations";
import { procedureSteps } from "./04-procedure";

export const pnJunctionDiodeExperiment: ExperimentDefinition = {
  id: "02-pn-junction-diode",
  title: "V-I Characteristics of P-N Junction Diode",
  description:
    "Study the forward and reverse V-I characteristics of a P-N junction diode and determine its knee (cut-in) voltage.",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const PnJunctionDiodeCircuit = buildCircuit(pnJunctionDiodeExperiment);
export const PnJunctionDiodeContent = buildLabContent(
  pnJunctionDiodeExperiment,
);
