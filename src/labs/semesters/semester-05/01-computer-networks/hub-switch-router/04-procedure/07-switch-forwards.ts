import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import { revealedTable } from "@/labs/experiments/reveal-table";
import {
  HSR_DEVICES,
  ROOM1,
  ROOM2,
  HSR_TABLE_HEADERS,
  HSR_TABLE_ROWS,
} from "@/labs/networks/hub-switch-router";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/hub-switch-router";

const net: NetFrame = {
  show: [...HSR_DEVICES, ...ROOM1, ...ROOM2],
  hot: ["sw"],
  focus: ["sw", "pc4", "pc5", "pc6"],
  packets: [{ path: ["pc6", "sw", "pc4"], label: "reply", color: "green" }],
  consoles: [
    {
      at: "sw",
      title: "Switch console",
      lines: [
        "Switch#show mac address-table",
        "Vlan  Mac Address       Type     Ports",
        "   1  001a.2b3c.4d14    DYNAMIC  Fa0/1",
        "   1  001a.2b3c.4d16    DYNAMIC  Fa0/3",
      ],
    },
  ],
};

export const step: SceneProcedureStep = {
  label: "The reply goes to one port",
  body: "PC 6 replies to PC 4. The switch learns PC 6's MAC on Fa0/3. It already knows PC 4 is on Fa0/1, so the reply goes out of that port only. PC 5 never sees it.\n\nFrom now on, traffic between PC 4 and PC 6 uses only their two ports. Each port is a collision domain of its own.",
  show: [],
  schematic: figure(net),
  net,
  table: revealedTable(HSR_TABLE_HEADERS, HSR_TABLE_ROWS, 2),
};
