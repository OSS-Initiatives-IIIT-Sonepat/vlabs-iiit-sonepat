import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type LabContent } from "@/labs/lab-content.types";
import { type ExperimentDefinition } from "@/labs/experiments/types";
import { UTIL_BENCH } from "@/labs/networks/net-utilities";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const networkUtilitiesExperiment: ExperimentDefinition = {
  id: "network-utilities",
  title:
    "Configure an Internet Connection and Debug It with ipconfig, ping, tracert and netstat",
  description:
    "Bring a client online through a router and an ISP, then use ipconfig, ping, nslookup, tracert and netstat to follow the traffic and find two faults.",
  labType: "text",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const NetworkUtilitiesCircuit = buildCircuit(networkUtilitiesExperiment);
export const NetworkUtilitiesContent: LabContent = {
  ...buildLabContent(networkUtilitiesExperiment),
  scene: "net",
  bench: UTIL_BENCH,
};
