import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import { revealedTable } from "@/labs/experiments/reveal-table";
import {
  RING_IDS,
  RING_PCS,
  TOPO_TABLE_HEADERS,
  TOPO_TABLE_ROWS,
} from "@/labs/networks/topologies";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/topologies";

const net: NetFrame = {
  show: RING_IDS,
  hot: ["r2-r3"],
  focus: RING_PCS,
  links: { "r2-r3": "down" },
  packets: [{ path: ["r1", "r2"], label: "to R3", drop: true }],
  tags: { r2: "✕ ring broken" },
};

export const step: SceneProcedureStep = {
  label: "Ring: break one link",
  body: "Break the cable between R2 and R3. Frames and the token can no longer get round the ring. R1's frame stops at R2, and the ring is down for everyone.\n\nThis is why FDDI and SONET use a second ring running the other way: when one link breaks, the two rings join into one and traffic turns back at the break.",
  show: [],
  schematic: figure(net, "Ring"),
  net,
  table: revealedTable(TOPO_TABLE_HEADERS, TOPO_TABLE_ROWS, 3),
};
