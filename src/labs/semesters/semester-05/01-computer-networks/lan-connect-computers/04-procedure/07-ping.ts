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
  hot: ["pc1", "pc6"],
  addr: LAN_ADDR,
  packets: [
    { path: ["pc1", "sw", "pc6"], label: "echo request" },
    { path: ["pc6", "sw", "pc1"], label: "echo reply", color: "green" },
  ],
  consoles: [
    {
      at: "pc1",
      title: "Command Prompt · PC 1",
      lines: [
        "C:\\>ping 192.168.1.16",
        "Reply from 192.168.1.16: bytes=32 time<1ms TTL=128",
        "    Packets: Sent = 4, Received = 4, Lost = 0",
      ],
    },
  ],
};

export const step: SceneProcedureStep = {
  label: "Ping every PC from PC 1",
  body: "From PC 1, ping each of the other PCs in turn. Each echo request crosses the switch to one port only, and each PC answers with an echo reply.\n\nNote the result for each PC in the table. If one PC does not answer, check its link light, its address, and its firewall, in that order.",
  show: [],
  schematic: figure(net),
  net,
  table: revealedTable(LAN_TABLE_HEADERS, LAN_TABLE_ROWS, 6),
};
