import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import { revealedTable } from "@/labs/experiments/reveal-table";
import {
  OWN_MAC,
  ARP_TABLE_HEADERS,
  ARP_TABLE_ROWS,
} from "@/labs/networks/arp";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/arp";

const net: NetFrame = {
  hot: ["pcA"],
  focus: ["pcA", "sw"],
  addr: OWN_MAC,
  consoles: [
    {
      at: "pcA",
      title: "Command Prompt · PC A",
      lines: [
        "C:\\>arp -a",
        "Interface: 192.168.1.10 --- 0x7",
        "  Internet Address   Physical Address    Type",
        "  192.168.1.255      ff-ff-ff-ff-ff-ff   static",
        "  224.0.0.22         01-00-5e-00-00-16   static",
      ],
    },
  ],
};

export const step: SceneProcedureStep = {
  label: "Look in the ARP cache",
  body: "Clear the cache with arp -d * (as administrator), then run arp -a. The cache for 192.168.1.10 holds only the static broadcast and multicast entries Windows always keeps.\n\nThere is no entry for 192.168.1.12. PC A does not know PC C's MAC.",
  show: [],
  schematic: figure(net),
  net,
  table: revealedTable(ARP_TABLE_HEADERS, ARP_TABLE_ROWS, 1),
};
