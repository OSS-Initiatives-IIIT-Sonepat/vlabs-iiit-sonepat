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
  links: { "r1-r2": "down" },
  packets: [
    { path: VIA_SERIAL, label: "echo request" },
    { path: BACK_SERIAL, label: "echo reply", color: "green" },
  ],
  consoles: [
    {
      at: "r1",
      title: "R1",
      lines: [
        "%OSPF-5-ADJCHG: Nbr 2.2.2.2 on Gi0/1 from FULL to DOWN",
        "R1#show ip route ospf",
        "O   192.168.3.0/24 [110/65] via 10.0.13.2, Serial0/0/0",
      ],
    },
  ],
};

export const step: SceneProcedureStep = {
  label: "OSPF finds another path",
  body: "Start a continuous ping (ping -t) from PC A, then shut down R1's port to R2. R1 loses the neighbour, floods the change, and every router reruns the shortest-path calculation.\n\nWithin seconds R1's route becomes O [110/65] via 10.0.13.2, over the serial link. One or two replies are lost, then the ping carries on. Bring the port back up and the route returns to R2.",
  show: [],
  schematic: figure(net),
  net,
  table: revealedTable(ROUTING_TABLE_HEADERS, ROUTING_TABLE_ROWS, 5),
};
