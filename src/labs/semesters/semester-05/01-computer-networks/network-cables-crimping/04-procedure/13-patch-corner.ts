import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import {
  PATCH_CORNER,
  CABLE_TABLE_HEADERS,
  CABLE_TABLE_ROWS,
} from "@/labs/networks/network-cables";
import { theoryDiagram } from "@/labs/schematics/semester-05/01-computer-networks/network-cables";

export const step: SceneProcedureStep = {
  label: "Use each cable in the patch corner",
  body: "In the patch corner, PC 1 and PC 2 each reach the switch with a straight-through cable. A PC and a switch send on opposite pairs, so the cable does not need to swap them.\n\nPC A and PC B are joined directly by the crossover cable. Both are PCs and send on the same pair, so the cable swaps the pairs for them. Frames now flow on both links.\n\nRule of thumb: unlike devices, straight-through; like devices, crossover.",
  show: [],
  schematic: theoryDiagram,
  net: {
    show: PATCH_CORNER,
    hot: ["pc1-sw", "sw-pc2", "pcA-pcB"],
    focus: ["pc1", "pc2", "pcA", "pcB"],
    packets: [
      { path: ["pc1", "sw", "pc2"], label: "frame" },
      { path: ["pcA", "pcB"], label: "frame", color: "purple", at: 0.35 },
    ],
    note: {
      at: "sw",
      title: "Unlike or like",
      text: "PC to switch: straight-through. PC to PC: crossover, unless both cards do Auto-MDIX.",
    },
  },
  table: revealedTable(CABLE_TABLE_HEADERS, CABLE_TABLE_ROWS, 2),
};
