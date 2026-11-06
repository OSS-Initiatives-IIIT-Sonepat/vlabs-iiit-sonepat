import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";
import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const memoryAddressMapExperiment: ExperimentDefinition = {
  id: "memory-address-map",
  title: "Main Memory",
  description:
    "Select one of two ROMs with a decoder, the way a memory map selects one PROM.",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};
export const MemoryAddressMapCircuit = buildCircuit(memoryAddressMapExperiment);
export const MemoryAddressMapContent = buildLabContent(
  memoryAddressMapExperiment,
);
