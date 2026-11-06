import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { components } from "./components";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { procedureSteps } from "./04-procedure";

export const memoryDesignExperiment: ExperimentDefinition = {
  id: "memory-design",
  title: "Memory Design: ROM & RAM",
  description:
    "Read and write a 256-byte memory and see which location a binary address selects.",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const MemoryDesignCircuit = buildCircuit(memoryDesignExperiment);
export const MemoryDesignContent = buildLabContent(memoryDesignExperiment);
