import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type LabContent } from "@/labs/lab-content.types";
import { type ExperimentDefinition } from "@/labs/experiments/types";
import { CABLE_BENCH } from "@/labs/networks/network-cables";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const networkCablesCrimpingExperiment: ExperimentDefinition = {
  id: "network-cables-crimping",
  title: "Network Cables: Crimp a Straight-Through and a Crossover Cable",
  description:
    "Compare twisted-pair, coaxial and fibre cable, then crimp RJ45 plugs onto Cat 6 by the T568B and T568A standards and test both cables.",
  labType: "text",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const NetworkCablesCrimpingCircuit = buildCircuit(
  networkCablesCrimpingExperiment,
);
export const NetworkCablesCrimpingContent: LabContent = {
  ...buildLabContent(networkCablesCrimpingExperiment),
  scene: "net",
  bench: CABLE_BENCH,
};
