import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import { revealedTable } from "@/labs/experiments/reveal-table";
import {
  DHCP_ADDR,
  UTIL_TABLE_HEADERS,
  UTIL_TABLE_ROWS,
} from "@/labs/networks/net-utilities";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/net-utilities";

const net: NetFrame = {
  hot: ["pc"],
  focus: ["pc", "r1"],
  addr: DHCP_ADDR,
  consoles: [
    {
      at: "pc",
      title: "Command Prompt · Client",
      lines: [
        "C:\\>ipconfig /all",
        "   DHCP Enabled. . . . . . : Yes",
        "   IPv4 Address. . . . . . : 192.168.1.10(Preferred)",
        "   Subnet Mask . . . . . . : 255.255.255.0",
        "   Default Gateway . . . . : 192.168.1.1",
        "   DHCP Server . . . . . . : 192.168.1.1",
        "   DNS Servers . . . . . . : 8.8.8.8",
      ],
    },
  ],
};

export const step: SceneProcedureStep = {
  label: "ipconfig /all",
  body: "Open a Command Prompt on the client and run ipconfig /all. It shows everything DHCP gave the client: the address, the mask, the gateway, the DHCP server, the lease, and the DNS server. It also shows the NIC's MAC address.\n\nIf the address started with 169.254, DHCP would have failed, and nothing beyond the LAN would work.",
  show: [],
  schematic: figure(net),
  net,
  table: revealedTable(UTIL_TABLE_HEADERS, UTIL_TABLE_ROWS, 1),
};
