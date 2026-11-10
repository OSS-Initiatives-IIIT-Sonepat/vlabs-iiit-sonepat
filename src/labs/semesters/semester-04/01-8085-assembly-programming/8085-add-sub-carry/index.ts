import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";
import { type LabContent } from "@/labs/lab-content.types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { codeLab } from "./03-code-lab";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { procedureSteps, trainer } from "./04-procedure";

export const exp8085AddSubCarryExperiment: ExperimentDefinition = {
  id: "8085-add-sub-carry",
  title: "Addition & Subtraction with Carry (16-bit Result)",
  description:
    "Add and subtract 16-bit numbers with ADC and SBB so the carry is kept.",
  labType: "code",
  components: [],
  sections: [aim, theory, codeLab, observations, conclusion],
  procedureSteps,
};

export const Exp8085AddSubCarryCircuit = buildCircuit(
  exp8085AddSubCarryExperiment,
);
export const Exp8085AddSubCarryContent: LabContent = {
  ...buildLabContent(exp8085AddSubCarryExperiment),
  scene: "kit",
  trainer: {
    program: trainer.program,
    overview: trainer.overview,
    final: trainer.final,
  },
};
