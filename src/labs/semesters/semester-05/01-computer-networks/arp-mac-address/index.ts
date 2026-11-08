import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type LabContent } from "@/labs/lab-content.types";
import { type ExperimentDefinition } from "@/labs/experiments/types";
import { ARP_BENCH } from "@/labs/networks/arp";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const arpMacAddressExperiment: ExperimentDefinition = {
  id: "arp-mac-address",
  title: "Find the MAC Address of a System with ARP",
  description:
    "Read your own MAC address, then watch ARP find another host's: a broadcast question, a unicast answer, and an entry in the ARP cache, for a local host and for the gateway.",
  labType: "text",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const ArpMacAddressCircuit = buildCircuit(arpMacAddressExperiment);
export const ArpMacAddressContent: LabContent = {
  ...buildLabContent(arpMacAddressExperiment),
  scene: "net",
  bench: ARP_BENCH,
};
