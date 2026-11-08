import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import { NIC_DEVICES } from "@/labs/networks/nic-lan-wlan";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/nic-lan-wlan";

const net: NetFrame = {
  show: NIC_DEVICES,
  note: {
    at: "pcA",
    title: "No NIC yet",
    text: "PC A has no network port. The PCIe card beside it will give it one.",
  },
};

export const step: SceneProcedureStep = {
  label: "The two rooms",
  body: "The left room is the wired LAN: PC A, PC B, and a switch. PC A has no network card yet, and the card is on the floor beside it. The right room is the wireless LAN: a Wi-Fi router and two laptops with Wi-Fi built in.\n\nNo cable is plugged in and no address is set. You will fit the card, connect each pair, and copy the same 100 MB file over each network.",
  show: [],
  schematic: figure(net, "Wired LAN and wireless LAN"),
  net,
};
