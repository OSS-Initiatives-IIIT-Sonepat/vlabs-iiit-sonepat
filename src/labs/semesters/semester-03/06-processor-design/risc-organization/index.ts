import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const riscOrganizationExperiment: ExperimentDefinition = {
  id: "risc-organization",
  title: "RISC",
  description: "Run a load, a register add, and a store as three fixed-length instructions.",
  labType: "text",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const RiscOrganizationCircuit = buildCircuit(riscOrganizationExperiment);
export const RiscOrganizationContent = buildLabContent(riscOrganizationExperiment);
