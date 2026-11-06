import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { components } from "./components";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { procedureSteps } from "./04-procedure";

export const cacheAssociativeExperiment: ExperimentDefinition = {
  id: "cache-associative",
  title: "Cache Memory: Fully-Associative with LRU",
  description:
    "Place any memory block in any line of a fully associative cache, which removes conflict misses.",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const CacheAssociativeCircuit = buildCircuit(cacheAssociativeExperiment);
export const CacheAssociativeContent = buildLabContent(
  cacheAssociativeExperiment,
);
