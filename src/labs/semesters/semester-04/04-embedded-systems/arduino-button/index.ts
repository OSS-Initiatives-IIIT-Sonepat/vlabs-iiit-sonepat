import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const arduinoButtonExperiment: ExperimentDefinition = {
  id: "arduino-button",
  title: "Read a Push-Button with Arduino",
  description:
    "Read a push-button on digital pin 2 using INPUT_PULLUP. Pressed reads LOW, released reads HIGH.",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const ArduinoButtonCircuit = buildCircuit(arduinoButtonExperiment);
export const ArduinoButtonContent = buildLabContent(arduinoButtonExperiment);
