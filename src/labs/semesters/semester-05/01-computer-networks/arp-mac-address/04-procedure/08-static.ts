import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import { revealedTable } from "@/labs/experiments/reveal-table";
import {
  GW_KNOWN,
  ARP_TABLE_HEADERS,
  ARP_TABLE_ROWS,
} from "@/labs/networks/arp";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/arp";

const net: NetFrame = {
  hot: ["pcA", "gw"],
  addr: GW_KNOWN,
  packets: [{ path: ["pcA", "sw", "gw", "net"], label: "to 8.8.8.8" }],
  consoles: [
    {
      at: "pcA",
      title: "Administrator · PC A",
      lines: [
        'C:\\>netsh interface ipv4 add neighbors "Ethernet"',
        "     192.168.1.1 00-1a-2b-3c-4d-01",
        "C:\\>arp -a",
        "  192.168.1.1        00-1a-2b-3c-4d-01   static",
      ],
    },
  ],
};

export const step: SceneProcedureStep = {
  label: "Add a static entry",
  body: "As administrator, add a static entry for the gateway with netsh. A static entry never ages out, and PC A sends no ARP request for that address at all.\n\narp -a shows it with type static. Static entries are one defence against ARP spoofing, where another host replies falsely to claim the gateway's address. Remove it afterwards with netsh interface ipv4 delete neighbors.",
  show: [],
  schematic: figure(net),
  net,
  table: revealedTable(ARP_TABLE_HEADERS, ARP_TABLE_ROWS, 5),
};
