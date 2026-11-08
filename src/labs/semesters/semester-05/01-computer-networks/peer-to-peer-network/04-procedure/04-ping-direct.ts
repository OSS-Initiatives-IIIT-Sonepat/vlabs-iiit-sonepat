import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import { revealedTable } from "@/labs/experiments/reveal-table";
import {
  DIRECT,
  SAME_NET,
  P2P_TABLE_HEADERS,
  P2P_TABLE_ROWS,
} from "@/labs/networks/peer-to-peer";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/peer-to-peer";

const net: NetFrame = {
  show: DIRECT,
  hot: ["a-b"],
  addr: SAME_NET,
  packets: [
    { path: ["pcA", "pcB"], label: "echo request" },
    { path: ["pcB", "pcA"], label: "echo reply", color: "green" },
  ],
  consoles: [
    {
      at: "pcA",
      title: "Command Prompt · PC A",
      lines: [
        "C:\\>ping 192.168.0.2",
        "Reply from 192.168.0.2: bytes=32 time<1ms TTL=128",
      ],
    },
  ],
};

export const step: SceneProcedureStep = {
  label: "Ping across the cable",
  body: "From PC A, ping 192.168.0.2. The echo request goes straight down the cable to PC B, and the reply comes straight back.\n\nNote the TTL in the reply: 128, the value Windows sends with. No router was in the way.",
  show: [],
  schematic: figure(net),
  net,
  table: revealedTable(P2P_TABLE_HEADERS, P2P_TABLE_ROWS, 1),
};
