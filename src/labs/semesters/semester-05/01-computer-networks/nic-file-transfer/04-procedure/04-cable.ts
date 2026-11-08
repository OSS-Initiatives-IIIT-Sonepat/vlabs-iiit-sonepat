import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import { NIC_DEVICES, NIC_SEATED } from "@/labs/networks/nic-lan-wlan";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/nic-lan-wlan";

const net: NetFrame = {
  show: [...NIC_DEVICES, "a-sw", "b-sw"],
  hot: ["a-sw", "b-sw"],
  focus: ["pcA", "pcB", "sw"],
  moves: NIC_SEATED,
  tags: { pcA: "✓ 1.0 Gbps", pcB: "✓ 1.0 Gbps" },
  note: {
    at: "sw",
    title: "Link up",
    text: "Green at both ends of each cable: the card and the port agreed on 1 Gbit/s.",
  },
};

export const step: SceneProcedureStep = {
  label: "Cable both PCs to the switch",
  body: "Run a straight-through cable from PC A's new socket to a switch port, and another from PC B to the switch.\n\nThe link LEDs at both ends turn green when each card and port agree on a speed. On PC A, ipconfig no longer says Media disconnected. In the taskbar, the network icon shows a cable.",
  show: [],
  schematic: figure(net),
  net,
};
