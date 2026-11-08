import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import {
  OWN_MAC,
  ARP_TABLE_HEADERS,
  ARP_TABLE_ROWS,
} from "@/labs/networks/arp";
import { arpRequest } from "@/labs/schematics/semester-05/01-computer-networks/arp";

export const step: SceneProcedureStep = {
  label: "ping PC C: the ARP request",
  body: "Run ping 192.168.1.12. Before the first echo request can go, PC A broadcasts an ARP request: who has 192.168.1.12? Tell 192.168.1.10. The destination MAC is FF-FF-FF-FF-FF-FF and the target MAC is left as zeros.\n\nThe switch floods the broadcast out of every port. PC B, PC C and the gateway all receive it.",
  show: [],
  schematic: arpRequest,
  net: {
    hot: ["sw"],
    addr: OWN_MAC,
    packets: [
      {
        path: ["pcA", "sw", "pcB"],
        label: "who has .12?",
        color: "purple",
        at: 0.3,
      },
      { path: ["pcA", "sw", "pcC"], color: "purple", at: 0.3 },
      { path: ["pcA", "sw", "gw"], color: "purple", at: 0.3 },
    ],
  },
  table: revealedTable(ARP_TABLE_HEADERS, ARP_TABLE_ROWS, 2),
};
