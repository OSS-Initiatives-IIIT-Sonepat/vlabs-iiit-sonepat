import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import { BUS_IDS, BUS_PCS } from "@/labs/networks/topologies";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/topologies";

const net: NetFrame = {
  show: BUS_IDS,
  hot: ["term1", "term2"],
  focus: BUS_PCS,
  note: {
    at: "b2",
    title: "One cable for all",
    text: "Every PC taps the same backbone. Only one can send at a time.",
  },
};

export const step: SceneProcedureStep = {
  label: "Bus: one shared backbone",
  body: "In the bus room, a coaxial backbone runs along the wall with a T-tap for each PC and a 50 Ω terminator at each end. Each PC connects to its tap with a short drop cable.\n\nThe terminators soak up the signal at the ends of the cable. Without them it would reflect back and corrupt every frame.",
  show: [],
  schematic: figure(net, "Bus"),
  net,
};
