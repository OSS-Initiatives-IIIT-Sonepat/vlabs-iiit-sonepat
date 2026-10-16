import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { procedureSteps } from "./04-procedure";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";

const INPUTS = ["I7", "I6", "I5", "I4", "I3", "I2", "I1", "I0"];

/** Truth-table row with input `n` LOW (active) and every other input HIGH. */
function singleActive(n: number | null) {
  const inputs = Object.fromEntries(INPUTS.map((name, i) => [name, 7 - i === n ? 0 : 1]));
  if (n === null) return { inputs, outputs: { A2: 1, A1: 1, A0: 1, GS: 1, EO: 0 } };
  return {
    inputs,
    outputs: { A2: 1 - ((n >> 2) & 1), A1: 1 - ((n >> 1) & 1), A0: 1 - (n & 1), GS: 0, EO: 1 },
  };
}

export const priorityEncoder8to3IcExperiment: ExperimentDefinition = {
  id: "priority-encoder-8to3-ic",
  title: "8-to-3 Priority Encoder using 74HC148",
  description:
    "The 74HC148 encodes the highest-numbered active input of eight into a 3-bit code. All inputs and outputs are active LOW; GS' flags a valid input, EO' flags 'enabled but idle', and EI' enables the chip for cascading.",
  truthTable: {
    inputs: INPUTS,
    outputs: ["A2", "A1", "A0", "GS", "EO"],
    rows: [singleActive(null), ...[0, 1, 2, 3, 4, 5, 6, 7].map(singleActive)],
  },
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const PriorityEncoder8to3IcCircuit = buildCircuit(priorityEncoder8to3IcExperiment);
export const PriorityEncoder8to3IcContent = buildLabContent(priorityEncoder8to3IcExperiment);
