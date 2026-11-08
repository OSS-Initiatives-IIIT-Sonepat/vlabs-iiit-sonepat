import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import {
  WORKBENCH,
  IN_TESTER,
  CABLE_TABLE_HEADERS,
  CABLE_TABLE_ROWS,
} from "@/labs/networks/network-cables";
import { pinoutStraight } from "@/labs/schematics/semester-05/01-computer-networks/network-cables";

export const step: SceneProcedureStep = {
  label: "Test the straight-through cable",
  body: "Plug End A into the main unit of the tester and End B into the remote unit, and switch the tester on.\n\nThe main unit drives pins 1 to 8 one at a time. On a straight-through cable the remote lights the same number each time: 1, 2, 3, 4, 5, 6, 7, 8. Note the result in the table.\n\nIf a LED stays dark, that wire is open. If two light together, two wires touch. Cut the plug off and crimp a new one.",
  show: [],
  schematic: pinoutStraight,
  net: {
    show: WORKBENCH,
    hot: ["tester"],
    focus: ["tester", "endA", "endB"],
    ends: {
      endA: { stage: "crimped", standard: "T568B" },
      endB: { stage: "crimped", standard: "T568B" },
    },
    moves: IN_TESTER,
    tester: { id: "tester", wiring: "straight" },
    consoles: [
      {
        at: "tester",
        title: "Tester, main → remote",
        lines: [
          "1→1  2→2  3→3  4→4",
          "5→5  6→6  7→7  8→8",
          "Straight-through · PASS",
        ],
      },
    ],
  },
  table: revealedTable(CABLE_TABLE_HEADERS, CABLE_TABLE_ROWS, 1),
};
