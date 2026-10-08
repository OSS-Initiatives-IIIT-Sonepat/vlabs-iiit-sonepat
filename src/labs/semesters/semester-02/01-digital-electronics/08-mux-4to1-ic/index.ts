import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { procedureSteps } from "./04-procedure";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";

export const multiplexer4to1Experiment: ExperimentDefinition = {
  id: "multiplexer-4to1",
  title: "4:1 Multiplexer",
  description:
    "Verify a 4:1 multiplexer (74HC153): the select lines S1 S0 route one of four data inputs to the output Y.",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
  // Data inputs fixed at I0=0, I1=1, I2=1, I3=0  →  Y = S1 XOR S0
  truthTable: {
    inputs: ["S1", "S0"],
    outputs: ["Y"],
    rows: [
      { inputs: { S1: 0, S0: 0 }, outputs: { Y: 0 } },
      { inputs: { S1: 0, S0: 1 }, outputs: { Y: 1 } },
      { inputs: { S1: 1, S0: 0 }, outputs: { Y: 1 } },
      { inputs: { S1: 1, S0: 1 }, outputs: { Y: 0 } },
    ],
  },
};

export const Multiplexer4to1Circuit = buildCircuit(multiplexer4to1Experiment);
export const Multiplexer4to1Content = buildLabContent(
  multiplexer4to1Experiment,
);

export const mux4to1IcExperiment = multiplexer4to1Experiment;
export const Mux4to1IcCircuit = Multiplexer4to1Circuit;
export const Mux4to1IcContent = Multiplexer4to1Content;
