import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const esd8051DacRampExperiment: ExperimentDefinition = {
  id: "esd-8051-dac-ramp",
  title: "Interface a DAC with 8051 and Generate a Ramp",
  description:
    "Drive a 4-bit R-2R ladder from P1 and step the output through 16 levels, a ramp from 0 V to about 4.7 V.",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const Esd8051DacRampCircuit = buildCircuit(esd8051DacRampExperiment);
export const Esd8051DacRampContent = buildLabContent(esd8051DacRampExperiment);
