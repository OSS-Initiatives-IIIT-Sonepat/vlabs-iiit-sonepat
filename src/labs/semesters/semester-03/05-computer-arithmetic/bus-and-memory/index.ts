import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const busAndMemoryExperiment: ExperimentDefinition = {
  id: "bus-and-memory",
  title: "Bus and Memory Transfer",
  description: "Enable one three-state buffer, read M[5] into DR, then write a new word back.",
  labType: "text",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const BusAndMemoryCircuit = buildCircuit(busAndMemoryExperiment);
export const BusAndMemoryContent = buildLabContent(busAndMemoryExperiment);
