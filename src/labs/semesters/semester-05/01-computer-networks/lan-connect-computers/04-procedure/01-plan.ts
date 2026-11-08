import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import { LAN_DEVICES } from "@/labs/networks/lan-setup";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/lan-setup";

const net: NetFrame = {
  show: LAN_DEVICES,
  consoles: [
    {
      at: "sw",
      title: "LAN plan · 192.168.1.0/24",
      lines: [
        "PC 1  192.168.1.11  Fa0/1",
        "PC 2  192.168.1.12  Fa0/2",
        "PC 3  192.168.1.13  Fa0/3",
        "PC 4  192.168.1.14  Fa0/4",
        "PC 5  192.168.1.15  Fa0/5",
        "PC 6  192.168.1.16  Fa0/6",
      ],
    },
  ],
};

export const step: SceneProcedureStep = {
  label: "Plan the LAN",
  body: "Before any cable is laid, write the plan. Six PCs, one switch, one network: 192.168.1.0/24. PC 1 gets 192.168.1.11 and port Fa0/1, PC 2 gets .12 and Fa0/2, and so on up to PC 6.\n\nThe switch goes on the back wall, where a cable from every desk can reach it along the floor.",
  show: [],
  schematic: figure(net, "Star LAN, one switch"),
  net,
};
