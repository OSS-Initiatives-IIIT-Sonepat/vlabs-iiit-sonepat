import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import { revealedTable } from "@/labs/experiments/reveal-table";
import {
  LAN_ALL,
  LAN_ADDR,
  LAN_TABLE_HEADERS,
  LAN_TABLE_ROWS,
} from "@/labs/networks/lan-setup";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/lan-setup";

const net: NetFrame = {
  show: LAN_ALL,
  hot: ["pc4-sw"],
  addr: LAN_ADDR,
  links: { "pc4-sw": "down" },
  tags: { pc4: "✕ no link" },
  packets: [
    { path: ["pc1", "sw"], label: "to PC 4", drop: true },
    { path: ["pc1", "sw", "pc6"], label: "to PC 6", at: 0.4 },
  ],
};

export const step: SceneProcedureStep = {
  label: "Unplug one cable",
  body: "Pull the cable out of PC 4. Its link light goes out, and pings to 192.168.1.14 time out.\n\nThe other five PCs carry on as before: PC 1 still reaches PC 6. In a star, one broken cable affects only the PC on the end of it. Plug the cable back in.",
  show: [],
  schematic: figure(net),
  net,
  table: revealedTable(LAN_TABLE_HEADERS, LAN_TABLE_ROWS, 6),
};
