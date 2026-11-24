import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const esd8051UpDownCounterExperiment: ExperimentDefinition = {
  id: "esd-8051-up-down-counter",
  title: "Up/Down Counter using 8051",
  description:
    "A 4-bit counter on P1 whose direction is set by a button on P3.2: released counts up, pressed counts down.",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const Esd8051UpDownCounterCircuit = buildCircuit(
  esd8051UpDownCounterExperiment,
);
export const Esd8051UpDownCounterContent = buildLabContent(
  esd8051UpDownCounterExperiment,
);
