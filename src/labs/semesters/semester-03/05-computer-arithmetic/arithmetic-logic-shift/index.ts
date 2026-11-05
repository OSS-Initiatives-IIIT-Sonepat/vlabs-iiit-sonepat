import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const arithmeticLogicShiftExperiment: ExperimentDefinition = {
  id: "arithmetic-logic-shift",
  title: "4-bit Arithmetic Logic Shift Unit",
  description:
    "One unit adds, logics, or shifts 1101 and 0011. S3 S2 choose the path and S1 S0 Cin choose the operation.",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const ArithmeticLogicShiftCircuit = buildCircuit(arithmeticLogicShiftExperiment);
export const ArithmeticLogicShiftContent = buildLabContent(arithmeticLogicShiftExperiment);
