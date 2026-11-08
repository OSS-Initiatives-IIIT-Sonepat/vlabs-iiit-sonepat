import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import { revealedTable } from "@/labs/experiments/reveal-table";
import {
  WITH_GW,
  TCPIP_TABLE_HEADERS,
  TCPIP_TABLE_ROWS,
} from "@/labs/networks/tcpip-config";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/tcpip-config";

const net: NetFrame = {
  hot: ["pc1", "r1", "srv"],
  addr: WITH_GW,
  packets: [
    { path: ["pc1", "sw", "r1", "srv"], label: "echo request" },
    { path: ["srv", "r1", "sw", "pc1"], label: "echo reply", color: "green" },
  ],
  consoles: [
    {
      at: "pc1",
      title: "Command Prompt · PC 1",
      lines: [
        "C:\\>ping 192.168.2.10",
        "Reply from 192.168.2.10: bytes=32 time=1ms TTL=127",
        "Reply from 192.168.2.10: bytes=32 time<1ms TTL=127",
      ],
    },
  ],
};

export const step: SceneProcedureStep = {
  label: "Add the default gateway",
  body: "Open the IPv4 properties again and enter 192.168.1.1, the router's address on this network, as the default gateway.\n\nPing the server again. PC 1 sends the echo request in a frame addressed to the router's MAC. The router forwards it to the server, lowering the TTL by one, and the reply comes back the same way with TTL 127.",
  show: [],
  schematic: figure(net),
  net,
  table: revealedTable(TCPIP_TABLE_HEADERS, TCPIP_TABLE_ROWS, 3),
};
