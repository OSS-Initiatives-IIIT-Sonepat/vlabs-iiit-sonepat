import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const esdPicTimer0Experiment: ExperimentDefinition = {
  id: "esd-pic-timer0",
  title: "On-Chip Timers and Counters (Timer0, PIC18)",
  description:
    "Use Timer0 with a 1:64 prescaler and an overflow interrupt to toggle an LED every 0.5 s.",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const EsdPicTimer0Circuit = buildCircuit(esdPicTimer0Experiment);
export const EsdPicTimer0Content = buildLabContent(esdPicTimer0Experiment);
