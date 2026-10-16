import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { procedureSteps } from "./04-procedure";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";

export const rippleCounter74hc93Experiment: ExperimentDefinition = {
  id: "ripple-counter-74hc93",
  title: "Ripple Counter using 74HC93 (MOD-16 and Decade)",
  description:
    "The 74HC93 asynchronous counter clocked at 1 Hz: a divide-by-2 stage, a MOD-16 counter with QA driving CKB, and a decade counter made by resetting at 1010 through R0(1) and R0(2).",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const RippleCounter74hc93Circuit = buildCircuit(rippleCounter74hc93Experiment);
export const RippleCounter74hc93Content = buildLabContent(rippleCounter74hc93Experiment);
