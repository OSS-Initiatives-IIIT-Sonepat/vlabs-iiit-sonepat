import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";

export const quineMccluskeyExperiment: ExperimentDefinition = {
  id: "quine-mccluskey",
  title: "Quine–McCluskey Algorithm",
  description:
    "Tabulate prime implicants for the Karnaugh-map function and select the cover B'C' + CD' + A'BD.",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const QuineMccluskeyCircuit = buildCircuit(quineMccluskeyExperiment);
export const QuineMccluskeyContent = buildLabContent(quineMccluskeyExperiment);
