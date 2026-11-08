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
  hot: ["r1", "r3", "r1-r3"],
  packets: [
    { path: VIA_SERIAL, label: "echo request" },
    { path: BACK_SERIAL, label: "echo reply", color: "green" },
  ],
  consoles: [
    {
      at: "r1",
      title: "R1 and R3",
      lines: [
        "R1(config)#ip route 192.168.3.0 255.255.255.0 10.0.13.2",
        "R3(config)#ip route 192.168.1.0 255.255.255.0 10.0.13.1",
        "R1#show ip route static",
        "S   192.168.3.0/24 [1/0] via 10.0.13.2",
      ],
    },
  ],
};

export const step: SceneProcedureStep = {
  label: "Add static routes",
  body: "On R1, add a static route to LAN B through R3's serial address. On R3, add the route back to LAN A through R1's. A route is needed in both directions, or the replies will be lost.\n\nPing again. The packets go R1 to R3 over the serial link, and the reply comes back the same way.",
  show: [],
  schematic: figure(net),
  net,
  table: revealedTable(ROUTING_TABLE_HEADERS, ROUTING_TABLE_ROWS, 1),
};
