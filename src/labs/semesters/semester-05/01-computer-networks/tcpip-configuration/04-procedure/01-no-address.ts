import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import { NO_ADDR } from "@/labs/networks/tcpip-config";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/tcpip-config";

const net: NetFrame = {
  hot: ["pc1"],
  addr: NO_ADDR,
  tags: { pc1: "✕ no DHCP" },
  consoles: [
    {
      at: "pc1",
      title: "Command Prompt · PC 1",
      lines: [
        "C:\\>ipconfig",
        "   Autoconfiguration IPv4 Address : 169.254.18.7",
        "   Subnet Mask . . . . . . . . . : 255.255.0.0",
        "   Default Gateway . . . . . . . :",
      ],
    },
  ],
};

export const step: SceneProcedureStep = {
  label: "PC 1 has no address",
  body: "PC 1 is cabled to the switch and set to obtain an address automatically, but there is no DHCP server here. After a minute Windows gives up and picks 169.254.18.7 for itself.\n\nThat APIPA address is useless on this network. ipconfig shows it with an Autoconfiguration label. You will set PC 1's address by hand.",
  show: [],
  schematic: figure(net, "Two networks, one router"),
  net,
};
