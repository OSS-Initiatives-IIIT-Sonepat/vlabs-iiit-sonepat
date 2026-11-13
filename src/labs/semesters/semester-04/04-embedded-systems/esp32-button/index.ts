import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const esp32ButtonExperiment: ExperimentDefinition = {
  id: "esp32-button",
  title: "Read a Push-Button with ESP32",
  description:
    "Read a push-button on GPIO4 of an ESP32 DevKit using the internal pull-up. Pressed reads LOW, released reads HIGH, at 3.3 V logic.",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const Esp32ButtonCircuit = buildCircuit(esp32ButtonExperiment);
export const Esp32ButtonContent = buildLabContent(esp32ButtonExperiment);
