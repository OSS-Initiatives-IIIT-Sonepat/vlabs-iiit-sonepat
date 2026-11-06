import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";

export const flipFlopSynthesisExperiment: ExperimentDefinition = {
  id: "flip-flop-synthesis",
  title: "Synthesis of Flip-Flop",
  description:
    "Derive SR and JK characteristic equations, build the excitation table, and wire a JK flip-flop as a D flip-flop.",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const FlipFlopSynthesisCircuit = buildCircuit(
  flipFlopSynthesisExperiment,
);
export const FlipFlopSynthesisContent = buildLabContent(
  flipFlopSynthesisExperiment,
);
