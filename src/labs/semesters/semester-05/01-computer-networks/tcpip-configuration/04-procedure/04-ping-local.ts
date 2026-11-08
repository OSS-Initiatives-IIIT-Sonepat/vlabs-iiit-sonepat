import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import { revealedTable } from "@/labs/experiments/reveal-table";
import {
  IP_ONLY,
  TCPIP_TABLE_HEADERS,
  TCPIP_TABLE_ROWS,
} from "@/labs/networks/tcpip-config";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/tcpip-config";

const net: NetFrame = {
  hot: ["pc1", "pc2"],
  focus: ["pc1", "pc2", "sw"],
  addr: IP_ONLY,
  packets: [
    { path: ["pc1", "sw", "pc2"], label: "echo request" },
    { path: ["pc2", "sw", "pc1"], label: "echo reply", color: "green" },
  ],
  consoles: [
    {
      at: "pc1",
      title: "Command Prompt · PC 1",
      lines: [
        "C:\\>ping 192.168.1.11",
        "Reply from 192.168.1.11: bytes=32 time<1ms TTL=128",
        "    Packets: Sent = 4, Received = 4, Lost = 0",
      ],
    },
  ],
};

export const step: SceneProcedureStep = {
  label: "Ping PC 2 in the same network",
  body: "From PC 1, ping 192.168.1.11. PC 1 ANDs that address with its mask and gets 192.168.1.0, its own network. So it sends the echo request straight to PC 2 through the switch.\n\nThe replies come back in under 1 ms. A gateway is not needed for a host in the same network.",
  show: [],
  schematic: figure(net),
  net,
  table: revealedTable(TCPIP_TABLE_HEADERS, TCPIP_TABLE_ROWS, 1),
};
