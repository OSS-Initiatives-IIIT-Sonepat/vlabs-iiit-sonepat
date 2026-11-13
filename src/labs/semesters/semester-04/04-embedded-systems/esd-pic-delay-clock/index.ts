import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const esdPicDelayClockExperiment: ExperimentDefinition = {
  id: "esd-pic-delay-clock",
  title: "Delay Generation and the Effect of CPU Clock (PIC18)",
  description:
    "Generate a software delay on a PIC18F4550 and show how the internal oscillator frequency changes the blink period of the same program.",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const EsdPicDelayClockCircuit = buildCircuit(esdPicDelayClockExperiment);
export const EsdPicDelayClockContent = buildLabContent(esdPicDelayClockExperiment);
