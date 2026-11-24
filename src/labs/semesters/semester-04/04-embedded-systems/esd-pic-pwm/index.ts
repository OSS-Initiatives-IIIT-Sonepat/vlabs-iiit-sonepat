import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const esdPicPwmExperiment: ExperimentDefinition = {
  id: "esd-pic-pwm",
  title: "PWM Generation (PIC18 CCP)",
  description:
    "Generate PWM on RC2 with the PIC18F4550 CCP module and Timer2, and set the LED brightness through the duty cycle.",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const EsdPicPwmCircuit = buildCircuit(esdPicPwmExperiment);
export const EsdPicPwmContent = buildLabContent(esdPicPwmExperiment);
