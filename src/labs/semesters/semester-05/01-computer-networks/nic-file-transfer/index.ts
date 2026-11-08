import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type LabContent } from "@/labs/lab-content.types";
import { type ExperimentDefinition } from "@/labs/experiments/types";
import { NIC_BENCH } from "@/labs/networks/nic-lan-wlan";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const nicFileTransferExperiment: ExperimentDefinition = {
  id: "nic-file-transfer",
  title: "Install Wired and Wireless NICs and Transfer Files over LAN and WLAN",
  description:
    "Fit a network card, install its driver, cable two PCs to a switch and two laptops to a Wi-Fi router, then copy the same file over each and compare.",
  labType: "text",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const NicFileTransferCircuit = buildCircuit(nicFileTransferExperiment);
export const NicFileTransferContent: LabContent = {
  ...buildLabContent(nicFileTransferExperiment),
  scene: "net",
  bench: NIC_BENCH,
};
