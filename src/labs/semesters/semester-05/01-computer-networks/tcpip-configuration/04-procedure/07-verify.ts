import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import { WITH_GW } from "@/labs/networks/tcpip-config";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/tcpip-config";

const net: NetFrame = {
  hot: ["pc1"],
  focus: ["pc1", "pc2", "sw"],
  addr: WITH_GW,
  tags: { pc1: "✓ configured" },
  consoles: [
    {
      at: "pc1",
      title: "Command Prompt · PC 1",
      lines: [
        "C:\\>ipconfig /all",
        "   Physical Address. . . : 00-1A-2B-3C-4D-10",
        "   DHCP Enabled. . . . . : No",
        "   IPv4 Address. . . . . : 192.168.1.10(Preferred)",
        "   Subnet Mask . . . . . : 255.255.255.0",
        "   Default Gateway . . . : 192.168.1.1",
        "   DNS Servers . . . . . : 8.8.8.8",
      ],
    },
  ],
};

export const step: SceneProcedureStep = {
  label: "Add DNS and check with ipconfig /all",
  body: "In the same dialog, set the preferred DNS server to 8.8.8.8, so PC 1 can turn names into addresses.\n\nRun ipconfig /all. It lists every setting of the adapter in one place: the address, the mask, the gateway, the DNS server, the MAC, and DHCP Enabled: No. This is the first command to run when a PC cannot reach something.",
  show: [],
  schematic: figure(net),
  net,
};
