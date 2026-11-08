import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import {
  WORKBENCH,
  IN_TESTER,
  CABLE_TABLE_HEADERS,
  CABLE_TABLE_ROWS,
} from "@/labs/networks/network-cables";
import { pinoutCross } from "@/labs/schematics/semester-05/01-computer-networks/network-cables";

export const step: SceneProcedureStep = {
  label: "Test the crossover cable",
  body: "Plug the cable into the tester again and switch it on.\n\nNow pin 1 of the main unit lights pin 3 of the remote, 2 lights 6, 3 lights 1, and 6 lights 2. Pins 4, 5, 7 and 8 still light straight across. This is a crossover cable: what one card sends on 1 and 2 arrives at the other card's receive pins, 3 and 6. Note the result in the table.",
  show: [],
  schematic: pinoutCross,
  net: {
    show: WORKBENCH,
    hot: ["tester"],
    focus: ["tester", "endA", "endB"],
    ends: {
      endA: { stage: "crimped", standard: "T568B" },
      endB: { stage: "crimped", standard: "T568A" },
    },
    moves: IN_TESTER,
    tester: { id: "tester", wiring: "cross" },
    consoles: [
      {
        at: "tester",
        title: "Tester, main → remote",
        lines: ["1→3  2→6  3→1  4→4", "5→5  6→2  7→7  8→8", "Crossover · PASS"],
      },
    ],
  },
  table: revealedTable(CABLE_TABLE_HEADERS, CABLE_TABLE_ROWS, 2),
};
