import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const programLoopExperiment: ExperimentDefinition = {
  id: "program-loop",
  title: "A Program Loop",
  description:
    "Decrement a count from 2 and branch back until the accumulator is zero.",
  labType: "text",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const ProgramLoopCircuit = buildCircuit(programLoopExperiment);
export const ProgramLoopContent = buildLabContent(programLoopExperiment);
