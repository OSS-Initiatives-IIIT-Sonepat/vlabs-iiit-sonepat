import type { SchematicData } from "@/labs/CircuitSchematic";
import { type NetFrame } from "@/labs/networks/bench";
import { P2P_BENCH } from "@/labs/networks/peer-to-peer";

import { netFigure } from "./net-figures";

export const figure = (frame: NetFrame, title?: string): SchematicData =>
  netFigure(P2P_BENCH, frame, title);

export const theoryDiagram = figure({}, "Direct, switch, router");
