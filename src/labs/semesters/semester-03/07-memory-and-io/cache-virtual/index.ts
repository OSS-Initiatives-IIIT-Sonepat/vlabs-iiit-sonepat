import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";
import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const cacheVirtualExperiment: ExperimentDefinition = {
  id: "cache-virtual",
  title: "Cache and Virtual Memory",
  description:
    "Read an associative map, a direct map, a set-associative map, and one page-table walk.",
  labType: "text",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};
export const CacheVirtualCircuit = buildCircuit(cacheVirtualExperiment);
export const CacheVirtualContent = buildLabContent(cacheVirtualExperiment);
