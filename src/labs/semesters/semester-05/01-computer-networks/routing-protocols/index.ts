import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type LabContent } from "@/labs/lab-content.types";
import { type ExperimentDefinition } from "@/labs/experiments/types";
import { ROUTING_BENCH } from "@/labs/networks/routing";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const routingProtocolsExperiment: ExperimentDefinition = {
  id: "routing-protocols",
  title: "Configure a Network with Static Routes, RIP and OSPF",
  description:
    "Route between two LANs across three routers three ways: by hand with static routes, by hop count with RIP, and by link cost with OSPF, and watch each choose a different path and react to a failure.",
  labType: "text",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const RoutingProtocolsCircuit = buildCircuit(routingProtocolsExperiment);
export const RoutingProtocolsContent: LabContent = {
  ...buildLabContent(routingProtocolsExperiment),
  scene: "net",
  bench: ROUTING_BENCH,
};
