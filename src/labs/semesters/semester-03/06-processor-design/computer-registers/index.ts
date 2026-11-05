import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const computerRegistersExperiment: ExperimentDefinition = {
  id: "computer-registers",
  title: "Computer Registers",
  description: "Name each register of the basic computer, then move AC onto DR and DR onto AC across the common bus.",
  labType: "text",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const ComputerRegistersCircuit = buildCircuit(computerRegistersExperiment);
export const ComputerRegistersContent = buildLabContent(computerRegistersExperiment);
