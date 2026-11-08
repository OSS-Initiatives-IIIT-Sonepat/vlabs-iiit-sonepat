import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import { revealedTable } from "@/labs/experiments/reveal-table";
import {
  VIA_SERIAL,
  BACK_SERIAL,
  ROUTING_TABLE_HEADERS,
  ROUTING_TABLE_ROWS,
} from "@/labs/networks/routing";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/routing";

const net: NetFrame = {
  hot: ["r1-r3"],
  packets: [
    { path: VIA_SERIAL, label: "echo request" },
    { path: BACK_SERIAL, label: "echo reply", color: "green" },
  ],
  consoles: [
    {
      at: "r1",
      title: "R1",
      lines: [
        "R1#show ip route rip",
        "R   192.168.3.0/24 [120/1] via 10.0.13.2, Serial0/0/0",
        "R   10.0.23.0/30 [120/1] via 10.0.12.2, Gi0/1",
      ],
    },
  ],
};

export const step: SceneProcedureStep = {
  label: "RIP counts hops",
  body: "On R1, show ip route rip. LAN B is learned as R [120/1] via 10.0.13.2: administrative distance 120, metric 1 hop, over the serial link.\n\nThe path through R2 is 2 hops, so RIP rejects it, even though its links are about 650 times faster. Pings now cross the slow link.",
  show: [],
  schematic: figure(net),
  net,
  table: revealedTable(ROUTING_TABLE_HEADERS, ROUTING_TABLE_ROWS, 3),
};
