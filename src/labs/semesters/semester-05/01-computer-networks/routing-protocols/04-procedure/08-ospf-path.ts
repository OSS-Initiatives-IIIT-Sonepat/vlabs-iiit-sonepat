import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import { revealedTable } from "@/labs/experiments/reveal-table";
import {
  VIA_R2,
  BACK_R2,
  ROUTING_TABLE_HEADERS,
  ROUTING_TABLE_ROWS,
} from "@/labs/networks/routing";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/routing";

const net: NetFrame = {
  hot: ["r1-r2", "r2-r3"],
  packets: [
    { path: VIA_R2, label: "echo request" },
    { path: BACK_R2, label: "echo reply", color: "green" },
  ],
  consoles: [
    {
      at: "r1",
      title: "R1",
      lines: [
        "R1#show ip route ospf",
        "O   192.168.3.0/24 [110/3] via 10.0.12.2, Gi0/1",
        "O   10.0.23.0/30 [110/2] via 10.0.12.2, Gi0/1",
      ],
    },
  ],
};

export const step: SceneProcedureStep = {
  label: "OSPF counts cost",
  body: "On R1, show ip route ospf. LAN B is now O [110/3] via 10.0.12.2, through R2. Each gigabit link costs 1, so the path is 1 + 1 + 1 = 3. The serial link costs 64, so that path would be 65.\n\nPings now go the fast way round. Note the route in the table.",
  show: [],
  schematic: figure(net),
  net,
  table: revealedTable(ROUTING_TABLE_HEADERS, ROUTING_TABLE_ROWS, 4),
};
