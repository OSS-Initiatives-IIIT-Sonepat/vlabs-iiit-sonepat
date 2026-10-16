import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { procedureSteps } from "./04-procedure";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";

const OUTPUTS = ["Y0", "Y1", "Y2", "Y3", "Y4", "Y5", "Y6", "Y7"];

export const decoder3to8IcExperiment: ExperimentDefinition = {
  id: "decoder-3to8-ic",
  title: "3-to-8 Line Decoder using 74HC138",
  description:
    "The 74HC138 decodes a 3-bit address A2 A1 A0 into one of eight active-LOW outputs. LEDs wired as current sinks show the selected output, and the three enable inputs switch the whole decoder on or off.",
  truthTable: {
    inputs: ["A2", "A1", "A0"],
    outputs: OUTPUTS,
    rows: Array.from({ length: 8 }, (_, n) => ({
      inputs: { A2: (n >> 2) & 1, A1: (n >> 1) & 1, A0: n & 1 },
      outputs: Object.fromEntries(OUTPUTS.map((o, i) => [o, i === n ? 0 : 1])),
    })),
  },
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const Decoder3to8IcCircuit = buildCircuit(decoder3to8IcExperiment);
export const Decoder3to8IcContent = buildLabContent(decoder3to8IcExperiment);
