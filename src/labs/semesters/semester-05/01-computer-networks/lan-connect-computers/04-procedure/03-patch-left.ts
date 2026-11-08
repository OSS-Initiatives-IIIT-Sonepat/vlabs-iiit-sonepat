import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import { LAN_DEVICES, LEFT_CABLES } from "@/labs/networks/lan-setup";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/lan-setup";

const net: NetFrame = {
  show: [...LAN_DEVICES, ...LEFT_CABLES],
  hot: LEFT_CABLES,
  focus: ["sw", "pc1", "pc2", "pc3"],
  tags: { pc1: "✓ link", pc2: "✓ link", pc3: "✓ link" },
};

export const step: SceneProcedureStep = {
  label: "Patch PC 1 to PC 3",
  body: "Run a straight-through cable from PC 1 along the floor to port Fa0/1, from PC 2 to Fa0/2, and from PC 3 to Fa0/3. Label both ends of each cable with the PC and the port.\n\nEach port light turns green as its PC's NIC comes up.",
  show: [],
  schematic: figure(net),
  net,
};
