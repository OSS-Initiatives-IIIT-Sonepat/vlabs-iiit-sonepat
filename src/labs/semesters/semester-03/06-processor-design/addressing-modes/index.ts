import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const addressingModesExperiment: ExperimentDefinition = {
  id: "addressing-modes",
  title: "Addressing Modes",
  description: "Trace implied, immediate, register, indirect, direct, and register-offset addressing.",
  labType: "text",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const AddressingModesCircuit = buildCircuit(addressingModesExperiment);
export const AddressingModesContent = buildLabContent(addressingModesExperiment);
