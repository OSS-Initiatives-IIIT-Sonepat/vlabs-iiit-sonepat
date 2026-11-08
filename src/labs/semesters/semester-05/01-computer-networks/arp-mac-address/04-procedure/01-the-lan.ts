import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/arp";

const net: NetFrame = {
  note: {
    at: "pcA",
    title: "Frames need MACs",
    text: "PC A knows 192.168.1.12, but the frame needs PC C's MAC address.",
  },
};

export const step: SceneProcedureStep = {
  label: "IP addresses known, MACs not",
  body: "PC A, PC B, PC C and the gateway share one switch. Each has an IP address, shown on its label. Each NIC also has a MAC address, but PC A knows only its own, not anyone else's.\n\nTo send a frame to PC C, PC A must put PC C's MAC in it. ARP is how PC A finds it.",
  show: [],
  schematic: figure(net, "One LAN and its gateway"),
  net,
};
