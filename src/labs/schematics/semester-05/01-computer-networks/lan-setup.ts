import type { SchematicData } from "@/labs/CircuitSchematic";
import { type NetFrame } from "@/labs/networks/bench";
import { LAN_BENCH } from "@/labs/networks/lan-setup";

import { netFigure } from "./net-figures";

export const figure = (frame: NetFrame, title?: string): SchematicData =>
  netFigure(LAN_BENCH, frame, title);

export const theoryDiagram = figure({}, "Star LAN, one switch");
