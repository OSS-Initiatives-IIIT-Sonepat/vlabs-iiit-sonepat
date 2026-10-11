import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { procedureSteps } from "./04-procedure";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";

export const invertingNonInvertingOpampExperiment: ExperimentDefinition = {
  id: "inverting-non-inverting-opamp",
  title: "Inverting and Non-Inverting Op-Amp Circuits",
  description:
    "Study of the LM741 op-amp as an inverting amplifier (Av = −Rf / Rin) and as a non-inverting amplifier (Av = 1 + Rf / R1): gain measurement and input-output phase relationship.",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const InvertingNonInvertingOpampCircuit = buildCircuit(
  invertingNonInvertingOpampExperiment,
);
export const InvertingNonInvertingOpampContent = buildLabContent(
  invertingNonInvertingOpampExperiment,
);
