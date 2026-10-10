import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const toStudyBjtFixedBiasAndVoltageDividerBiasConfigurationExperiment: ExperimentDefinition =
  {
    id: "to-study-bjt-fixed-bias-and-voltage-divider-bias-configuration",
    title: "To Study BJT Fixed Bias and Voltage Divider Bias Configuration",
    description:
      "Study and compare the DC operating points (Q-points) and stability factors of an NPN transistor (BC547) in fixed bias versus voltage divider bias configurations.",
    components,
    sections: [aim, theory, apparatus, observations, conclusion],
    procedureSteps,
  };

export const ToStudyBjtFixedBiasAndVoltageDividerBiasConfigurationCircuit =
  buildCircuit(toStudyBjtFixedBiasAndVoltageDividerBiasConfigurationExperiment);
export const ToStudyBjtFixedBiasAndVoltageDividerBiasConfigurationContent =
  buildLabContent(
    toStudyBjtFixedBiasAndVoltageDividerBiasConfigurationExperiment,
  );
