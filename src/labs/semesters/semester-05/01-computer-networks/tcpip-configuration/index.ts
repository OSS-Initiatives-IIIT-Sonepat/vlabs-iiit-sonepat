import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type LabContent } from "@/labs/lab-content.types";
import { type ExperimentDefinition } from "@/labs/experiments/types";
import { TCPIP_BENCH } from "@/labs/networks/tcpip-config";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const tcpipConfigurationExperiment: ExperimentDefinition = {
  id: "tcpip-configuration",
  title: "Configure the IP Address, Subnet Mask and Default Gateway (TCP/IP)",
  description:
    "Set a static IPv4 address, mask and gateway on a PC, and see what each one decides: who is local, who is reached through the router, and what a wrong mask breaks.",
  labType: "text",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const TcpipConfigurationCircuit = buildCircuit(
  tcpipConfigurationExperiment,
);
export const TcpipConfigurationContent: LabContent = {
  ...buildLabContent(tcpipConfigurationExperiment),
  scene: "net",
  bench: TCPIP_BENCH,
};
