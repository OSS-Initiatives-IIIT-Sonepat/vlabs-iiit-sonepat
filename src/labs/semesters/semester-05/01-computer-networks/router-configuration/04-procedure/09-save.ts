import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import { revealedTable } from "@/labs/experiments/reveal-table";
import {
  R_ADDR,
  RCLI_TABLE_HEADERS,
  RCLI_TABLE_ROWS,
} from "@/labs/networks/router-cli";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/router-cli";

const net: NetFrame = {
  hot: ["r1"],
  focus: ["r1", "admin"],
  addr: R_ADDR,
  consoles: [
    {
      at: "admin",
      title: "Terminal · R1",
      lines: [
        "R1#copy running-config startup-config",
        "Destination filename [startup-config]?",
        "Building configuration...",
        "[OK]",
      ],
    },
  ],
};

export const step: SceneProcedureStep = {
  label: "Save the configuration",
  body: "Everything so far is in the running-config in RAM. Save it to NVRAM with copy running-config startup-config, and press Enter to accept the file name.\n\nAfter a reload, R1 starts with this configuration. show startup-config shows what was saved, with the passwords encrypted.",
  show: [],
  schematic: figure(net),
  net,
  table: revealedTable(RCLI_TABLE_HEADERS, RCLI_TABLE_ROWS, 8),
};
