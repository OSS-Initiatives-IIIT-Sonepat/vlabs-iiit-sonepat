import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const exp12Decoder2to4Experiment: ExperimentDefinition = {
  id: "12-decoder-2to4",
  title: "2-to-4 Line Decoder",
  description:
    "Designs a 2-to-4 line decoder with logic gates. Each of the four outputs goes high for exactly one combination of the two address inputs A1 and A0.",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
  truthTable: {
    inputs: ["A1", "A0"],
    outputs: ["Y0", "Y1", "Y2", "Y3"],
    rows: [
      { inputs: { A1: 0, A0: 0 }, outputs: { Y0: 1, Y1: 0, Y2: 0, Y3: 0 } },
      { inputs: { A1: 0, A0: 1 }, outputs: { Y0: 0, Y1: 1, Y2: 0, Y3: 0 } },
      { inputs: { A1: 1, A0: 0 }, outputs: { Y0: 0, Y1: 0, Y2: 1, Y3: 0 } },
      { inputs: { A1: 1, A0: 1 }, outputs: { Y0: 0, Y1: 0, Y2: 0, Y3: 1 } },
    ],
  },
};

export const Exp12Decoder2to4Circuit = buildCircuit(exp12Decoder2to4Experiment);
export const Exp12Decoder2to4Content = buildLabContent(
  exp12Decoder2to4Experiment,
);
