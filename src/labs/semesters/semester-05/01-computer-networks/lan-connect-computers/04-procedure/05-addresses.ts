import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import { LAN_ALL, LAN_ADDR } from "@/labs/networks/lan-setup";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/lan-setup";

const net: NetFrame = {
  show: LAN_ALL,
  hot: ["pc1"],
  addr: LAN_ADDR,
  consoles: [
    {
      at: "pc1",
      title: "Command Prompt · PC 1",
      lines: [
        "C:\\>ipconfig",
        "   IPv4 Address. . . : 192.168.1.11",
        "   Subnet Mask . . . : 255.255.255.0",
        "   Default Gateway . :",
      ],
    },
  ],
};

export const step: SceneProcedureStep = {
  label: "Give every PC its address",
  body: "On each PC, open the IPv4 properties of the Ethernet adapter and enter the address from the plan, with subnet mask 255.255.255.0. Leave the gateway empty: this LAN has no router.\n\nCheck each one with ipconfig. Two PCs with the same address would fight over it, and Windows would warn of an address conflict.",
  show: [],
  schematic: figure(net),
  net,
};
