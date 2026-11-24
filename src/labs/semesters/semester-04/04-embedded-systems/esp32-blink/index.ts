import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const esp32BlinkExperiment: ExperimentDefinition = {
  id: "esp32-blink",
  title: "Blink an LED with ESP32",
  description:
    "Drive an LED from GPIO2 of an ESP32 DevKit at 3.3 V logic, through a 330 ohm resistor, and blink it from a sketch.",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const Esp32BlinkCircuit = buildCircuit(esp32BlinkExperiment);
export const Esp32BlinkContent = buildLabContent(esp32BlinkExperiment);
