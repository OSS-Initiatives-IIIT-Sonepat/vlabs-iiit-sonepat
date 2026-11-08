import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import { NO_ADDR } from "@/labs/networks/tcpip-config";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/tcpip-config";

const net: NetFrame = {
  hot: ["pc1"],
  focus: ["pc1", "pc2", "sw"],
  addr: NO_ADDR,
  consoles: [
    {
      at: "pc1",
      title: "Internet Protocol Version 4 (TCP/IPv4)",
      lines: [
        "( ) Obtain an IP address automatically",
        "(•) Use the following IP address:",
        "    IP address:       ___.___.___.___",
        "    Subnet mask:      ___.___.___.___",
        "    Default gateway:  ___.___.___.___",
      ],
    },
  ],
};

export const step: SceneProcedureStep = {
  label: "Open the IPv4 properties",
  body: "Press Win + R, type ncpa.cpl and press Enter. Right-click the Ethernet adapter, choose Properties, select Internet Protocol Version 4 (TCP/IPv4) and click Properties again.\n\nChoose Use the following IP address. Three boxes open: IP address, Subnet mask, and Default gateway. Below them are the DNS server boxes.",
  show: [],
  schematic: figure(net),
  net,
};
