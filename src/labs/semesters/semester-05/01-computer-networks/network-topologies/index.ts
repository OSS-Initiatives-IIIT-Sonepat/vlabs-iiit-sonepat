import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type LabContent } from "@/labs/lab-content.types";
import { type ExperimentDefinition } from "@/labs/experiments/types";
import { TOPO_BENCH } from "@/labs/networks/topologies";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const networkTopologiesExperiment: ExperimentDefinition = {
  id: "network-topologies",
  title: "Build Bus, Star, Ring, Mesh and Tree Topologies",
  description:
    "Build the five classic topologies in five rooms, as in Packet Tracer, send a message across each, then cut one cable and see what each topology loses.",
  labType: "text",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const NetworkTopologiesCircuit = buildCircuit(
  networkTopologiesExperiment,
);
export const NetworkTopologiesContent: LabContent = {
  ...buildLabContent(networkTopologiesExperiment),
  scene: "net",
  bench: TOPO_BENCH,
};
