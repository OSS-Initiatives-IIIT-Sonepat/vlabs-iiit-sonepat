import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";
import { type LabContent } from "@/labs/lab-content.types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { codeLab } from "./03-code-lab";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { procedureSteps, trainer } from "./04-procedure";

export const exp8085AddSub8bitExperiment: ExperimentDefinition = {
  id: "8085-add-sub-8bit",
  title: "Addition & Subtraction of Two 8-bit Numbers",
  description:
    "Add and subtract two 8-bit numbers in the accumulator, and store the sum and the difference.",
  labType: "code",
  components: [],
  sections: [aim, theory, codeLab, observations, conclusion],
  procedureSteps,
};

export const Exp8085AddSub8bitCircuit = buildCircuit(
  exp8085AddSub8bitExperiment,
);
export const Exp8085AddSub8bitContent: LabContent = {
  ...buildLabContent(exp8085AddSub8bitExperiment),
  scene: "kit",
  trainer: {
    program: trainer.program,
    overview: trainer.overview,
    final: trainer.final,
  },
};
