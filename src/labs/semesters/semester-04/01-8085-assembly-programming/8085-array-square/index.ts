import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";
import { type LabContent } from "@/labs/lab-content.types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { codeLab } from "./03-code-lab";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { procedureSteps, trainer } from "./04-procedure";

export const exp8085ArraySquareExperiment: ExperimentDefinition = {
  id: "8085-array-square",
  title: "Square Each Element of an Array",
  description: "Square each element of an array and store every 16-bit result.",
  labType: "code",
  components: [],
  sections: [aim, theory, codeLab, observations, conclusion],
  procedureSteps,
};

export const Exp8085ArraySquareCircuit = buildCircuit(
  exp8085ArraySquareExperiment,
);
export const Exp8085ArraySquareContent: LabContent = {
  ...buildLabContent(exp8085ArraySquareExperiment),
  scene: "kit",
  trainer: {
    program: trainer.program,
    overview: trainer.overview,
    final: trainer.final,
  },
};
