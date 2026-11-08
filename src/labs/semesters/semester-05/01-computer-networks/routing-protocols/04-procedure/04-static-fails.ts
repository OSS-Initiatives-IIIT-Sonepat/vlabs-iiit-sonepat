import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import { revealedTable } from "@/labs/experiments/reveal-table";
import {
  ROUTING_TABLE_HEADERS,
  ROUTING_TABLE_ROWS,
} from "@/labs/networks/routing";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/routing";

const net: NetFrame = {
  hot: ["r1-r3"],
  links: { "r1-r3": "down" },
  packets: [{ path: ["pcA", "r1"], label: "to 192.168.3.10", drop: true }],
  tags: { r1: "✕ no route" },
};

export const step: SceneProcedureStep = {
  label: "A static route does not adapt",
  body: "Shut down the serial link. R1's static route points out of a port that is now down, so R1 removes it from the table.\n\nThe path through R2 is still there and working, but nothing tells R1 about it. Pings fail until someone types a new route. Bring the serial link back up and remove both static routes.",
  show: [],
  schematic: figure(net),
  net,
  table: revealedTable(ROUTING_TABLE_HEADERS, ROUTING_TABLE_ROWS, 2),
};
