import type { SchematicData } from "@/labs/CircuitSchematic";
import { type NetFrame } from "@/labs/networks/bench";
import { TOPO_BENCH } from "@/labs/networks/topologies";

import { netFigure } from "./net-figures";

/** One room's topology, laid out on its own. */
export const figure = (frame: NetFrame, title?: string): SchematicData =>
  netFigure(TOPO_BENCH, frame, title, true);

/** All five rooms on one workspace, the way Packet Tracer shows a file of them. */
export const overview = figure({}, "Five rooms, five topologies");
export const theoryDiagram = overview;
