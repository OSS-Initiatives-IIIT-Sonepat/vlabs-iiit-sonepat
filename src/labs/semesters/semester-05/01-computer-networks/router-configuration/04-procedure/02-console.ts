import { type SceneProcedureStep } from "@/labs/experiments/types";
import { PORTS_DOWN } from "@/labs/networks/router-cli";
import { modesFigure } from "@/labs/schematics/semester-05/01-computer-networks/router-cli";

export const step: SceneProcedureStep = {
  label: "Open the console",
  body: "On the admin laptop, open the terminal program on the console cable's COM port at 9600 baud, 8 data bits, no parity, 1 stop bit, no flow control. In Packet Tracer, click R1 and open the CLI tab.\n\nPress Enter. R1 has finished booting and shows the user EXEC prompt, Router>. If it asks to enter the initial configuration dialog, answer no.",
  show: [],
  schematic: modesFigure("user"),
  net: {
    hot: ["admin-r1", "r1"],
    focus: ["r1", "admin"],
    links: PORTS_DOWN,
    consoles: [
      {
        at: "admin",
        title: "Terminal · COM3 9600 8N1",
        lines: [
          "Cisco IOS Software, C1900 Software, Version 15.1(4)M4",
          "Would you like to enter the initial configuration",
          "dialog? [yes/no]: no",
          "Router>",
        ],
      },
    ],
  },
};
