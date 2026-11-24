import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const esd8051Adc0804Experiment: ExperimentDefinition = {
  id: "esd-8051-adc0804",
  title: "Interface an ADC with 8051",
  description:
    "Interface an ADC0804 with the 8051: start conversions on P3, read the 8-bit result from P1 and check it against a divider voltage.",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const Esd8051Adc0804Circuit = buildCircuit(esd8051Adc0804Experiment);
export const Esd8051Adc0804Content = buildLabContent(esd8051Adc0804Experiment);
