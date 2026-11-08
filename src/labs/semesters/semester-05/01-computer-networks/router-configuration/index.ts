import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type LabContent } from "@/labs/lab-content.types";
import { type ExperimentDefinition } from "@/labs/experiments/types";
import { RCLI_BENCH } from "@/labs/networks/router-cli";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const routerConfigurationExperiment: ExperimentDefinition = {
  id: "router-configuration",
  title: "Router Configuration from the Command Line (Packet Tracer)",
  description:
    "Configure a Cisco router from its console as in Packet Tracer: move through the IOS modes, secure it, address and enable two ports, read its tables, save, and route between two LANs.",
  labType: "text",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const RouterConfigurationCircuit = buildCircuit(
  routerConfigurationExperiment,
);
export const RouterConfigurationContent: LabContent = {
  ...buildLabContent(routerConfigurationExperiment),
  scene: "net",
  bench: RCLI_BENCH,
};
