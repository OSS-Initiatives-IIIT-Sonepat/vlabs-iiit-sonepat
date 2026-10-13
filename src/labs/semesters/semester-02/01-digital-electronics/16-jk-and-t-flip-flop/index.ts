import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";

export const jkAndTFlipFlopExperiment: ExperimentDefinition = {
  id: "jk-and-t-flip-flop",
  title: "Construction of JK and T Flip-Flop",
  description:
    "Construct and verify a JK flip-flop and a T flip-flop, including the implementation of a T flip-flop from a JK flip-flop.",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
  truthTable: {
    inputs: ["J", "K"],
    outputs: ["Q"],
    rows: [
      { inputs: { J: 0, K: 0 }, outputs: { Q: 0 } },
      { inputs: { J: 0, K: 1 }, outputs: { Q: 0 } },
      { inputs: { J: 1, K: 0 }, outputs: { Q: 1 } },
      { inputs: { J: 1, K: 1 }, outputs: { Q: 1 } },
    ],
  },
};

export const JkAndTFlipFlopCircuit = buildCircuit(jkAndTFlipFlopExperiment);
export const JkAndTFlipFlopContent = buildLabContent(jkAndTFlipFlopExperiment);
