import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import { HSR_DEVICES, ROOM1 } from "@/labs/networks/hub-switch-router";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/hub-switch-router";

const net: NetFrame = {
  show: [...HSR_DEVICES, ...ROOM1],
  hot: ["hub"],
  focus: ["hub", "pc1", "pc2", "pc3"],
  busy: ["hub"],
  packets: [
    { path: ["pc1", "hub", "pc3"], label: "to PC 3" },
    { path: ["pc1", "hub", "pc2"], label: "copy", at: 0.35, drop: true },
  ],
  tags: { pc2: "✕ not for me" },
};

export const step: SceneProcedureStep = {
  label: "A hub repeats every frame",
  body: "PC 1 sends a frame to PC 3. The hub does not read the address. It copies the bits out of every other port, so PC 2 receives the frame as well.\n\nPC 2's NIC sees that the destination MAC is not its own and throws the frame away. Every PC on a hub hears every frame, which wastes the link and lets any PC listen in.",
  show: [],
  schematic: figure(net),
  net,
};
