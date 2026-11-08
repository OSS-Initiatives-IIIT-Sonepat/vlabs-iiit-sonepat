import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import { BUS_IDS, BUS_PCS } from "@/labs/networks/topologies";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/topologies";

const net: NetFrame = {
  show: BUS_IDS,
  hot: ["b1", "b3"],
  focus: BUS_PCS,
  packets: [
    { path: ["b1", "t1", "t2", "t3", "b3"], label: "to B3", at: 0.3 },
    { path: ["b1", "t1", "term1"], label: "absorbed", at: 0.3, drop: true },
    { path: ["t2", "b2"], label: "not mine", at: 1.4, drop: true },
  ],
};

export const step: SceneProcedureStep = {
  label: "Bus: one frame reaches everyone",
  body: "B1 sends a frame to B3. The signal leaves B1's tap in both directions. One way it passes B2's tap and reaches B3; the other way it runs into the terminator and dies.\n\nB2 receives the frame too, sees it is not for its MAC, and drops it. Every node on a bus hears every frame.",
  show: [],
  schematic: figure(net, "Bus"),
  net,
};
