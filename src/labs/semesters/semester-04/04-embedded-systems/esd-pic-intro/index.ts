import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const esdPicIntroExperiment: ExperimentDefinition = {
  id: "esd-pic-intro",
  title: "Introduction to the PIC18F4550",
  description:
    "Build the PIC18F4550's minimal system on a breadboard (supply, decoupling and MCLR), learn its ports, and blink a first LED.",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const EsdPicIntroCircuit = buildCircuit(esdPicIntroExperiment);
export const EsdPicIntroContent = buildLabContent(esdPicIntroExperiment);
