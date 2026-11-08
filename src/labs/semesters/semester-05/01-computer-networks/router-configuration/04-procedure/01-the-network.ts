import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import { PORTS_DOWN } from "@/labs/networks/router-cli";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/router-cli";

const net: NetFrame = {
  links: PORTS_DOWN,
  note: {
    at: "r1",
    title: "Ports shut down",
    text: "A router port carries nothing until it has an address and no shutdown.",
  },
};

export const step: SceneProcedureStep = {
  label: "R1 and the two LANs",
  body: "R1 joins LAN 10 on its port Gi0/0 and LAN 20 on Gi0/1. The cables are in, but a new router has every port shut down, so the lights at the router end are red. The admin laptop is connected to R1's console port.\n\nYou will configure R1 entirely from its command line.",
  show: [],
  schematic: figure(net, "R1 between LAN 10 and LAN 20"),
  net,
};
