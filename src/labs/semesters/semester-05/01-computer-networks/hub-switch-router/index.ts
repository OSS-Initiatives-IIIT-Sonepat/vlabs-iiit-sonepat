import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type LabContent } from "@/labs/lab-content.types";
import { type ExperimentDefinition } from "@/labs/experiments/types";
import { HSR_BENCH } from "@/labs/networks/hub-switch-router";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const hubSwitchRouterExperiment: ExperimentDefinition = {
  id: "hub-switch-router",
  title: "Install and Configure a Hub, a Switch and a Router",
  description:
    "Cable a hub and a switch, watch one repeat every frame while the other learns where each PC is, then join the two rooms with a router.",
  labType: "text",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const HubSwitchRouterCircuit = buildCircuit(hubSwitchRouterExperiment);
export const HubSwitchRouterContent: LabContent = {
  ...buildLabContent(hubSwitchRouterExperiment),
  scene: "net",
  bench: HSR_BENCH,
};
