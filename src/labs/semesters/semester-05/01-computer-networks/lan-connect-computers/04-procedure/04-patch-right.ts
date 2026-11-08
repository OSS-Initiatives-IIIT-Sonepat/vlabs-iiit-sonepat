import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import { RIGHT_CABLES, LAN_ALL } from "@/labs/networks/lan-setup";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/lan-setup";

const net: NetFrame = {
  show: LAN_ALL,
  hot: RIGHT_CABLES,
  tags: {
    pc1: "✓ link",
    pc2: "✓ link",
    pc3: "✓ link",
    pc4: "✓ link",
    pc5: "✓ link",
    pc6: "✓ link",
  },
};

export const step: SceneProcedureStep = {
  label: "Patch PC 4 to PC 6",
  body: "Patch PC 4, PC 5 and PC 6 to ports Fa0/4, Fa0/5 and Fa0/6 the same way.\n\nAll six PCs now have their own cable to the switch. This is a star: every path between two PCs goes through the switch, and no PC depends on another PC's cable.",
  show: [],
  schematic: figure(net),
  net,
};
