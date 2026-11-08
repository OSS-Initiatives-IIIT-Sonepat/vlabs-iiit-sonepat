import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import { LAN_ONLY } from "@/labs/networks/net-utilities";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/net-utilities";

const net: NetFrame = {
  show: LAN_ONLY,
  note: {
    at: "r1",
    title: "The way out",
    text: "Every packet to the Internet leaves through this router's WAN port.",
  },
};

export const step: SceneProcedureStep = {
  label: "The client and the path out",
  body: "The client sits on the lab LAN. Its router connects to the ISP's router, which connects to the Internet. Somewhere out there are a DNS resolver, 8.8.8.8, and a web server, www.example.com.\n\nThe router's WAN cable is not plugged in yet, and the client has no address.",
  show: [],
  schematic: figure(net, "Client to the Internet"),
  net,
};
