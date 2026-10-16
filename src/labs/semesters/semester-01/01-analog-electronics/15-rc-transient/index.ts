import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { procedureSteps } from "./04-procedure";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";

export const rcTransientExperiment: ExperimentDefinition = {
  id: "rc-transient",
  title: "RC Charging Transient and Time Constant",
  description:
    "Charging and discharging of a capacitor through a resistor with a 0–5 V square-wave input: measure the time constant τ on the CRO from the 63.2% and 36.8% points and verify τ = RC for R = 10 kΩ and 4.7 kΩ with C = 0.1 µF.",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const RcTransientCircuit = buildCircuit(rcTransientExperiment);
export const RcTransientContent = buildLabContent(rcTransientExperiment);
