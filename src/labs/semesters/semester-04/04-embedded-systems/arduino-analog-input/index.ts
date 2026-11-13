import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const arduinoAnalogInputExperiment: ExperimentDefinition = {
  id: "arduino-analog-input",
  title: "Analog Input with Arduino (Voltage Divider)",
  description:
    "Read the middle point of a 10 kohm / 10 kohm divider on analog pin A0. Convert the 0 to 1023 reading back to volts.",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const ArduinoAnalogInputCircuit = buildCircuit(
  arduinoAnalogInputExperiment,
);
export const ArduinoAnalogInputContent = buildLabContent(
  arduinoAnalogInputExperiment,
);
