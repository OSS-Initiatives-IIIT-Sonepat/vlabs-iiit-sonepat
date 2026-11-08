import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import { revealedTable } from "@/labs/experiments/reveal-table";
import {
  LAN_ALL,
  LAN_ADDR,
  LAN_TABLE_HEADERS,
  LAN_TABLE_ROWS,
} from "@/labs/networks/lan-setup";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/lan-setup";

const net: NetFrame = {
  show: LAN_ALL,
  hot: ["sw"],
  addr: LAN_ADDR,
  packets: [
    {
      path: ["pc1", "sw", "pc2"],
      label: "broadcast",
      color: "purple",
      at: 0.3,
    },
    { path: ["pc1", "sw", "pc3"], color: "purple", at: 0.3 },
    { path: ["pc1", "sw", "pc4"], color: "purple", at: 0.3 },
    { path: ["pc1", "sw", "pc5"], color: "purple", at: 0.3 },
    { path: ["pc1", "sw", "pc6"], color: "purple", at: 0.3 },
  ],
};

export const step: SceneProcedureStep = {
  label: "A broadcast reaches every PC",
  body: "Before PC 1 can send its first ping to a new address, it asks who has that address, in an ARP request to the broadcast MAC FF-FF-FF-FF-FF-FF.\n\nThe switch floods a broadcast out of every port. All five other PCs receive it, and only the owner of the address answers. Every PC on this switch is in one broadcast domain.",
  show: [],
  schematic: figure(net),
  net,
  table: revealedTable(LAN_TABLE_HEADERS, LAN_TABLE_ROWS, 6),
};
