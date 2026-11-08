import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";
import { type LabContent } from "@/labs/lab-content.types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { codeLab } from "./03-code-lab";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { procedureSteps, trainer } from "./04-procedure";

export const exp8085ArraySumExperiment: ExperimentDefinition = {
  id: "8085-array-sum",
  title: "Sum of an Array of 8-bit Numbers",
  description:
    "Walk an array with the HL pointer and add every element into one total.",
  labType: "code",
  components: [],
  sections: [aim, theory, codeLab, observations, conclusion],
  procedureSteps,
};

export const Exp8085ArraySumCircuit = buildCircuit(exp8085ArraySumExperiment);
export const Exp8085ArraySumContent: LabContent = {
  ...buildLabContent(exp8085ArraySumExperiment),
  scene: "kit",
  trainer: {
    program: trainer.program,
    overview: trainer.overview,
    final: trainer.final,
  },
};
