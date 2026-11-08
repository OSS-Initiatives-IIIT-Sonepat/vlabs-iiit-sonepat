import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import { TWO_PCS } from "@/labs/networks/peer-to-peer";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/peer-to-peer";

const net: NetFrame = {
  show: [...TWO_PCS, "sw", "r1"],
  note: {
    at: "pcA",
    title: "Peers",
    text: "Neither PC is a server. Each will share with the other.",
  },
};

export const step: SceneProcedureStep = {
  label: "Two PCs, no network",
  body: "PC A and PC B sit at the two ends of the bench. A switch and a router are on the bench too, unused for now.\n\nYou will join the two PCs three ways in turn: with one crossover cable, through the switch, and through the router.",
  show: [],
  schematic: figure(net, "Direct, switch, router"),
  net,
};
