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
  hot: ["r1", "a-r1", "r1-b"],
  addr: TWO_NETS,
  consoles: [
    {
      at: "r1",
      title: "Router console",
      lines: [
        "Router(config)#int g0/0",
        "Router(config-if)#ip address 192.168.0.254 255.255.255.0",
        "Router(config-if)#no shut",
        "Router(config-if)#int g0/1",
        "Router(config-if)#ip address 10.0.0.254 255.255.255.0",
        "Router(config-if)#no shut",
      ],
    },
  ],
};

export const step: SceneProcedureStep = {
  label: "Put a router between them",
  body: "Move both cables from the switch to the router: PC A to Gi0/0 and PC B to Gi0/1. Each router port is its own network, so PC B must move to a different one: set it to 10.0.0.2/24.\n\nGive the router 192.168.0.254 on Gi0/0 and 10.0.0.254 on Gi0/1. Set PC A's gateway to 192.168.0.254 and PC B's to 10.0.0.254.",
  show: [],
  schematic: figure(net),
  net,
  table: revealedTable(P2P_TABLE_HEADERS, P2P_TABLE_ROWS, 2),
};
