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
        "C:\\>getmac",
        "Physical Address    Transport Name",
        "=================== ===========================",
        "00-1A-2B-3C-4D-10   \\Device\\Tcpip_{6F2A...}",
      ],
    },
  ],
};

export const step: SceneProcedureStep = {
  label: "Find your own MAC address",
  body: "On PC A run getmac, or ipconfig /all. Both show the Physical Address of the Ethernet adapter: 00-1A-2B-3C-4D-10.\n\nThe first half, 00-1A-2B, is the maker's identifier (OUI). The second half is the card's own serial number from that maker.",
  show: [],
  schematic: figure(net),
  net,
  table: revealedTable(ARP_TABLE_HEADERS, ARP_TABLE_ROWS, 1),
};
