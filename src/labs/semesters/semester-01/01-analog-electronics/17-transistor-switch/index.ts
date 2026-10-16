import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { procedureSteps } from "./04-procedure";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";

export const transistorSwitchExperiment: ExperimentDefinition = {
  id: "transistor-switch",
  title: "Transistor as a Switch",
  description:
    "A BC547 NPN transistor switching an LED load from +5 V: measure VBE and VCE in cut-off (input LOW) and saturation (input HIGH), and see how too large a base resistor leaves the transistor in the active region.",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const TransistorSwitchCircuit = buildCircuit(transistorSwitchExperiment);
export const TransistorSwitchContent = buildLabContent(transistorSwitchExperiment);
