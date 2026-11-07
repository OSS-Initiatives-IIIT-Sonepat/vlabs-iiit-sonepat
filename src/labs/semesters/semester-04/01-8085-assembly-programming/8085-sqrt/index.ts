import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { codeLab } from "./03-code-lab";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { procedureSteps } from "./04-procedure";

export const exp8085SqrtExperiment: ExperimentDefinition = {
  id: "8085-sqrt",
  title: "Square Root using Successive Odd-Number Subtraction",
  description:
    "Find the integer square root by subtracting successive odd numbers and counting how many fit.",
  labType: "code",
  components: [],
  sections: [aim, theory, codeLab, observations, conclusion],
  procedureSteps,
};

export const Exp8085SqrtCircuit = buildCircuit(exp8085SqrtExperiment);
export const Exp8085SqrtContent = buildLabContent(exp8085SqrtExperiment);
