import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import { revealedTable } from "@/labs/experiments/reveal-table";
import {
  R_ADDR,
  RCLI_TABLE_HEADERS,
  RCLI_TABLE_ROWS,
} from "@/labs/networks/router-cli";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/router-cli";

const net: NetFrame = {
  hot: ["r1"],
  focus: ["r1", "admin"],
  addr: R_ADDR,
  consoles: [
    {
      at: "admin",
      title: "Terminal · R1",
      lines: [
        "R1#show ip route",
        "Codes: C - connected, L - local, S - static ...",
        "C   192.168.10.0/24 is directly connected, Gi0/0",
        "L   192.168.10.1/32 is directly connected, Gi0/0",
        "C   192.168.20.0/24 is directly connected, Gi0/1",
        "L   192.168.20.1/32 is directly connected, Gi0/1",
      ],
    },
  ],
};

export const step: SceneProcedureStep = {
  label: "show ip route",
  body: "Run show ip route. For each port that is up, R1 has a connected route (C) to the whole network and a local route (L) to its own address on it.\n\nR1 knows both LANs without any routing protocol, because it is attached to both. A network further away would need a static route or a routing protocol.",
  show: [],
  schematic: figure(net),
  net,
  table: revealedTable(RCLI_TABLE_HEADERS, RCLI_TABLE_ROWS, 7),
};
