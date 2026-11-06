import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { components } from "./components";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { procedureSteps } from "./04-procedure";

export const cacheDirectMappedExperiment: ExperimentDefinition = {
  id: "cache-direct-mapped",
  title: "Cache Memory: Direct-Mapped",
  description:
    "Cache memory is a small, fast SRAM placed between the CPU and main memory. It exploits the principle of locality: recently accessed data and nearby data are likely to be accessed again soon.",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const CacheDirectMappedCircuit = buildCircuit(
  cacheDirectMappedExperiment,
);
export const CacheDirectMappedContent = buildLabContent(
  cacheDirectMappedExperiment,
);
