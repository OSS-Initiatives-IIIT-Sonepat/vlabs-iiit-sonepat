import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import { LAN_ONLY } from "@/labs/networks/net-utilities";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/net-utilities";

const net: NetFrame = {
  show: [...LAN_ONLY, "r1-isp", "isp-net", "net-dns", "net-web"],
  hot: ["r1-isp"],
  focus: ["r1", "isp"],
  consoles: [
    {
      at: "r1",
      title: "Router · Status",
      lines: [
        "WAN type ...... DHCP",
        "WAN address ... 203.0.113.45 /24",
        "Gateway ....... 203.0.113.1",
        "DNS ........... 8.8.8.8",
      ],
    },
  ],
};

export const step: SceneProcedureStep = {
  label: "Connect the router's WAN port",
  body: "Plug the ISP's line into the router's WAN port. In the router's settings page, set the WAN connection type to the one the ISP uses, here DHCP.\n\nThe router asks the ISP for an address and gets the public address 203.0.113.45 and the ISP's gateway 203.0.113.1. The WAN light turns on.",
  show: [],
  schematic: figure(net),
  net,
};
