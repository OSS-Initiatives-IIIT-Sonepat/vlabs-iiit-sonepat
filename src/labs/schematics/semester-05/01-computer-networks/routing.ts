import type { SchematicData } from "@/labs/CircuitSchematic";
import { type NetFrame } from "@/labs/networks/bench";
import { ROUTING_BENCH } from "@/labs/networks/routing";

import { netFigure } from "./net-figures";

export const figure = (frame: NetFrame, title?: string): SchematicData =>
  netFigure(ROUTING_BENCH, frame, title);

export const theoryDiagram = figure({}, "Fast way round, or slow way across");
