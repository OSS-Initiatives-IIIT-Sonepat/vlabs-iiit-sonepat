import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";
import { type LabContent } from "@/labs/lab-content.types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { codeLab } from "./03-code-lab";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { procedureSteps, trainer } from "./04-procedure";

export const exp8085Multiply8bitExperiment: ExperimentDefinition = {
  id: "8085-multiply-8bit",
  title: "Multiplication of Two 8-bit Numbers",
  description:
    "Multiply two 8-bit numbers by repeated addition and store the 16-bit product.",
  labType: "code",
  components: [],
  sections: [aim, theory, codeLab, observations, conclusion],
  procedureSteps,
};

export const Exp8085Multiply8bitCircuit = buildCircuit(
  exp8085Multiply8bitExperiment,
);
export const Exp8085Multiply8bitContent: LabContent = {
  ...buildLabContent(exp8085Multiply8bitExperiment),
  scene: "kit",
  trainer: {
    program: trainer.program,
    overview: trainer.overview,
    final: trainer.final,
  },
};
