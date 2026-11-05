import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const decimalArithmeticExperiment: ExperimentDefinition = {
  id: "decimal-arithmetic",
  title: "Decimal Arithmetic",
  description: "Add the BCD digits 9 and 7, and add 6 because the carry K is 1.",
  labType: "text",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const DecimalArithmeticCircuit = buildCircuit(decimalArithmeticExperiment);
export const DecimalArithmeticContent = buildLabContent(decimalArithmeticExperiment);
