import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const exp11Encoder4to2Experiment: ExperimentDefinition = {
  id: "11-encoder-4to2",
  title: "4-to-2 Line Encoder",
  description:
    "Designs a 4-to-2 line encoder using two OR gates: Y1 = D2 + D3 and Y0 = D1 + D3. Verifies the truth table on a breadboard with LED outputs.",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
  truthTable: {
    inputs: ["D0", "D1", "D2", "D3"],
    outputs: ["Y1", "Y0"],
    rows: [
      { inputs: { D0: 1, D1: 0, D2: 0, D3: 0 }, outputs: { Y1: 0, Y0: 0 } },
      { inputs: { D0: 0, D1: 1, D2: 0, D3: 0 }, outputs: { Y1: 0, Y0: 1 } },
      { inputs: { D0: 0, D1: 0, D2: 1, D3: 0 }, outputs: { Y1: 1, Y0: 0 } },
      { inputs: { D0: 0, D1: 0, D2: 0, D3: 1 }, outputs: { Y1: 1, Y0: 1 } },
    ],
  },
};

export const Exp11Encoder4to2Circuit = buildCircuit(exp11Encoder4to2Experiment);
export const Exp11Encoder4to2Content = buildLabContent(
  exp11Encoder4to2Experiment,
);
