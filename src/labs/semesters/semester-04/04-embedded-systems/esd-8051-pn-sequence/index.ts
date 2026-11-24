import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const esd8051PnSequenceExperiment: ExperimentDefinition = {
  id: "esd-8051-pn-sequence",
  title: "8-bit PN Sequence Generator using 8051",
  description:
    "An 8-bit linear feedback shift register on the 8051 that generates a pseudo-random sequence of 255 states, shown on four LEDs.",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const Esd8051PnSequenceCircuit = buildCircuit(
  esd8051PnSequenceExperiment,
);
export const Esd8051PnSequenceContent = buildLabContent(
  esd8051PnSequenceExperiment,
);
