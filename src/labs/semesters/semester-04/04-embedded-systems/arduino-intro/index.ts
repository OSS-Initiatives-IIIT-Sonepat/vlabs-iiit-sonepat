import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { sketch } from "./03-sketch";
import { apparatus } from "./04-apparatus";
import { conclusion } from "./05-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const arduinoIntroExperiment: ExperimentDefinition = {
  id: "arduino-intro",
  title: "Introduction to Arduino",
  description:
    "A guided tour of the Arduino Uno R3: what each part does, how power gets in, what the chip and crystal do, and what each pin is for.",
  components,
  sections: [aim, theory, apparatus, sketch, conclusion],
  procedureSteps,
};

export const ArduinoIntroCircuit = buildCircuit(arduinoIntroExperiment);
export const ArduinoIntroContent = buildLabContent(arduinoIntroExperiment);
