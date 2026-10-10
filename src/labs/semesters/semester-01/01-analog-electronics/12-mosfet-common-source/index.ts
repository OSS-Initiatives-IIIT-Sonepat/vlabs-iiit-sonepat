import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { procedureSteps } from "./04-procedure";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";

export const mosfetCommonSourceExperiment: ExperimentDefinition = {
  id: "mosfet-common-source",
  title: "MOSFET in Common Source Configuration",
  description:
    "Study the 2N7000 n-channel MOSFET in the common source configuration: DC operating point, drain current versus gate-source voltage, and the voltage gain and 180° phase shift of the amplifier.",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const MosfetCommonSourceCircuit = buildCircuit(
  mosfetCommonSourceExperiment,
);
export const MosfetCommonSourceContent = buildLabContent(
  mosfetCommonSourceExperiment,
);
