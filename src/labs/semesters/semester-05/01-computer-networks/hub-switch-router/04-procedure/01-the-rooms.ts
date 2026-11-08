import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import { HSR_DEVICES } from "@/labs/networks/hub-switch-router";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/hub-switch-router";

const net: NetFrame = {
  show: HSR_DEVICES,
  note: {
    at: "r1",
    title: "Three devices",
    text: "Hub at layer 1, switch at layer 2, router at layer 3.",
  },
};

export const step: SceneProcedureStep = {
  label: "The two rooms and the rack",
  body: "Room 1 has three PCs and a hub. Room 2 has three PCs and a switch. Between them, in the rack, is a router. The PCs in Room 1 are in network 192.168.1.0/24, and the PCs in Room 2 are in 192.168.2.0/24.\n\nNothing is cabled yet. You will cable the hub and watch it, then the switch, then join the rooms with the router.",
  show: [],
  schematic: figure(net, "Hub LAN, router, switch LAN"),
  net,
};
