import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const esd8051BinaryCounterExperiment: ExperimentDefinition = {
  id: "esd-8051-binary-counter",
  title: "Binary Counter using 8051",
  description:
    "Count in binary on four LEDs driven from P1.0 to P1.3 of an 8051, with a programmable stop value.",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const Esd8051BinaryCounterCircuit = buildCircuit(esd8051BinaryCounterExperiment);
export const Esd8051BinaryCounterContent = buildLabContent(esd8051BinaryCounterExperiment);
