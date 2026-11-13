import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { sketch } from "./03-sketch";
import { apparatus } from "./04-apparatus";
import { conclusion } from "./05-conclusion";

export const arduinoIntroExperiment: ExperimentDefinition = {
  id: "arduino-intro",
  title: "Introduction to Arduino",
  description:
    "What an Arduino Uno is, where its pins are, and how a sketch runs: setup() once, then loop() forever.",
  components: [],
  sections: [aim, theory, sketch, apparatus, conclusion],
  procedureSteps: [],
  labType: "text",
};

export const ArduinoIntroCircuit = buildCircuit(arduinoIntroExperiment);
export const ArduinoIntroContent = buildLabContent(arduinoIntroExperiment);
