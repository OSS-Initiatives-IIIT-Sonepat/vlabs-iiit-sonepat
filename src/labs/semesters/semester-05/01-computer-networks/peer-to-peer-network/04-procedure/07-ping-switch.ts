import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import { revealedTable } from "@/labs/experiments/reveal-table";
import {
  VIA_SWITCH,
  SAME_NET,
  P2P_TABLE_HEADERS,
  P2P_TABLE_ROWS,
} from "@/labs/networks/peer-to-peer";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/peer-to-peer";

const net: NetFrame = {
  show: [...VIA_SWITCH, "r1"],
  hot: ["sw"],
  addr: SAME_NET,
  packets: [
    { path: ["pcA", "sw", "pcB"], label: "echo request" },
    { path: ["pcB", "sw", "pcA"], label: "echo reply", color: "green" },
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
  label: "Ping through the switch",
  body: "Ping 192.168.0.2 from PC A again. The frame goes to the switch, which reads the destination MAC and sends it out of PC B's port only.\n\nThe reply still shows TTL 128. A switch works below the IP layer and does not touch the TTL.",
  show: [],
  schematic: figure(net),
  net,
  table: revealedTable(P2P_TABLE_HEADERS, P2P_TABLE_ROWS, 2),
};
