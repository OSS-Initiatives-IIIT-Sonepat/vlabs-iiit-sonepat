import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type LabContent } from "@/labs/lab-content.types";
import { type ExperimentDefinition } from "@/labs/experiments/types";
import { P2P_BENCH } from "@/labs/networks/peer-to-peer";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const peerToPeerNetworkExperiment: ExperimentDefinition = {
  id: "peer-to-peer-network",
  title:
    "Peer-to-Peer Network Between Two Systems, Through a Switch and a Router",
  description:
    "Join two PCs as peers three ways: directly with a crossover cable, through a switch, and through a router, and compare what each path changes.",
  labType: "text",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const PeerToPeerNetworkCircuit = buildCircuit(
  peerToPeerNetworkExperiment,
);
export const PeerToPeerNetworkContent: LabContent = {
  ...buildLabContent(peerToPeerNetworkExperiment),
  scene: "net",
  bench: P2P_BENCH,
};
