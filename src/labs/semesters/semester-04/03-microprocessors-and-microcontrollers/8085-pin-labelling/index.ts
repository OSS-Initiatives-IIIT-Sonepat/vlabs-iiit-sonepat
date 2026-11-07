import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type LabContent } from "@/labs/lab-content.types";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const pinLabelling8085Experiment: ExperimentDefinition = {
  id: "8085-pin-labelling",
  title: "Labelling Pins of 8085 Microprocessor",
  description:
    "Name every pin of the Intel 8085, and follow those pins through one memory read.",
  labType: "text",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const PinLabelling8085Circuit = buildCircuit(pinLabelling8085Experiment);
export const PinLabelling8085Content: LabContent = {
  ...buildLabContent(pinLabelling8085Experiment),
  scene: "8085",
};
