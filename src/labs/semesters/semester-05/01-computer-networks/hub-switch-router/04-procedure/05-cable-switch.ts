import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import { HSR_DEVICES, ROOM1, ROOM2 } from "@/labs/networks/hub-switch-router";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/hub-switch-router";

const net: NetFrame = {
  show: [...HSR_DEVICES, ...ROOM1, ...ROOM2],
  hot: ["sw"],
  focus: ["sw", "pc4", "pc5", "pc6"],
  consoles: [
    {
      at: "sw",
      title: "Switch console",
      lines: [
        "Switch#show mac address-table",
        "Vlan  Mac Address       Type     Ports",
        "----  -----------       ----     -----",
        "(empty)",
      ],
    },
  ],
};

export const step: SceneProcedureStep = {
  label: "Cable the switch in Room 2",
  body: "Power the switch and cable PC 4, PC 5 and PC 6 to it. The port lights turn amber for a few seconds, then green, while the switch checks each port.\n\nThe switch's MAC address table is empty. It has not yet seen a single frame.",
  show: [],
  schematic: figure(net),
  net,
};
