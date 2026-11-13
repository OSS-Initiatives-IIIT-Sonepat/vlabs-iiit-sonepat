import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const esdPicIoLedSwitchExperiment: ExperimentDefinition = {
  id: "esd-pic-io-led-switch",
  title: "I/O Interfacing: LED and Switch (PIC18)",
  description:
    "Read a push-button on RB0 with a pull-down resistor and drive an LED on RD0 from the button state.",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const EsdPicIoLedSwitchCircuit = buildCircuit(esdPicIoLedSwitchExperiment);
export const EsdPicIoLedSwitchContent = buildLabContent(esdPicIoLedSwitchExperiment);
