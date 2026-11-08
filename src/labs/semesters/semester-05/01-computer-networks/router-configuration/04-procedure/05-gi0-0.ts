import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import {
  R_ADDR_G0,
  G1_DOWN,
  RCLI_TABLE_HEADERS,
  RCLI_TABLE_ROWS,
} from "@/labs/networks/router-cli";
import { modesFigure } from "@/labs/schematics/semester-05/01-computer-networks/router-cli";

export const step: SceneProcedureStep = {
  label: "Address and enable Gi0/0",
  body: "Enter interface g0/0. Give it 192.168.10.1 with mask 255.255.255.0, a description, and no shutdown.\n\nIOS reports the port going up. The lights on the cable to SW 10 turn amber, then green. LAN 10 is now a connected network of R1.",
  show: [],
  schematic: modesFigure("iface"),
  net: {
    hot: ["r1-sw10"],
    focus: ["r1", "sw10", "admin"],
    links: G1_DOWN,
    addr: R_ADDR_G0,
    consoles: [
      {
        at: "admin",
        title: "Terminal · R1",
        lines: [
          "R1(config)#interface g0/0",
          "R1(config-if)#description LAN 10",
          "R1(config-if)#ip address 192.168.10.1 255.255.255.0",
          "R1(config-if)#no shutdown",
          "%LINK-5-CHANGED: Interface GigabitEthernet0/0,",
          "  changed state to up",
        ],
      },
    ],
  },
  table: revealedTable(RCLI_TABLE_HEADERS, RCLI_TABLE_ROWS, 5),
};
