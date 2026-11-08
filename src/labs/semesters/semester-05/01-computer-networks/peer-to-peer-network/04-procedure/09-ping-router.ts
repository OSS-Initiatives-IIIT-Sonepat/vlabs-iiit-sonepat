import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import { revealedTable } from "@/labs/experiments/reveal-table";
import {
  VIA_ROUTER,
  TWO_NETS,
  P2P_TABLE_HEADERS,
  P2P_TABLE_ROWS,
} from "@/labs/networks/peer-to-peer";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/peer-to-peer";

const net: NetFrame = {
  show: [...VIA_ROUTER, "sw"],
  hot: ["r1"],
  addr: TWO_NETS,
  packets: [
    { path: ["pcA", "r1", "pcB"], label: "echo request" },
    { path: ["pcB", "r1", "pcA"], label: "echo reply", color: "green" },
  ],
  consoles: [
    {
      at: "pcA",
      title: "Command Prompt · PC A",
      lines: [
        "C:\\>ping 10.0.0.2",
        "Reply from 10.0.0.2: bytes=32 time=1ms TTL=127",
      ],
    },
  ],
};

export const step: SceneProcedureStep = {
  label: "Ping through the router",
  body: "From PC A, ping 10.0.0.2. PC A sees a different network and sends the packet to its gateway. The router forwards it out of Gi0/1, lowering the TTL by one. PC B's reply takes the same path back.\n\nThe reply arrives with TTL 127. One router, one less. The peers still share files the same way, now across two networks.",
  show: [],
  schematic: figure(net),
  net,
  table: revealedTable(P2P_TABLE_HEADERS, P2P_TABLE_ROWS, 3),
};
