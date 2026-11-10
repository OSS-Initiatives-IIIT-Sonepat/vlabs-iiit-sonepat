import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";
import { type LabContent } from "@/labs/lab-content.types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { codeLab } from "./03-code-lab";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { procedureSteps, trainer } from "./04-procedure";

export const exp8085BubbleSortExperiment: ExperimentDefinition = {
  id: "8085-bubble-sort",
  title: "Bubble Sort of an Array",
  description:
    "Sort an array in place by comparing neighbours and swapping them when they are out of order.",
  labType: "code",
  components: [],
  sections: [aim, theory, codeLab, observations, conclusion],
  procedureSteps,
};

export const Exp8085BubbleSortCircuit = buildCircuit(
  exp8085BubbleSortExperiment,
);
export const Exp8085BubbleSortContent: LabContent = {
  ...buildLabContent(exp8085BubbleSortExperiment),
  scene: "kit",
  trainer: {
    program: trainer.program,
    overview: trainer.overview,
    final: trainer.final,
  },
};
