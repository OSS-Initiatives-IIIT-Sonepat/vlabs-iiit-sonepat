import { type SceneProcedureStep } from "@/labs/experiments/types";
import { DHCP_ADDR } from "@/labs/networks/net-utilities";
import { doraFigure } from "@/labs/schematics/semester-05/01-computer-networks/net-utilities";

export const step: SceneProcedureStep = {
  label: "The client gets an address by DHCP",
  body: "The client's NIC comes up and broadcasts a DHCP Discover. The router's DHCP server answers with an Offer of 192.168.1.10. The client sends a Request for that address, and the router confirms it with an Acknowledge.\n\nWith the address come the mask, the gateway 192.168.1.1, and the DNS server.",
  show: [],
  schematic: doraFigure,
  net: {
    hot: ["pc", "r1"],
    focus: ["pc", "r1"],
    addr: DHCP_ADDR,
    packets: [
      { path: ["pc", "r1"], label: "Discover", color: "purple" },
      { path: ["r1", "pc"], label: "Offer", color: "blue" },
      { path: ["pc", "r1"], label: "Request", color: "purple" },
      { path: ["r1", "pc"], label: "Ack", color: "green" },
    ],
  },
};
