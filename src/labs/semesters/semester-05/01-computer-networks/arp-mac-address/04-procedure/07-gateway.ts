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
  hot: ["gw"],
  addr: GW_KNOWN,
  packets: [
    { path: ["pcA", "sw", "gw"], label: "who has .1?", color: "purple" },
    { path: ["gw", "sw", "pcA"], label: ".1 is at …4D-01", color: "green" },
    { path: ["pcA", "sw", "gw", "net"], label: "to 8.8.8.8" },
  ],
  consoles: [
    {
      at: "pcA",
      title: "Command Prompt · PC A",
      lines: [
        "C:\\>arp -a",
        "  Internet Address   Physical Address    Type",
        "  192.168.1.1        00-1a-2b-3c-4d-01   dynamic",
        "  192.168.1.12       00-1a-2b-3c-4d-12   dynamic",
      ],
    },
  ],
};

export const step: SceneProcedureStep = {
  label: "A remote host: ARP for the gateway",
  body: "Now ping 8.8.8.8. PC A sees that it is not in 192.168.1.0/24, so it does not ARP for 8.8.8.8. It ARPs for its gateway, 192.168.1.1, and the router answers with its MAC.\n\nThe echo request leaves with 8.8.8.8 as the IP destination and the gateway's MAC as the frame destination. arp -a gains 192.168.1.1, and never 8.8.8.8.",
  show: [],
  schematic: figure(net),
  net,
  table: revealedTable(ARP_TABLE_HEADERS, ARP_TABLE_ROWS, 4),
};
