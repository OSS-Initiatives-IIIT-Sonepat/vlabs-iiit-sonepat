import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import {
  PORTS_DOWN,
  RCLI_TABLE_HEADERS,
  RCLI_TABLE_ROWS,
} from "@/labs/networks/router-cli";
import { modesFigure } from "@/labs/schematics/semester-05/01-computer-networks/router-cli";

export const step: SceneProcedureStep = {
  label: "Secure the router",
  body: "Set a hashed password for privileged mode with enable secret. Then enter line console 0 and set a console password with login, so anyone at the console must type it. Encrypt the plain passwords in the configuration, and add a warning banner.\n\nThe prompt shows R1(config-line)# while you are in the console line's settings.",
  show: [],
  schematic: modesFigure("line"),
  net: {
    hot: ["r1"],
    focus: ["r1", "admin"],
    links: PORTS_DOWN,
    consoles: [
      {
        at: "admin",
        title: "Terminal · R1",
        lines: [
          "R1(config)#enable secret class",
          "R1(config)#line console 0",
          "R1(config-line)#password cisco",
          "R1(config-line)#login",
          "R1(config-line)#exit",
          "R1(config)#service password-encryption",
          "R1(config)#banner motd #Authorised access only#",
        ],
      },
    ],
  },
  table: revealedTable(RCLI_TABLE_HEADERS, RCLI_TABLE_ROWS, 4),
};
