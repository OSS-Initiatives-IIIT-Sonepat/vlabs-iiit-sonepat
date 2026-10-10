import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";

export const fullWaveRectifierExperiment: ExperimentDefinition = {
  id: "full-wave-rectifier",
  title: "Center-Tapped Full-Wave Rectifier",
  description:
    "A center-tapped full-wave rectifier using a center-tapped step-down transformer and two diodes conducting on alternate half-cycles, with a load resistor and capacitor filter.",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const FullWaveRectifierCircuit = buildCircuit(
  fullWaveRectifierExperiment,
);
export const FullWaveRectifierContent = buildLabContent(
  fullWaveRectifierExperiment,
);
