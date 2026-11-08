import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type LabContent } from "@/labs/lab-content.types";
import { type ExperimentDefinition } from "@/labs/experiments/types";
import { LAN_BENCH } from "@/labs/networks/lan-setup";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const lanConnectComputersExperiment: ExperimentDefinition = {
  id: "lan-connect-computers",
  title: "Connect the Computers in a Local Area Network",
  description:
    "Plan a star LAN for six PCs, cable each to a switch, give every PC an address in one network, and check the LAN with ping, a broadcast and a shared folder.",
  labType: "text",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const LanConnectComputersCircuit = buildCircuit(
  lanConnectComputersExperiment,
);
export const LanConnectComputersContent: LabContent = {
  ...buildLabContent(lanConnectComputersExperiment),
  scene: "net",
  bench: LAN_BENCH,
};
