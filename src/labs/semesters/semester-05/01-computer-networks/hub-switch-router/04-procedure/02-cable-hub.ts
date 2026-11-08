import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import { HSR_DEVICES, ROOM1 } from "@/labs/networks/hub-switch-router";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/hub-switch-router";

const net: NetFrame = {
  show: [...HSR_DEVICES, ...ROOM1],
  hot: ["hub"],
  focus: ["hub", "pc1", "pc2", "pc3"],
  note: {
    at: "hub",
    title: "No setup",
    text: "A hub has no address and no table. It only repeats signals.",
  },
};

export const step: SceneProcedureStep = {
  label: "Power the hub and cable Room 1",
  body: "Plug in the hub's power adapter. Run a straight-through cable from each PC in Room 1 to a hub port.\n\nThe hub's link light for each port turns on. A hub needs no setup at all: it has no address, no table and no settings.",
  show: [],
  schematic: figure(net),
  net,
};
