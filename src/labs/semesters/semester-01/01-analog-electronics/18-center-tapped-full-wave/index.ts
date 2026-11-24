import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { procedureSteps } from "./04-procedure";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";

export const centerTappedFullWaveExperiment: ExperimentDefinition = {
  id: "center-tapped-full-wave",
  title: "Centre-Tapped Full-Wave Rectifier",
  description:
    "A 12-0-12 V secondary, two 1N4007 diodes and a 1 kΩ load. " +
    "Vdc is measured with and without a 100 µF filter.",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const CenterTappedFullWaveCircuit = buildCircuit(
  centerTappedFullWaveExperiment,
);
export const CenterTappedFullWaveContent = buildLabContent(
  centerTappedFullWaveExperiment,
);
