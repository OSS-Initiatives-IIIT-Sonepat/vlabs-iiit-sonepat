import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const machineAndAssemblyExperiment: ExperimentDefinition = {
  id: "machine-and-assembly",
  title: "Machine and Assembly Language",
  description: "Write LDA, ADD, CMA, and STA both as assembly lines and as the stored machine words.",
  labType: "text",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const MachineAndAssemblyCircuit = buildCircuit(machineAndAssemblyExperiment);
export const MachineAndAssemblyContent = buildLabContent(machineAndAssemblyExperiment);
