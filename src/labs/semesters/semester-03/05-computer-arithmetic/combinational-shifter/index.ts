import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const combinationalShifterExperiment: ExperimentDefinition = {
  id: "combinational-shifter",
  title: "4-bit Combinational Circuit Shifter",
  description:
    "Four multiplexers shift 1101 left or right. The serial inputs choose a logical, circular, or arithmetic shift.",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const CombinationalShifterCircuit = buildCircuit(
  combinationalShifterExperiment,
);
export const CombinationalShifterContent = buildLabContent(
  combinationalShifterExperiment,
);
