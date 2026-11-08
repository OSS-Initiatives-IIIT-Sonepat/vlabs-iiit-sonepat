import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import { RING_IDS, RING_PCS } from "@/labs/networks/topologies";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/topologies";

const net: NetFrame = {
  show: RING_IDS,
  hot: ["r1", "r3"],
  focus: RING_PCS,
  packets: [
    { path: ["r4", "r1"], label: "token", color: "purple" },
    { path: ["r1", "r2", "r3"], label: "to R3" },
  ],
};

export const step: SceneProcedureStep = {
  label: "Ring: round in one direction",
  body: "In the ring room, each PC is cabled to the next, and R4 back to R1. A token passes round the ring; only the PC holding it may send.\n\nR1 takes the token and sends a frame to R3. The frame goes R1 to R2 to R3. Each PC on the way repeats it to the next, and R3 copies it in.",
  show: [],
  schematic: figure(net, "Ring"),
  net,
};
