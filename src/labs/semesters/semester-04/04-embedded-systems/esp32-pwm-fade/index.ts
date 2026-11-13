import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const esp32PwmFadeExperiment: ExperimentDefinition = {
  id: "esp32-pwm-fade",
  title: "PWM Fade with ESP32 (LEDC)",
  description:
    "Generate PWM on GPIO5 with the ESP32 LEDC peripheral and set the LED brightness at 25, 50 and 100 % duty.",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const Esp32PwmFadeCircuit = buildCircuit(esp32PwmFadeExperiment);
export const Esp32PwmFadeContent = buildLabContent(esp32PwmFadeExperiment);
