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
        "R1#show ip interface brief",
        "Interface         IP-Address     OK? Status  Protocol",
        "GigabitEthernet0/0 192.168.10.1 YES manual up    up",
        "GigabitEthernet0/1 192.168.20.1 YES manual up    up",
        "Vlan1             unassigned     YES unset  admin. down",
      ],
    },
  ],
};

export const step: SceneProcedureStep = {
  label: "show ip interface brief",
  body: "Run show ip interface brief. It lists each port with its address and two states: Status (the port is on and has a signal) and Protocol (the link works).\n\nBoth Gigabit ports are up/up. A port left shut down shows administratively down, and a port with no cable shows down/down.",
  show: [],
  schematic: figure(net),
  net,
  table: revealedTable(RCLI_TABLE_HEADERS, RCLI_TABLE_ROWS, 6),
};
