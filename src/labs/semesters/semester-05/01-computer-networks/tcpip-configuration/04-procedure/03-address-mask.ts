import { type SceneProcedureStep } from "@/labs/experiments/types";
import { IP_ONLY } from "@/labs/networks/tcpip-config";
import { maskSame } from "@/labs/schematics/semester-05/01-computer-networks/tcpip-config";

export const step: SceneProcedureStep = {
  label: "Enter the address and the mask",
  body: "Type 192.168.1.10 as the IP address and 255.255.255.0 as the subnet mask. Leave the gateway empty for now and click OK.\n\nThe mask has 24 one-bits, so the first three numbers, 192.168.1, name the network and the last, 10, names PC 1. The corner card shows the AND that PC 1 does: its network is 192.168.1.0.",
  show: [],
  schematic: maskSame,
  net: {
    hot: ["pc1"],
    focus: ["pc1", "pc2", "sw"],
    addr: IP_ONLY,
    consoles: [
      {
        at: "pc1",
        title: "Internet Protocol Version 4 (TCP/IPv4)",
        lines: [
          "(•) Use the following IP address:",
          "    IP address:       192.168.1.10",
          "    Subnet mask:      255.255.255.0",
          "    Default gateway:  ___.___.___.___",
        ],
      },
    ],
  },
};
