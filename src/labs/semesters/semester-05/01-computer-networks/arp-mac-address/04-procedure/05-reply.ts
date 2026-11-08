import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import {
  C_KNOWN,
  ARP_TABLE_HEADERS,
  ARP_TABLE_ROWS,
} from "@/labs/networks/arp";
import { arpPacket } from "@/labs/schematics/semester-05/01-computer-networks/arp";

export const step: SceneProcedureStep = {
  label: "PC C answers",
  body: "PC B and the gateway see that 192.168.1.12 is not theirs and ignore the request. PC C sees its own address. It notes PC A's IP and MAC in its own cache, and sends an ARP reply straight to PC A's MAC: 192.168.1.12 is at 00-1A-2B-3C-4D-12.\n\nThe corner card shows the fields of the request and the reply.",
  show: [],
  schematic: arpPacket,
  net: {
    hot: ["pcC"],
    addr: C_KNOWN,
    packets: [
      { path: ["pcC", "sw", "pcA"], label: ".12 is at …4D-12", color: "green" },
    ],
    tags: { pcB: "ignores", gw: "ignores" },
  },
  table: revealedTable(ARP_TABLE_HEADERS, ARP_TABLE_ROWS, 3),
};
