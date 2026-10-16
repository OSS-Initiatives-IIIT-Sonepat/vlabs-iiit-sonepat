import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { procedureSteps } from "./04-procedure";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";

export const seriesRlcResonanceExperiment: ExperimentDefinition = {
  id: "series-rlc-resonance",
  title: "Series RLC Resonance",
  description:
    "Frequency response of a series RLC circuit (L = 10 mH, C = 0.1 µF, R = 100 Ω): find the resonant frequency f0 ≈ 5.03 kHz, the half-power frequencies, bandwidth and quality factor Q, and observe voltage magnification across C.",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const SeriesRlcResonanceCircuit = buildCircuit(seriesRlcResonanceExperiment);
export const SeriesRlcResonanceContent = buildLabContent(seriesRlcResonanceExperiment);
