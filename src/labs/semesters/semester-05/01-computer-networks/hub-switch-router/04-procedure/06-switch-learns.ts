import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import { HSR_DEVICES, ROOM1, ROOM2 } from "@/labs/networks/hub-switch-router";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/hub-switch-router";

const net: NetFrame = {
  show: [...HSR_DEVICES, ...ROOM1, ...ROOM2],
  hot: ["sw"],
  focus: ["sw", "pc4", "pc5", "pc6"],
  packets: [
    { path: ["pc4", "sw", "pc6"], label: "to PC 6" },
    { path: ["pc4", "sw", "pc5"], label: "flood", at: 0.35, drop: true },
  ],
  consoles: [
    {
      at: "sw",
      title: "Switch console",
      lines: [
        "Switch#show mac address-table",
        "Vlan  Mac Address       Type     Ports",
        "   1  001a.2b3c.4d14    DYNAMIC  Fa0/1",
      ],
    },
  ],
};

export const step: SceneProcedureStep = {
  label: "The switch learns, then floods",
  body: "PC 4 sends a frame to PC 6. The switch reads the source MAC and writes PC 4's MAC against port Fa0/1.\n\nIt does not yet know where PC 6 is, so it floods the frame out of every other port. PC 5 receives a copy and drops it. PC 6 receives it and keeps it.",
  show: [],
  schematic: figure(net),
  net,
};
