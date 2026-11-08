import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import {
  PORTS_DOWN,
  RCLI_TABLE_HEADERS,
  RCLI_TABLE_ROWS,
} from "@/labs/networks/router-cli";
import { modesFigure } from "@/labs/schematics/semester-05/01-computer-networks/router-cli";

export const step: SceneProcedureStep = {
  label: "Move up the modes and name the router",
  body: "Type enable. The prompt becomes Router#, privileged EXEC mode. Type configure terminal: the prompt becomes Router(config)#, global configuration mode.\n\nType hostname R1. The prompt changes at once to R1(config)#. Every change you type takes effect immediately in the running configuration.",
  show: [],
  schematic: modesFigure("global"),
  net: {
    hot: ["r1"],
    focus: ["r1", "admin"],
    links: PORTS_DOWN,
    consoles: [
      {
        at: "admin",
        title: "Terminal · R1",
        lines: [
          "Router>enable",
          "Router#configure terminal",
          "Enter configuration commands, one per line.",
          "Router(config)#hostname R1",
          "R1(config)#",
        ],
      },
    ],
  },
  table: revealedTable(RCLI_TABLE_HEADERS, RCLI_TABLE_ROWS, 3),
};
