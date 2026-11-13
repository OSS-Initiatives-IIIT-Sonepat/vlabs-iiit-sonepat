import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const arduinoBlinkExperiment: ExperimentDefinition = {
  id: "arduino-blink",
  title: "Blink an LED with Arduino",
  description:
    "Drive an LED from digital pin 13 of an Arduino Uno. Set the pin HIGH and LOW from a sketch and watch the LED switch.",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const ArduinoBlinkCircuit = buildCircuit(arduinoBlinkExperiment);
export const ArduinoBlinkContent = buildLabContent(arduinoBlinkExperiment);
