import type { SchematicData } from "@/labs/CircuitSchematic";
import { type NetFrame } from "@/labs/networks/bench";
import { HSR_BENCH } from "@/labs/networks/hub-switch-router";

import { netFigure } from "./net-figures";

export const figure = (frame: NetFrame, title?: string): SchematicData =>
  netFigure(HSR_BENCH, frame, title);

export const theoryDiagram = figure({}, "Hub LAN, router, switch LAN");
