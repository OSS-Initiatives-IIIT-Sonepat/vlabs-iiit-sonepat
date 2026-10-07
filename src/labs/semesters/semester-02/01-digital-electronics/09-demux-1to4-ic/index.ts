import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { procedureSteps } from "./04-procedure";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";

export const demultiplexer1to4Experiment: ExperimentDefinition = {
  id: "demultiplexer-1to4",
  title: "1:4 Demultiplexer",
  description:
    "Route one data input D to one of four outputs using the select lines S1 S0 (74HC139, active-LOW outputs).",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
  // 74HC139 outputs are active LOW: the addressed output follows D, the others stay HIGH.
  truthTable: {
    inputs: ["S1", "S0", "D"],
    outputs: ["Y0", "Y1", "Y2", "Y3"],
    rows: [
      { inputs: { S1: 0, S0: 0, D: 0 }, outputs: { Y0: 0, Y1: 1, Y2: 1, Y3: 1 } },
      { inputs: { S1: 0, S0: 0, D: 1 }, outputs: { Y0: 1, Y1: 1, Y2: 1, Y3: 1 } },
      { inputs: { S1: 0, S0: 1, D: 0 }, outputs: { Y0: 1, Y1: 0, Y2: 1, Y3: 1 } },
      { inputs: { S1: 0, S0: 1, D: 1 }, outputs: { Y0: 1, Y1: 1, Y2: 1, Y3: 1 } },
      { inputs: { S1: 1, S0: 0, D: 0 }, outputs: { Y0: 1, Y1: 1, Y2: 0, Y3: 1 } },
      { inputs: { S1: 1, S0: 0, D: 1 }, outputs: { Y0: 1, Y1: 1, Y2: 1, Y3: 1 } },
      { inputs: { S1: 1, S0: 1, D: 0 }, outputs: { Y0: 1, Y1: 1, Y2: 1, Y3: 0 } },
      { inputs: { S1: 1, S0: 1, D: 1 }, outputs: { Y0: 1, Y1: 1, Y2: 1, Y3: 1 } },
    ],
  },
};

export const Demultiplexer1to4Circuit = buildCircuit(demultiplexer1to4Experiment);
export const Demultiplexer1to4Content = buildLabContent(demultiplexer1to4Experiment);
