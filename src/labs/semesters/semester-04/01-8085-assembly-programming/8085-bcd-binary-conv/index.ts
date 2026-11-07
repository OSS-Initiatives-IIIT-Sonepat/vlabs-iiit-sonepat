import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { codeLab } from "./03-code-lab";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { procedureSteps } from "./04-procedure";

export const exp8085BcdBinaryConvExperiment: ExperimentDefinition = {
  id: "8085-bcd-binary-conv",
  title: "BCD to Binary and Binary to BCD Conversion",
  description:
    "Convert a packed BCD byte to binary, and a binary byte back to packed BCD.",
  labType: "code",
  components: [],
  sections: [aim, theory, codeLab, observations, conclusion],
  procedureSteps,
};

export const Exp8085BcdBinaryConvCircuit = buildCircuit(
  exp8085BcdBinaryConvExperiment,
);
export const Exp8085BcdBinaryConvContent = buildLabContent(
  exp8085BcdBinaryConvExperiment,
);
