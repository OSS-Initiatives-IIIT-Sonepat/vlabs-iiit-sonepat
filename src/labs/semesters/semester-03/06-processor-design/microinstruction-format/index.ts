import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const microinstructionFormatExperiment: ExperimentDefinition = {
  id: "microinstruction-format",
  title: "Microinstruction Format",
  description:
    "Split one control word into micro-operation fields and a next-address field.",
  labType: "text",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const MicroinstructionFormatCircuit = buildCircuit(
  microinstructionFormatExperiment,
);
export const MicroinstructionFormatContent = buildLabContent(
  microinstructionFormatExperiment,
);
