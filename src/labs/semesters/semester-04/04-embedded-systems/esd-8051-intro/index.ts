import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const esd8051IntroExperiment: ExperimentDefinition = {
  id: "esd-8051-intro",
  title: "Introduction to the 8051",
  description:
    "Build the 8051's minimal system on a breadboard (supply, crystal clock and power-on reset), learn what its 40 pins do, and blink a first LED.",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const Esd8051IntroCircuit = buildCircuit(esd8051IntroExperiment);
export const Esd8051IntroContent = buildLabContent(esd8051IntroExperiment);
