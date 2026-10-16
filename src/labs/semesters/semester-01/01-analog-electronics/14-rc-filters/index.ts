import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { procedureSteps } from "./04-procedure";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";

export const rcFiltersExperiment: ExperimentDefinition = {
  id: "rc-filters",
  title: "RC Low-Pass and High-Pass Filters",
  description:
    "Frequency response of first-order RC low-pass and high-pass filters (R = 1 kΩ, C = 0.1 µF): sweep the input from 100 Hz to 20 kHz, measure gain and phase on the CRO, and verify the cut-off frequency fc = 1 / (2πRC) ≈ 1.59 kHz.",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const RcFiltersCircuit = buildCircuit(rcFiltersExperiment);
export const RcFiltersContent = buildLabContent(rcFiltersExperiment);
