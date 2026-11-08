import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import {
  R_ADDR,
  RCLI_TABLE_HEADERS,
  RCLI_TABLE_ROWS,
} from "@/labs/networks/router-cli";
import { modesFigure } from "@/labs/schematics/semester-05/01-computer-networks/router-cli";

export const step: SceneProcedureStep = {
  label: "Address and enable Gi0/1",
  body: "Do the same for Gi0/1, with 192.168.20.1 255.255.255.0, and no shutdown.\n\nThe lights toward SW 20 turn green as well. Type end to go straight back to privileged mode.",
  show: [],
  schematic: modesFigure("iface"),
  net: {
    hot: ["r1-sw20"],
    focus: ["r1", "sw20", "admin"],
    addr: R_ADDR,
    consoles: [
      {
        at: "admin",
        title: "Terminal · R1",
        lines: [
          "R1(config-if)#interface g0/1",
          "R1(config-if)#description LAN 20",
          "R1(config-if)#ip address 192.168.20.1 255.255.255.0",
          "R1(config-if)#no shutdown",
          "R1(config-if)#end",
          "R1#",
        ],
      },
    ],
  },
  table: revealedTable(RCLI_TABLE_HEADERS, RCLI_TABLE_ROWS, 5),
};
