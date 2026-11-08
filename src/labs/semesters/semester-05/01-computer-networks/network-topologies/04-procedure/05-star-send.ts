import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import { STAR_IDS, STAR_PCS } from "@/labs/networks/topologies";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/topologies";

const net: NetFrame = {
  show: STAR_IDS,
  hot: ["hubS"],
  focus: STAR_PCS,
  packets: [{ path: ["s1", "hubS", "s4"], label: "to S4" }],
};

export const step: SceneProcedureStep = {
  label: "Star: everything through the centre",
  body: "In the star room, each PC has its own cable to the switch. S1 sends a frame to S4. It goes up S1's cable to the switch, and the switch sends it down S4's cable only.\n\nIn Packet Tracer this is the topology you get by cabling every PC to one switch.",
  show: [],
  schematic: figure(net, "Star"),
  net,
};
