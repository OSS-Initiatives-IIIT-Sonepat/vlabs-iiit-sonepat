import type { SchematicData } from "@/labs/CircuitSchematic";
import { type NetFrame } from "@/labs/networks/bench";
import { NIC_BENCH } from "@/labs/networks/nic-lan-wlan";

import { netFigure } from "./net-figures";

export const figure = (frame: NetFrame, title?: string): SchematicData =>
  netFigure(NIC_BENCH, frame, title);

export const theoryDiagram = figure({}, "Wired LAN and wireless LAN");
